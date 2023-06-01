const db = require("../db");
const Country = require("../models/countries");


describe("Test Country class", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM countries");
    await db.query("DELETE FROM users");
  });

  test("can get", async function () {
    let country = await Country.get("Mexico");
    expect(country).toEqual({
      name: 'Mexico',
        official_name: 'United Mexican States',
        capital: 'Mexico City',
        region: 'Americas',
        subregion: 'North America',
        language: 'Spanish',
        area: expect.any(Number),
        population: expect.any(Number),
        flag: expect.any(String),
        coat_of_arms: expect.any(String),
        image1: expect.any(String),
        image2: expect.any(String),
        image3: expect.any(String),
        image4: expect.any(String),
        image5: expect.any(String),
    });
  });

  test("can get all countries", async function () {
    let countries = await Country.findAll();
    expect(countries.length).toEqual(250);
  });
  
  test("can get all countries by continent", async function () {
    let countries = await Country.findAllByContinent("Europe");
    expect(countries.length).toEqual(53);
  });
  
  test("can get all countries by subregion", async function () {
    let countries = await Country.findAllBySubregion("Eastern Europe");
    expect(countries.length).toEqual(4);
  });
  
  test("can get all countries filtered", async function () {
    let countries = await Country.findAllFiltered("Spa");
    expect(countries.length).toEqual(1);
  });
});

afterAll(async function() {
  await db.end();
});
