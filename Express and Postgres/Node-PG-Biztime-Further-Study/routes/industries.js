/** Routes for industries */

const express = require("express");
const ExpressError = require("../expressError");
const slugify = require("slugify");
const db = require("../db");

const router = new express.Router();

/** GET /industries : Returns a list of industries */

router.get("/", async function(req, res, next) {
  try {
    const results = await db.query(`
    SELECT i.ind_code, i.ind_name, c.code
      FROM industries AS i
      LEFT JOIN company_industries AS ci
      ON i.ind_code = ci.ind_code
      LEFT JOIN companies AS c
      ON ci.comp_code = c.code`);

    const data = results.rows;

    const formattedData = data.reduce((acc, item) => {
      const { ind_code, ind_name, code } = item;

      if (!acc[ind_code]) {
          acc[ind_code] = { ind_code, ind_name, companies: [code] };
      } else {
          acc[ind_code].companies.push(code);
      }
      return acc;

    }, {});

    const result = Object.values(formattedData);
    
    return res.json({industries: result });

  } catch(err) {
    return next(err);
  }
});

/** GET /industries/[code] ; Returns a specific industry with a list of companies with that industry */

router.get("/:code", async function(req, res, next) {
  try {
    const result = await db.query(`
      SELECT i.ind_code, i.ind_name, c.code
      FROM industries AS i
      LEFT JOIN company_industries AS ci
      ON i.ind_code = ci.ind_code
      LEFT JOIN companies AS c
      ON ci.comp_code = c.code
      WHERE i.ind_code = $1`, [req.params.code]);

    if (result.rows.length === 0) {
      let notFoundError = new Error(`There is no industry with that code: ${req.params.code}`);
      notFoundError.status = 404;
      throw notFoundError;
    }
    // NEED TO RETURN INDUSTRY WITH COMPANY CODES
    const { ind_code, ind_name } = result.rows[0];
    const companies = result.rows.map(c => c.code);
    return res.json({industry: {ind_code, ind_name, companies} });

  } catch(err) {
    return next(err);
  }
});

/** POST /industries : Creates an industry */

router.post("/", async function(req, res, next) {
  try{
    const { ind_code, ind_name } = req.body;

    const result = await db.query(
      `INSERT INTO industries (ind_code, ind_name)
        VALUES ($1, $2)
        RETURNING ind_code, ind_name`, [ind_code, ind_name]);

    return res.status(201).json({industry: result.rows[0]});

  } catch(err) {
    return next(err);
  }
});

/** POST /industries/link : Associate industry with company */

router.post("/link", async function(req, res, next) {
  try{
    const { comp_code, ind_code } = req.body;

    const result = await db.query(
      `INSERT INTO company_industries (comp_code, ind_code)
       VALUES ($1, $2)
       RETURNING comp_code, ind_code`, [comp_code, ind_code]);

    return res.status(201).json({"company association": result.rows[0]});

  } catch(err) {
    return next(err);
  }
});

module.exports = router