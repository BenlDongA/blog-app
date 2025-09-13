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
const categories = ["Sport", "Tech", "Food", "Life"];
let posts = [];
app.use((req, res, next) => {
  res.locals.posts = posts;
  next();
});
// Home
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// New post
// New post
// New post
app.get("/new", (req, res) => {
  res.render("new", { categories });
});


app.post("/new", (req, res) => {
  const { title, content, image, category } = req.body;
  if (title && content) {
    posts.push({ title, content, image, category, date: new Date() });
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

// Edit post
// Edit post
app.get("/edit/:index", (req, res) => {
  const post = posts[req.params.index];
  if (post) {
    res.render("edit", { post, index: req.params.index, categories });
  } else {
    res.send("Post not found");
  }
});


app.post("/edit/:index", (req, res) => {
  const { title, content, image, category } = req.body;
  const i = req.params.index;
  if (posts[i]) {
    posts[i].title = title;
    posts[i].content = content;
    posts[i].image = image;
    posts[i].category = category;
  }
  res.redirect("/");
});

// Xem bài theo category
app.get("/category/:name", (req, res) => {
  const name = req.params.name;
  const filtered = posts.filter(p => 
    p.category && p.category.toLowerCase() === name.toLowerCase()
  );

  // render lại index.ejs nhưng chỉ truyền các bài cùng category
  res.render("index", { posts: filtered });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Blog running on http://localhost:${PORT}`);
});
