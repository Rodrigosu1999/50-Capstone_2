"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureCorrectUser, ensureAdmin, ensureLoggedIn, authenticateJWT } = require("../middleware/auth");
const { BadRequestError, NotFoundError } = require("../helpers/expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");
const Countries = require("../models/countries");

const router = express.Router();


/** GET / => { page: int, countries [ {name, flag, .... }, ... ] }
 *
 * Returns list of all countries
 *
 * Authorization required: Logged In
 **/

router.get("/all", ensureLoggedIn, async function (req, res, next) {
  try {
    const countries = await Countries.findAll(req.params.continent);
    if (countries.length === 0) {
      throw new NotFoundError();
    }
    return res.json({countries});
  } catch (err) {
    return next(err);
  }
});

/** GET / => { page: int, countries [ {name, flag, .... }, ... ] }
 *
 * Returns list of all countries per continent
 *
 * Authorization required: Logged In
 **/

router.get("/continent/:continent", ensureLoggedIn, async function (req, res, next) {
  try {
    const countries = await Countries.findAllByContinent(req.params.continent);
    if (countries.length === 0) {
      throw new NotFoundError();
    }
    return res.json({countries});
  } catch (err) {
    return next(err);
  }
});

/** GET / => { page: int, countries [ {name, flag, .... }, ... ] }
 *
 * Returns list of all countries per subregion
 *
 * Authorization required: Logged In
 **/

router.get("/subregion/:subregion", ensureLoggedIn, async function (req, res, next) {
  try {
    const countries = await Countries.findAllBySubregion(req.params.subregion);
    if (countries.length === 0) {
      throw new NotFoundError();
    }
    return res.json({countries});
  } catch (err) {
    return next(err);
  }
});


/** GET /[name] => { country }
 *
 * { country [ {name, flag, .... }] }
 *
 * Authorization required: Logged In
 **/

router.get("/name/:name", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    const country = await Countries.get(req.params.name);
    return res.json({ country });
  } catch (err) {
    return next(err);
  }
});

/** GET /[name] => { countries }
 *
 * { countries: [country [ {name, flag, .... }, ... ] ]}
 *
 * Authorization required: Logged In
 **/

router.get("/all/:name", authenticateJWT, ensureLoggedIn, async function (req, res, next) {
  try {
    const countries = await Countries.findAllFiltered(req.params.name);
    return res.json({ countries });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
