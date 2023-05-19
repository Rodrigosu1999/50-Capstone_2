import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class CountriesApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${CountriesApi.token}`};
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get all countries  */

  static async getCountries() {
    try {
      let res = await this.request(`countries/all`);
      return res.countries;
    } catch (err) {
      console.error("API Error:", err.response);
    }
  }

  /** Get all countries filtered by name  */

  static async getCountriesFiltered(name) {
    try {
      let res = await this.request(`countries/all/${name}`);
      return res.countries;
    } catch (err) {
      console.error("API Error:", err.response);
      if (err.response.data.message === 'Request failed with status code 404') {
        return [];
      }
    }
  }

  /** Get all countries by continent.  */

  static async getCountriesByContinent(continent) {
    try {
      let res = await this.request(`countries/continent/${continent}`);
      return res.countries;
    } catch (err) {
      console.error("API Error:", err.response);
    }
  }
  /** Get all countries by subregion (North America, Eastern Europe, etc.).  */

  static async getCountriesBySubregion(subregion) {
    try {
      let res = await this.request(`countries/subregion/${subregion}`);
      return res.countries;
    } catch (err) {
      console.error("API Error:", err.response);
    }
  }
  
  /** Get details on a particular country by name. */

  static async getCountry(name) {
    try {
      let res = await this.request(`countries/name/${name}`);
    return res.country;
    } catch (err) {
    }
  }
  
  /** Get user's info */

  static async getInfo(user) {
    try {
      let res = await this.request(`users/${user}/`);
      return res.user;
    } catch (err) {
      return false
    }
  }

    /** Add country to a user*/

    static async addCountry(username, countryName) {
      try {
        let res = await this.request(`users/${username}/countries/${countryName}`, {}, "post");
      } catch (err) {
        return false
      }
    }
    /** Remove country to a user*/

    static async removeCountry(username, countryName) {
      try {
        let res = await this.request(`users/${username}/countries/${countryName}`, {}, "delete");
      } catch (err) {
        return false
      }
    }

  /** Login */

  static async login(username, password) {
    try {
      let res = await this.request(`auth/token/`, {username, password}, "post");
      CountriesApi.token = res.token;
      return res.token;
    } catch (err) {
      return false
    }
  }
  
  /** Register */

  static async register(username, password, firstName, lastName, email) {
    try {
      let res = await this.request(`auth/register/`, {username, password, firstName, lastName, email}, "post");
      CountriesApi.token = res.token;
      return res.token;
    } catch (err) {
      return false
    }
  }

  /** Update user's profile */

  static async update(username, firstName, lastName, email) {
    try {
      let res = await this.request(`users/${username}/`, {firstName, lastName, email}, "patch");
      return res.user;
    } catch (err) {
      return false
    }
  }
  
  /** Logout */

  static async logout() {
    try {
      CountriesApi.token = false
    } catch (err) {
      console.error("API Error:", err.response);
    }
  }
}

    export default CountriesApi;