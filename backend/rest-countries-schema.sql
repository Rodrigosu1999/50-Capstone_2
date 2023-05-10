CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1)
);

CREATE TABLE countries (
  name  VARCHAR PRIMARY KEY,
  official_name TEXT,
  capital TEXT,
  region TEXT,
  subregion TEXT,
  language TEXT,
  area FLOAT,
  population INTEGER,
  flag VARCHAR,
  coat_of_arms VARCHAR,
  image1 VARCHAR,
  image2 VARCHAR,
  image3 VARCHAR,
  image4 VARCHAR,
  image5 VARCHAR
);

CREATE TABLE users_countries (
  username VARCHAR(25)
    REFERENCES users ON DELETE CASCADE,
  name VARCHAR
    REFERENCES countries ON DELETE CASCADE,
  PRIMARY KEY (username, name)
);
