const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs"); // ejs for templating

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "add text",
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
);

const itemsSchema = {
  name: String,
  isCompleted: Boolean,
};

//mongoose model (captilize name)
const Item = mongoose.model("Item", itemsSchema);

app.get("/", (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      res.render("list", { newListItems: foundItems });
    }
  });
});

app.post("/", (req, res) => {
  const itemName = req.body.newItem; // getting from list.ejs

  const item = new Item({
    name: itemName,
    isCompleted: false,
  });

  item.save();
  res.redirect("/");
});

app.get("/active", (req, res) => {
  const found = [];
  Item.find({}, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundItems);

      foundItems.map((item) => {
        if (item.isCompleted === false) {
          found.push(item);
        }
      });
    }
  }).then(() => {
    res.render("list", { newListItems: found });
  });
});

app.get("/complete", (req, res) => {
  const found = [];
  Item.find({}, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      console.log(foundItems);

      foundItems.map((item) => {
        if (item.isCompleted === true) {
          found.push(item);
        }
      });
    }
  }).then(() => {
    res.render("list", { newListItems: found });
  });
});

app.get("/clearcomplete", (req, res) => {
  Item.deleteMany({ isCompleted: true }, (err) => {
    console.log(err);
  }).then(() => res.redirect("/"));
});

app.get("/toggle", (req, res) => {
  //console.log(req.query.id);
  const id = req.query.id;

  Item.findById(id, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.isCompleted = !item.isCompleted;
      item.save().then(() => res.redirect("/"));
    }
  });
});

app.post("/delete", (req, res) => {
  //console.log(req.body);
  const checkedItemId = req.body.checkbox;

  Item.findByIdAndRemove(checkedItemId, (err) => {
    if (!err) {
      console.log("Successfully deleted item");
      res.redirect("/"); // to render it on page
    } else {
      console.log(err);
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port 3000");
});
