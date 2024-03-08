/** Tests for industries. */

const request = require("supertest");

const app = require("../app");
const { createData } = require("../_test-common");
const db = require("../db");

// before each test, clean out data
beforeEach(createData);

afterAll(async () => {
  await db.end()
})

describe("GET /", function () {

  test('It should respond with array of industries', async function () {
    const response = await request(app).get("/industries");
    expect(response.body).toEqual({
      "industries": [
        {ind_code: "tech", ind_name: "Technology", companies: [
          "apple"
        ]},
        {ind_code: "mfr", ind_name: "Manufacturing", companies: [
          "apple", "ibm"
        ]}
      ]
    })
  })
  
});

describe("GET /tech", function () {
  
  test("It should return info on an industry", async function () {
    const response = await request(app).get("/industries/tech");
    expect(response.body).toEqual(
      {
        "industry": {
            ind_code: "tech",
            ind_name: "Technology",
            companies: [
                "apple"
            ]
        }
      }
    )
  });

  test("It should return 404 for no-such-industry", async function () {
    const response = await request(app).get("/industries/telecom");
    expect(response.status).toEqual(404);
  })
});

describe("POST /", function () {

  test("It should add an industry", async function () {
    const response = await request(app)
      .post("/industries")
      .send({ind_code: "mktg", ind_name: "Marketing"});

    expect(response.body).toEqual(
      {
        "industry": {
          ind_code: "mktg",
          ind_name: "Marketing",
        }
      }
    );
  });

  test("It should return 500 for conflict", async function () {
    const response = await request(app)
      .post("/industries")
      .send({ind_code: "mfr", ind_name: "Manufacturing"});
    
    expect(response.status).toEqual(500);
  });
});


describe("POST /link", function () {

  test("It should associate a company to an industry", async function () {
    const response = await request(app)
      .post("/industries/link")
      .send({comp_code: "ibm", ind_code: "tech"});

    expect(response.body).toEqual(
      {
        "company association": {
          comp_code: "ibm",
          ind_code: "tech"
        }
      }
    );
  });
});