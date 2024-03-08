/** Routes for companies */

const express = require("express");
const ExpressError = require("../expressError");
const slugify = require("slugify");
const db = require("../db");

const router = new express.Router();

/** GET /companies: Returns a list of companies */

router.get("/", async function(req, res, next) {
  try {
    const results = await db.query(`
    SELECT code, name 
    FROM companies
    ORDER BY name`);

    return res.json({companies: results.rows });

  } catch(err) {
    return next(err);
  }
});

/** GET /companies/[code] : Returns company by its company code. */

router.get("/:code", async function(req, res, next) {
  try {
    const comp_code = req.params.code;
    const results = await db.query(
      `SELECT c.code, c.name, c.description, i.ind_name
       FROM companies AS c
       FULL JOIN company_industries AS ci
       ON c.code = ci.comp_code
       FULL JOIN industries AS i
       ON ci.ind_code = i.ind_code
       WHERE c.code = $1`, [comp_code]);

    if (results.rows.length === 0) {
      let notFoundError = new Error(`There is no company with that code: ${comp_code}`);
      notFoundError.status = 404;
      throw notFoundError;
    }
    
    const { code, name, description } = results.rows[0];
    const industries = results.rows.map(i => i.ind_name);
    return res.json({ company: { code, name, description, industries} });

  } catch(err) {
    return next(err);
  }
});

/** POST /companies : Adds a company. */

router.post("/", async function(req, res, next) {
  try {
    const { name, description } = req.body;
    const code = slugify(name, {lower: true});
    
    const result = await db.query(
      `INSERT INTO companies (code, name, description) 
        VALUES ($1, $2, $3) 
        RETURNING code, name, description`, 
      [code, name, description]);

    return res.status(201).json({company: result.rows[0]});

  } catch(err) {
    return next(err);
  }
});

/** PUT /companies/[code] : Edit existing company. */

router.put("/:code", async function(req, res, next) {
  try{
    const code = req.params.code;
    const { name, description} = req.body;
    const result = await db.query(
      `UPDATE companies 
        SET name = $1, description = $2 
        WHERE code = $3
        RETURNING code, name, description`,
      [name, description, code]
    );

    if (result.rows.length === 0) {
      throw new ExpressError(`No such company: ${code}`, 404)
    }

    return res.json({company: result.rows[0]});

  } catch(err) {
    return next(err);
  }
});

/** DELETE /companies/[code] : Deletes a company. */

router.delete("/:code", async function(req, res, next) {
  try{
    let code = req.params.code;

    const result = await db.query(`DELETE FROM companies WHERE code = $1 RETURNING code`, [code]);

    if (result.rows.length === 0) {
      throw new ExpressError(`No such company: ${code}`, 404)
    }

    return res.json({ status: "deleted" });

  } catch(err) {
    return next(err)
  }

});


module.exports = router