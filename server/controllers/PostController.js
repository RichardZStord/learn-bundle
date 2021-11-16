var Post = require("../models/Post");
var multer = require("multer");
var path = require("path");
var fs = require("fs");

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname);
  },
});

var upload = multer({ storage: storage });

exports.post_add = [
  upload.single("image"),
  function (req, res, next) {
    var newPost = new Post({
      title: req.body.title,
      user: req.body.user,
      description: req.body.description,
      prereqs: req.body.prereqs,
      tags: req.body.tags,
      submission_date: Date.now(),
      image: {
        data: fs.readFileSync(
          path.join(__dirname, "..", "uploads", req.file.filename)
        ),
        contentType: req.file.mimetype,
      },
    });
    newPost.save((err) => {
      if (err) {
        console.log(err);
        return next(err);
      }
      res.send("Successfully added new post to database");
    });
  },
];