const { BadRequestError } = require("../expressError");

// THIS NEEDS SOME GREAT DOCUMENTATION.

/**
 * Generates SQL for a partial update operation based on the given data. 
 * This function constructs SQL SET clause and corresponding values for a partial update operation.
 * 
 * @param {object} dataToUpdate - The object containing data to update
 * @param {object} jsToSql - Mapping of JavaScript object keys to their corresponding SQL column names
 * @returns {object} An object containing SQL SET clause and corresponding values
 * @throws {BadRequestError} When no data is given for update
 * 
 * @example
 * const dataToUpdate = { firstName: "Drew", lastName: "Berry"};
 * const jsToSql = {firstName: "first_name", lastName: "last_name"}
 * const sqlData = sqlForPartialUpdate(dataToUpdate, jsToSql);
 * 
 *  sqlData: { 
 *    setCols: `"first_name"=$1, "last_name=$2"`,
 *    values: ['Drew', 'Barry']
 *  }
 *  
 */

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
  // Extract keys from the given data object
  const keys = Object.keys(dataToUpdate);

  // Throw an error if no data is given for updata
  if (keys.length === 0) throw new BadRequestError("No data");

  // Map keys to SQL column names and construct SET clause
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

  // Returns an object containing SET clause and corresponding values
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
