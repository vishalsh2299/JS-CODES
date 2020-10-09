const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PATCH,PUT,DELETE,OPTIONS"
  );
  next();
});

mongoose
  .connect(
    "mongodb+srv://vishal-admin:26lemon26@cluster0.lndrq.mongodb.net/blog?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  )
  .then(() => {
    console.log("Mongo DB Connected...");
  })
  .catch((err) => {
    console.log(err);
  });

// const postSchema = {
//   title: String,
//   content: String,
// };

// const Post = mongoose.model("Post", postSchema);

// GETTING POST
app.use("/", require("./routes/post"));

// COMPOSING POSTrequire("./routes/post"));

// DELETING POST
app.use("/delete", require("./routes/post"));

// EDIT POST
app.use("/edit", require("./routes/post"));

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
