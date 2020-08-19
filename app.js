const express = require("express");
const app = express();
const AnyList = require("anylist");

require("dotenv").config();

// Use the EJS template engine and set our static asset path.
app.set("view engine", "ejs");
app.use(express.static("public"));

// Handle requests to the index page.
app.get("/", (req, res) => {
  const anylist = new AnyList({
    email: process.env.ANYLIST_EMAIL,
    password: process.env.ANYLIST_PASSWORD,
  });

  // Authenticate with AnyList.
  anylist.login().then(async () => {
    await anylist.getLists();

    // Get the Movie Jar list and pick a random item from it.
    const movieList = anylist.getListByName(process.env.ANYLIST_LIST_NAME);
    let movie =
      movieList.items[Math.floor(Math.random() * movieList.items.length)]._name;

    // Close the WebSocket.
    anylist.teardown();

    res.render("index", { movie: movie });
  });
});

// Start the server.
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

module.exports = app;
