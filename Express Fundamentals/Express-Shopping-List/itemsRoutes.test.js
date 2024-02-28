process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
let items = require("./fakeDB");

let item = {
  name: "soda",
  price: "1.99"
};

beforeEach(() => {
  items.push(item);
});

afterEach(() => {
  items.length = 0;
});

/** GET /items - returns `{items: [items, ...]} */

describe("GET /items", () => {
  test("Gets a list of items", async function () {
    const resp = await request(app).get("/items");
    const { items } = resp.body;
    expect(resp.statusCode).toBe(200);
    expect(items).toHaveLength(1);
  });
});

/** POST /items - create item from data; returns `{added: item} */

describe("POST /items", function() {
  test("Creates a new item", async function() {
    const resp = await request(app)
      .post("/items")
      .send({
        name: "grapes",
        price: "2.99"
      });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      added: {
        name: "grapes",
        price: "2.99"
      }
    });
  });
}); 

/** GET /items/[name] - returns `{items: [item]} */

describe("GET /items/:name", () => {
  test("Gets a single item", async function () {
    const resp = await request(app).get(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({item: item});
  });
});

/** PATCH /items/[name] - updata item; return `{updated: item}`  */

describe("PATCH /items/:name", function() {
  test("Updates a single item name", async function() {
    const resp = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "pop",
        price: "1.99"
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      updated: {
        name: "pop",
        price: "1.99"
      }
    });
  });

  test("Updates a single item price", async function() {
    const resp = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "soda",
        price: "0.59"
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      updated: {
        name: "soda",
        price: "0.59"
      }
    });
  });

  test("Updates a single item name and price", async function() {
    const resp = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "pop",
        price: "0.59"
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      updated: {
        name: "pop",
        price: "0.59"
      }
    });
  });
});

/** DELETE /items/[name] - delete cat, 
 * return `{message: "Deleted"}` */

describe("DELETE /items/:name", function () {
  test("Deletes a single item", async function() {
    const resp = await request(app)
      .delete(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});