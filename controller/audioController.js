const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { Readable } = require("stream");
const multer = require("multer");

const playAudio = async function (req, res) {
  try {
    const storage = multer.memoryStorage();
    const upload = multer({
      storage: storage,
      limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 },
    });
    upload.single("track")(req, res, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "Upload Request Validation Failed" });
      } else if (!req.body.name) {
        return res
          .status(400)
          .json({ message: "No track name in request body" });
      }
      let trackName = req.body.name;
      // Covert buffer to Readable Stream
      const readableTrackStream = new Readable();
      readableTrackStream.push(req.file.buffer);
      readableTrackStream.push(null);
      var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "tracks",
      });
      let uploadStream = bucket.openUploadStream(trackName);
      let id = uploadStream.id;
      readableTrackStream.pipe(uploadStream);
      uploadStream.on("error", () => {
        return res.status(500).json({ message: "Error uploading file" });
      });
      uploadStream.on("finish", () => {
        return res.status(201).json({
          message:
            "File uploaded successfully, stored under Mongo ObjectID: " + id,
        });
      });
    });
  } catch (error) {
    res.status(500).send({ status: false, error: error.message });
  }
};

const getAudio = async function (req, res) {
  try {
    var trackID = new ObjectId(req.params.trackID);
    res.set("content-type", "audio/mp3");
    res.set("accept-ranges", "bytes");
    var bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "tracks",
    });
    let downloadStream = bucket.openDownloadStream(trackID);
    downloadStream.on("data", (chunk) => {
      res.write(chunk);
    });
    downloadStream.on("error", () => {
      res.sendStatus(404);
    });
    downloadStream.on("end", () => {
      res.end();
    });
  } catch (error) {
    res.status(500).send({ status: false, error: error });
  }
};

module.exports = {
  getAudio,
  playAudio,
};
