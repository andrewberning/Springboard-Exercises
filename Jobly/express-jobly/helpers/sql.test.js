const { sqlForPartialUpdate } = require("./sql");


describe ("sqlForPartialUpdate", function () {
  // Test case for valid data
  test("Should generate SQL for partial update with valid data", function () {
    const dataToUpdate = { firstName: "Drew", lastName: "Berry" };
    const jsToSql = { firstName: "first_name", lastName: "last_name" };
    const expectedSqlData = { 
      setCols: '"first_name"=$1, "last_name"=$2',
      values: ["Drew", "Berry"]
    };

    // Call the function and assert the output
    expect(sqlForPartialUpdate(dataToUpdate, jsToSql)).toEqual(expectedSqlData);
  });

  // Test case for empty data
  test("Should throw BadRequestError when no data is given", function () {
    const dataToUpdate = {};
    const jsToSql = {};

    // Call the function and expect it to throw BadRequestError
    expect(() => {
      sqlForPartialUpdate(dataToUpdate, jsToSql);
    }).toThrowError('No data');
  });
});