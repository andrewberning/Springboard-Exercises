const express = require("express");
const ExpressError = require("../expressError");
const slugify = require("slugify");
const db = require("../db");

const router = new express.Router();


router.get("/", async function(req, res, next) {
  try {
    const companiesQuery = await db.query("SELECT code, name FROM companies");

    return res.json({"companies": companiesQuery.rows });

  } catch(err) {
    return next(err);
  }
});

router.get("/:code", async function(req, res, next) {
  try {
    const code = req.params.code;
    const companyQuery = await db.query("SELECT code, name, description FROM companies WHERE code = $1", [code]);

    if (companyQuery.rows.length === 0) {
      let notFoundError = new Error(`There is no company with that code: ${req.params.code}`);
      notFoundError.status = 404;
      throw notFoundError;
    }

    return res.json({ "company": companyQuery.rows[0] });

  } catch(err) {
    return next(err);
  }
});

router.post("/", async function(req, res, next) {
  try {
    const { name, description } = req.body;
    const code = slugify(name, {lower: true});
    
    const result = await db.query(
      `INSERT INTO companies (code, name, description) 
        VALUES ($1, $2, $3) 
        RETURNING code, name, description`, 
      [code, name, description]);

    return res.status(201).json({"company": result.rows[0]});

  } catch(err) {
    return next(err);
  }
});

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

    return res.json({"company": result.rows[0]});

  } catch(err) {
    return next(err);
  }
});

router.delete("/:code", async function(req, res, next) {
  try{
    let code = req.params.code;

    const result = await db.query(`DELETE FROM companies WHERE code = $1 RETURNING code`, [code]);

    if (result.rows.length === 0) {
      throw new ExpressError(`No such company: ${code}`, 404)
    }

    return res.json({ "status": "deleted" });

  } catch(err) {
    return next(err)
  }

});


module.exports = router