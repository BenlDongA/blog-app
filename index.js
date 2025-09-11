const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(expressLayouts);
app.set("layout", "layout");

let posts = [];

// Home
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// New post
app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/new", (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    posts.push({ title, content, date: new Date() });
  }
  res.redirect("/");
});

// View post
app.get("/post/:index", (req, res) => {
  const post = posts[req.params.index];
  if (post) {
    res.render("post", { post });
  } else {
    res.send("Post not found");
  }
});

// Delete post
app.post("/delete/:index", (req, res) => {
  posts.splice(req.params.index, 1);
  res.redirect("/");
});

// Edit post (GET form)
app.get("/edit/:index", (req, res) => {
  const post = posts[req.params.index];
  if (post) {
    res.render("edit", { post, index: req.params.index });
  } else {
    res.send("Post not found");
  }
});

// Edit post (POST save)
app.post("/edit/:index", (req, res) => {
  const { title, content } = req.body;
  const i = req.params.index;
  if (posts[i]) {
    posts[i].title = title;
    posts[i].content = content;
  }
  res.redirect("/");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Blog running on http://localhost:${PORT}`);
});
