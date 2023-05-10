\echo 'Delete and recreate restcountries db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE restcountries;
CREATE DATABASE restcountries;
\connect restcountries

\i rest-countries-schema.sql

\echo 'Delete and recreate restcountries_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE restcountries_test;
CREATE DATABASE restcountries_test;
\connect restcountries_test

\i rest-countries-schema.sql
