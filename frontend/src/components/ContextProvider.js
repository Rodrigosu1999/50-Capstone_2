import React, {useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
import ItemsContext from "./ItemsContext";
import JoblyApi from "../Api";
import useLocalStorageState from "../hooks/useLocalStorageState"

//Context Provider for the App for features used in most of the App
const ContextProvider = ({children}) => {
  const [countries, setCountries] = useLocalStorageState("countries", false);
  const [country, setCountry] = useLocalStorageState("country", false);
  const [countryFound, setCountryFound] = useState("countryFound", true);
  const [continent, setContinent] = useState("World");
  const [token, setToken] = useLocalStorageState("token", false);
  const [currUser, setCurrUser] = useLocalStorageState("currUser", false);
  const [currUserCountries, setCurrUserCountries] = useLocalStorageState("currUserCountries", false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCountries()
    JoblyApi.token = token;
  }, []);

  // get call from all countries
  async function getCountries() {
    setIsLoading(true);
    let countries = await JoblyApi.getCountries();
    console.log(countries);
    setCountries(countries);
    setContinent("World")
    setCountryFound(true);
    setIsLoading(false);
  }
  
  // get call from all countries filtered
  async function getCountriesFiltered(name) {
    try {
      setIsLoading(true);
      let countries = await JoblyApi.getCountriesFiltered(name);
      console.log(countries);
      setCountries(countries);
      setContinent(`Filtered countries by: ${name}`)
      setCountryFound(true);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setCountryFound(false);
    }
  }
 
  // get call from a particular country
  async function getCountry(name) {
    setIsLoading(true);
    let country = await JoblyApi.getCountry(name);
    setCountry(country);
    setCountryFound(true);
    setIsLoading(false);
  }

  // get call from countries per continent
  async function getCountriesByContinent(continent) {
    setIsLoading(true);
    let countries = await JoblyApi.getCountriesByContinent(continent);
    let str2 = continent.charAt(0).toUpperCase() + continent.slice(1);
    setCountries(countries);
    setContinent(str2);
    setCountryFound(true);
    setIsLoading(false);
  }
  // get call from countries by subregion
  async function getCountriesBySubregion(region) {
    setIsLoading(true);
    let countries = await JoblyApi.getCountriesBySubregion(region);
    let str2 = region.charAt(0).toUpperCase() + region.slice(1);
    setCountries(countries);
    setContinent(str2);
    setCountryFound(true);
    setIsLoading(false);
  }

  // Get countries from the user for their profile page
  async function getCurrUserCountries(currUser){
    const currUserCountries = currUser.countries;
    let res = [];
    for (const country of currUserCountries) {
      res.push(await JoblyApi.getCountry(country));
    }
    setCurrUserCountries(res);
  }

  // post call to add country to a user
  async function addCountry(username, name) {
    const res = await JoblyApi.addCountry(username, name)
    let user = await JoblyApi.getInfo(username);
    setCurrUser(user);
    await getCurrUserCountries(user);
  }
  
  // post call to remove country to a user
  async function removeCountry(username, name) {
    const res = await JoblyApi.removeCountry(username, name)
    let user = await JoblyApi.getInfo(username);
    setCurrUser(user);
    await getCurrUserCountries(user);
  }


  //post call for a user to login
  async function login(username,password) {
    let token = await JoblyApi.login(username, password);
    let res = await JoblyApi.getInfo(username);
    setToken(token);
    setCurrUser(res);
    await getCountries();
    await getCurrUserCountries(res);
    return token;
  }
  //post call for a user to register
  async function register(username, password, firstName, lastName, email) {
    let token = await JoblyApi.register(username, password, firstName, lastName, email);
    let res = await JoblyApi.getInfo(username);
    setToken(token);
    setCurrUser(res);
    await getCountries();
    return token;
  }

  //update user's information

  async function update(username, firstName, lastName, email) {
    let res = await JoblyApi.update(username, firstName, lastName, email);
    let user = await JoblyApi.getInfo(username);
    setCurrUser(user);
  }

  //logout
  async function logout() {
    JoblyApi.logout()
    setToken(false);
    setCurrUser({})
  }

  return (
            <ItemsContext.Provider value={{ countryFound, isLoading, country, continent, countries, token, currUser, currUserCountries, update, getCountriesFiltered, getCountriesBySubregion, removeCountry, addCountry, register, getCountriesByContinent, getCountries, getCountry, login, logout}}>
                {children}
            </ItemsContext.Provider>
  )
}

export default ContextProvider;