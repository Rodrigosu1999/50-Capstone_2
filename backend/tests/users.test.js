const db = require("../db");
const User = require("../models/user");


describe("Test User class", function () {
  beforeEach(async function () {
    await db.query("DELETE FROM countries");
    await db.query("DELETE FROM users");
    let u = await User.register({
      username: "test",
      password: "password",
      firstName: "Test",
      lastName: "Testy",
      email: "test@gmail.com",
    });
  });

  test("can register", async function () {
    let u = await User.register({
      username: "joel",
      password: "password",
      firstName: "Joel",
      lastName: "Burton",
      email: "JoelBurton@gmail.com",
    });

    expect(u.username).toBe("joel");
    expect(u.email).toBe("JoelBurton@gmail.com");
  });

  test("can authenticate", async function () {
    let isValid = await User.authenticate("test", "password");
    expect(isValid).toBeTruthy();
  });

  test("can get", async function () {
    let u = await User.get("test");
    expect(u).toEqual({
      username: "test",
      firstName: "Test",
      lastName: "Testy",
      email: "test@gmail.com",
      countries: expect.any(Array),
    });
  });
});

afterAll(async function() {
  await db.end();
});
