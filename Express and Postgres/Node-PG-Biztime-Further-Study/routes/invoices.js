/** Routes for invoices */

const express = require("express");
const ExpressError = require("../expressError");
const db = require("../db");

const router = new express.Router();

/** GET /invoices : Returns info on all invoices */

router.get("/", async function(req, res, next) {
  try{
    const results = await db.query(
      `SELECT id, comp_code 
        FROM invoices 
        ORDER BY id`);

    return res.json({ invoices: results.rows });

  } catch(err) {
    return next(err);
  }
});

/** GET /invoices/:id : Returns single invoice by id */

router.get("/:id", async function(req, res, next) {
  try {
    const id = req.params.id;
    const result = await db.query(
      `SELECT i.id,
              i.comp_code,
              i.amt,
              i.paid,
              i.add_date,
              i.paid_date,
              c.name,
              c.description 
        FROM invoices AS i 
          INNER JOIN companies AS c ON (i.comp_code = c.code) 
        WHERE id = $1`,
      [id]);

    if (result.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404);
    }

    const data = result.rows[0];
    const invoice = {
      id: data.id,
      amt: data.amt,
      paid: data.paid,
      add_date: data.add_date,
      paid_date: data.paid_date,
      company: {
        code: data.comp_code,
        name: data.name,
        description: data.description
      }
    };

    return res.json({invoice});

  } catch(err) {
    return next(err);
  }
});

/** POST /invoices : Adds an invoice */

router.post("/", async function(req, res, next) {
  try{
    const { comp_code, amt } = req.body;
    const result = await db.query(
      `INSERT INTO invoices (comp_code, amt)
        VALUES ($1, $2) 
        RETURNING id, comp_code, amt, paid, add_date, paid_date`,
      [comp_code, amt]);

    return res.status(201).json({invoice: result.rows[0]});

  } catch(err) {
    return next(err);
  }
});

/** PUT /invoices/:id : Updates an invoice */

router.put("/:id", async function(req, res, next) {
  try{
    const id = req.params.id;
    const { amt, paid } = req.body;
    let paidDate = null;

    const currentResult = await db.query(
      `SELECT paid 
       FROM invoices 
       WHERE id = $1`, [id]);

    if (currentResult.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404);
    }

    const currentPaidDate = currentResult.rows[0].paid_date;
    console.log(`current paid date is: ${currentPaidDate}`);


    if (!currentPaidDate && paid) {
      paidDate = new Date();
    } else if (!paid) {
      paidDate = null
    } else {
      paidDate = currentPaidDate;
    }

    const result = await db.query(
      `UPDATE invoices
        SET amt = $1, paid = $2, paid_date = $3
        WHERE id = $4
        RETURNING id, comp_code, amt, paid, add_date, paid_date`, 
      [amt, paid, paidDate, id]);

    return res.json({"invoice": result.rows[0]});

  } catch(err) {
    return next(err);
  }
});

/** DELETE /invoices/:id : Deletes an invoice */

router.delete("/:id", async function(req, res, next) {
  try{
    const id = req.params.id;
    const result = await db.query(`DELETE FROM invoices WHERE id = $1 RETURNING id`, [id]);

    if(result.rows.length === 0) {
      throw new ExpressError(`No such invoice: ${id}`, 404);
    }

    return res.json({"status": "deleted"});

  } catch(err) {
    return next(err);
  }
})



module.exports = router