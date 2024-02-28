const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError");

let items = require("./fakeDB");

router.get("/", (req, res, next) => {
  res.json({ items });
});

router.post("/", (req, res, next) => {
  const newItem = {
    name: req.body.name,
    price: req.body.price
  };
  items.push(newItem);
  res.status(201).json({ added: newItem })
});

router.get("/:name", (req, res, next) => {
  const foundItem = items.find(item => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item Not Found", 404)
  }
  res.json({ item: foundItem })
});

router.patch("/:name", (req, res, next) => {
  const foundItem = items.find(item => item.name === req.params.name);
  if (foundItem === undefined) {
    throw new ExpressError("Item Not Found", 404)
  }
  foundItem.name = req.body.name;
  foundItem.price = req.body.price;
  res.json({ updated: foundItem });
});

router.delete("/:name", (req, res, next) => {
  const foundItem = items.find(item => item.name === req.params.name);
  if (foundItem === -1) {
    throw new ExpressError("Item Not Found", 404)
  }
  items.splice(foundItem, 1);
  res.json({ message: "Deleted" });
});


module.exports = router;