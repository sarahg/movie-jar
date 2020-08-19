const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

app.get("/", (req, res) => {
  const AnyList = require("anylist");

  const any = new AnyList({
    email: process.env.ANYLIST_EMAIL,
    password: process.env.ANYLIST_PASSWORD,
  });

  any.login().then(async () => {
    await any.getLists();

    let movies = [];

    // Get the Movie Jar list.
    const movieList = any.getListByName(process.env.ANYLIST_LIST_NAME);
    for (var i = 0, len = movieList.items.length; i < len; i++) {
      movies.push(movieList.items[i]._name);
    }

    // Return a random item from the list.
    let movie = movies[Math.floor(Math.random() * movies.length)];

    any.teardown();

    res.send(`Random movie: ${movie}`);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
