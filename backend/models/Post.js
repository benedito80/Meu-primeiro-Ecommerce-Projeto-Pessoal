const mongoose = require("mongoose");
const aws = require("aws-sdk");
const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const s3 = new aws.S3();

const PostSchema = new mongoose.Schema({
  name: String /* nome original da img*/,
  size: Number /* temanho da img*/,
  key: String /* nome gerado pelo hash pra a img*/,
  url: String /* para amazon*/,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/*preenchendo a url quando trabalhando localmente, ou seja, dados indo pro mongoDb */
PostSchema.pre("save", function () {
  //antes de salvar "pre"
  if (!this.url) {
    this.url = `http://${process.env.IP_public_PORT}/files/${this.key}`;
  }
});

/*removendo as imagens da aws */
PostSchema.pre("remove", function () {
  if (process.env.STORAGE_TYPE == "s3") {
    return s3
      .deleteObject({
        Bucket: "uploadexample2",
        key: this.key,
      })
      .promise();
  } else {
    //removendo a img localmente
    return promisify(fs.unlink)(
      path.resolve(__dirname, "..", "temp", "uploads", this.key)
    );
  }
});

module.exports = mongoose.model("Post", PostSchema);
