const multer = require("multer");
const upload = multer({ storage });

//salvando e nomeando o upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

/*upload de imagens */
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/", upload.single("img"), (req, res) => {
  console.log(req.body, req.file);
  res.send("OK");
});

// error handler
app.use((err, req, res, next) => {
  if (err.name === "ValidationError") {
    var valErrors = [];
    Object.keys(err.errors).forEach((key) =>
      valErrors.push(err.errors[key].message)
    );
    res.status(422).send(valErrors);
  } else {
    console.log(err);
  }
});
