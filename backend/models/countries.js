"use strict";

const db = require("../db");
const axios = require("axios");
require("dotenv").config();
const {capitalizeWord} = require("../helpers/capitalize");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../helpers/expressError");

const BASE_COUNTRIES_URL = "https://restcountries.com/v3.1/"
const BASE_UNSPLASH_URL = "https://api.unsplash.com/"
const SECRET_KEY = process.env.UNSPLASH_KEY || "secret-key";

/** Related functions for countries. */

class Countries {

  /**Method to find a countriy's images
   **/ 
  static async findImgs(country) {
    const config = {headers:{
      Authorization: SECRET_KEY}
    }
    const result = await axios.get(BASE_UNSPLASH_URL+`search/photos?query=${country}`, config)
    return result.data;
  }
  /**Method to find all countries
   * 
   * Returns {name, official name, language, ...}
   * Throws NotFoundError if the continent is not found.
   **/ 
  static async findAll() {
    const result = await axios.get(BASE_COUNTRIES_URL+`all`)

    return result.data;
  }
 
  /**Method to find all countries with similar names
   * 
   * Returns {name, fflag}
   * Throws NotFoundError no countries are found
   **/ 
  static async findAllFiltered(name) {
    const result = await axios.get(BASE_COUNTRIES_URL+`name/${name}`)

    return result.data;
  }

  /**Method to find all countries per continent
   * 
   * Returns {name, official name, language, ...}
   * Throws NotFoundError if the continent is not found.
   **/ 
  static async findAllByContinent(continent) {
    const result = await axios.get(BASE_COUNTRIES_URL+`region/${continent}`)

    return result.data;
  }
  
  /**Method to find all countries per subregion
   * 
   * Returns {name, official name, language, ...}
   * Throws NotFoundError if the subregion is not found.
   **/ 
  static async findAllBySubregion(subregion) {
    const result = await axios.get(BASE_COUNTRIES_URL+`subregion/${subregion}`)

    return result.data;
  }

  /** Given a name, return data about a country.
   * {name, official name, language, ...}
   *
   * Throws NotFoundError if user not found.
   **/

  static async get(name) {
    const capitalizedName = capitalizeWord(name);
    //If the country is saved in the database the information will be retrieved from it
    const duplicateCheck = await db.query(
      `SELECT *
       FROM countries
       WHERE name = ($1)`,
      [capitalizedName],
    );
    if (duplicateCheck.rows[0]) {
      return duplicateCheck.rows[0];
    }
    /* In case the country hasn't been saved, it will be registered
    *  to the database so it won't be needed to recall the info from the API
    */ 
    const resultAPI = await axios.get(BASE_COUNTRIES_URL+`name/${name}?fullText=true`)
    const imgs = await this.findImgs(name);
    const country = resultAPI.data[0];
    const countryName = (country.name.common);
    const countryOfficialName = (country.name.official);
    const capital = (country.capital[0]);
    const region = (country.region);
    const subregion = (country.subregion);
    const languages = (country.languages);
    const language = (Object.values(languages)[0]);
    const area = (country.area);
    const population = (country.population);
    const flag = (country.flags.png);
    const coat_of_arms = (country.coatOfArms.png);
    const image1 = imgs.total !== 0 ? imgs.results[0].urls.small : false;
    const image2 = imgs.total !== 0 ? imgs.results[1].urls.small : false;
    const image3 = imgs.total !== 0 ? imgs.results[2].urls.small : false;
    const image4 = imgs.total !== 0 ? imgs.results[3].urls.small : false;
    const image5 = imgs.total !== 0 ? imgs.results[4].urls.small : false;

    const result = await db.query(
      `INSERT INTO countries
       (name,
       official_name,
       capital,
       region,
       subregion,
       language, 
       area,
       population,
       flag,
       coat_of_arms,
       image1,
       image2,
       image3,
       image4,
       image5)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
       RETURNING name, official_name, capital, region, subregion, language, area, population, flag, coat_of_arms, image1, image2, image3, image4, image5`,
        [
          countryName,
          countryOfficialName,
          capital,
          region,
          subregion,
          language, 
          area,
          population,
          flag,
          coat_of_arms,
          image1,
          image2,
          image3,
          image4,
          image5 
        ],
    );

    const countryInDb = result.rows[0];

    return countryInDb;
  }
}


module.exports = Countries;
