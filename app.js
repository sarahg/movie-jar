const express = require("express");
const app = express();
const AnyList = require("anylist");

require("dotenv").config();

// Use the EJS template engine and set our static asset path.
app.set("view engine", "ejs");
app.use(express.static("public"));

const anylist = new AnyList({
  email: process.env.ANYLIST_EMAIL,
  password: process.env.ANYLIST_PASSWORD,
});

// Handle requests to the index page.
app.get("/", (req, res) => {
  anylist.login().then(async () => {
    await anylist.getLists();
    res.render("index", { movie: getMovie(anylist, "Movie Jar") });
  });
});

// Seasonal pages.
app.get("/halloween", (req, res) => {
  anylist.login().then(async () => {
    await anylist.getLists();
    res.render("index", { movie: getMovie(anylist, "Movie Jar - Halloween") });
  });
});
app.get("/christmas", (req, res) => {
  anylist.login().then(async () => {
    await anylist.getLists();
    res.render("index", { movie: getMovie(anylist, "Movie Jar - Christmas") });
  });
});

/**
 * Pick a random item from an AnyList.
 * @param {*} anylist
 * @param {*} list_name
 */
const getMovie = (anylist, list_name) => {
  const movieList = anylist.getListByName(list_name);
  anylist.teardown();

  let movie = "No movies found!";

  if (movieList) {
    movie =
      movieList.items[Math.floor(Math.random() * movieList.items.length)]._name;
  }

  return movie;
};

// Start the server.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

module.exports = app;
