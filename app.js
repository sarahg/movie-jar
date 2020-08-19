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

    // Get the Movie Jar list.
    const movieList = any.getListByName(process.env.ANYLIST_LIST_NAME);
    console.log(movieList);

    // Return a random item from the list.
    let movie = "";

    any.teardown();

    res.send(`Random movie: ${movie}`);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
