const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  const AnyList = require("anylist");

  const any = new AnyList({
    email: process.env.ANYLIST_EMAIL,
    password: process.env.ANYLIST_PASSWORD,
  });

  any.login().then(async () => {
    await any.getLists();

    // Get the Movie Jar list and pick a random item from it.
    const movieList = any.getListByName(process.env.ANYLIST_LIST_NAME);
    let movie =
      movieList.items[Math.floor(Math.random() * movieList.items.length)]._name;

    any.teardown();

    res.render("index", { movie: movie });
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
