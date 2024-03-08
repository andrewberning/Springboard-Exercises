\c biztime_relationships_test

DROP TABLE IF EXISTS company_industries;
DROP TABLE IF EXISTS industries;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS companies;


CREATE TABLE companies (
    code text PRIMARY KEY,
    name text NOT NULL UNIQUE,
    description text
);

CREATE TABLE invoices (
    id serial PRIMARY KEY,
    comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
    amt float NOT NULL,
    paid boolean DEFAULT false NOT NULL,
    add_date date DEFAULT CURRENT_DATE NOT NULL,
    paid_date date,
    CONSTRAINT invoices_amt_check CHECK ((amt > (0)::double precision))
);

CREATE TABLE industries (
  ind_code text PRIMARY KEY,
  ind_name text NOT NULL UNIQUE
);

CREATE TABLE company_industries (
  comp_code text NOT NULL REFERENCES companies ON DELETE CASCADE,
  ind_code text NOT NULL REFERENCES industries ON DELETE CASCADE,
  PRIMARY KEY(comp_code, ind_code) 
);

INSERT INTO companies
  VALUES ('apple', 'Apple Computer', 'Maker of OSX.'),
         ('ibm', 'IBM', 'Big blue.');

INSERT INTO invoices (comp_code, amt, paid, paid_date)
  VALUES ('apple', 100, false, null),
         ('apple', 200, false, null),
         ('apple', 300, true, '2018-01-01'),
         ('ibm', 400, false, null);

INSERT INTO industries
  VALUES 
    ('telecom', 'Telecommunications'),
    ('tech', 'Technology'),
    ('mfr', 'Manufacturing');

INSERT INTO company_industries (
  VALUES 
    ('apple', 'tech'),
    ('apple', 'mfr'),
    ('ibm', 'mfr'),
    ('ibm', 'telecom')
);

-- SELECT i.ind_code, i.ind_name, c.code
-- FROM industries AS i
-- LEFT JOIN company_industries AS ci
-- ON i.ind_code = ci.ind_code
-- LEFT JOIN companies AS c
-- ON ci.comp_code = c.code
-- WHERE ind_code = 'mfr';

-- SELECT c.code, c.name, c.description, i.ind_name
-- FROM companies AS c
-- FULL JOIN company_industries AS ci
-- ON c.code = ci.comp_code
-- FULL JOIN industries AS i
-- ON ci.ind_code = i.ind_code
-- WHERE c.code = 'oracle';

