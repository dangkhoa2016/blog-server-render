require('dotenv').config();
const express = require("express");
const cors = require('cors');
// Set Handlebars.
const exphbs = require("express-handlebars"),
  layouts = require("express-handlebars-layouts");
const helpers = require("./libs/handlebars-helpers");
const static_data = require('./libs/static_data');
const route = require("./routes/index");

const PORT = process.env.PORT || 8080;

const app = express();

// allow cross-origin requests
app.use(cors());

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Create `ExpressHandlebars` instance with a default layout.
var hbs = exphbs.create({
  helpers: helpers,
  defaultLayout: "main",
  extname: '.hbs',
  // Uses multiple partials dirs, templates in "shared/templates/" are shared
  // with the client-side of the app (see below).
  partialsDir: ["views/partials/"]
});

//Register layouts helpers on handlebars
hbs.handlebars.registerHelper(layouts(hbs.handlebars));

// Register `hbs` as our view engine using its bound `engine()` function.
app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");


//for all route
app.use((req, res, next) => {
  var is_json = req.is("json");
  if (!is_json) {
    var accept = req.headers["accept"];
    var contype = req.headers["content-type"];
    var check1 = contype && contype.indexOf("application/json") !== -1;
    var check2 = accept && accept.indexOf("application/json") !== -1;
    if (check1 || check2) is_json = true;
  }
  req.is_json = is_json;
  
  app.locals.url = req.originalUrl;
  app.locals.is_home_page = static_data.home_urls.findIndex(u => req.originalUrl.toLowerCase() == u.toLowerCase()) !== -1;
  app.locals.categories = static_data.categories;
  app.locals.archives = static_data.archives;
  app.locals.tags = static_data.tags;
  app.locals.contact = static_data.contact;
  next();
});

// Import routes and give the server access to them.
app.use(route);

// catch 404 Not found middleware
app.use((req, res, next) => {
  console.log("Not found", req.url);
  const err = new Error(`The page requested does not exist.`);
  res.status(404).render("page_not_found", { err });
});

//Global error middleware handler
app.use(function(err, req, res, next) {
  // console.log("Global error", err);
  
  if (err && err.status === 404) {
    err.message = `The page requested does not exist.`;
    res.status(404).render("page_not_found", { err });
  } else {
    if (!err.message)
      err.message = `Ooops! It looks like something went wrong on the server.`;
    res.status(err.status || 500).render("server_error", { err });
  }
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
