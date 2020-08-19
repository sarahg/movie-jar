const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const AnyList = require("anylist");

  const any = new AnyList({
    email: "",
    password: "",
  });

  any.login().then(async () => {
    await any.getLists();

    // Get the Movie Jar list.
    const movieList = any.getListByName("Movie Jar");
    console.log(movieList);

    any.teardown();
  });

  res.send("Hello World reloaded!!!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
