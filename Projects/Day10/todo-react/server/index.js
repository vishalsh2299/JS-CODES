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

mongoose.connect(
  "mongodb+srv://vishal-admin:26lemon26@cluster0.ymtzt.mongodb.net/todolistdb?retryWrites=true&w=majority",
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
      res.status(200).json(foundItems);

      //res.render("list", { newListItems: foundItems });
    }
  });
});

app.post("/", (req, res) => {
  // console.log(req.body);
  // const val = JSON.parse(Object.keys(req.body));
  // // console.log(val.name);
  const itemName = req.body.name;

  const item = new Item({
    name: itemName,
    isCompleted: false,
  });

  item.save().then(() => {
    Item.find({}, (err, foundItems) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(foundItems);
      }
    });
  });
});

app.get("/active", (req, res) => {
  const found = [];
  Item.find({}, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      // console.log(foundItems);

      foundItems.map((item) => {
        if (item.isCompleted === false) {
          found.push(item);
        }
      });
    }
  }).then(() => {
    res.status(200).json(found);
    //res.render("list", { newListItems: found });
  });
});

app.get("/complete", (req, res) => {
  const found = [];
  Item.find({}, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      //console.log(foundItems);

      foundItems.map((item) => {
        if (item.isCompleted === true) {
          found.push(item);
        }
      });
    }
  }).then(() => {
    // console.log(found);
    res.status(200).send(found);
    //res.render("list", { newListItems: found });
  });
});

app.get("/clearcomplete", (req, res) => {
  Item.deleteMany({ isCompleted: true }, (err, found) => {
    console.log(err);
  }).then(() => {
    Item.find({}, (err, foundItems) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(foundItems);
      }
    });
  });
});

app.get("/toggle", (req, res) => {
  // console.log(req.query.id);
  const id = req.query.id;

  Item.findById(id, (err, item) => {
    if (err) {
      console.log(err);
    } else {
      item.isCompleted = !item.isCompleted;
      item.save().then(() => res.status(200).send({ success: true }));
    }
  });
});

app.post("/delete", (req, res) => {
  //console.log("Delete" + req.body.id);
  const itemId = req.body.id;

  Item.findByIdAndRemove(itemId, (err) => {
    if (!err) {
      console.log("Successfully deleted item");
      res.status(200).send({ success: true }); // to render it on page
    } else {
      console.log(err);
    }
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server started on port 5000");
});
