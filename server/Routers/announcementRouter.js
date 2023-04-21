import multer from "multer";
import express, { response } from "express";
import Announcement from "../models/announcementModel.js";
import { v2 as cloudinary } from "cloudinary";
import { checkToken } from "../middlewares/middlewares.js";

const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const perPage = req.query.limit ? parseInt(req.query.limit) : 5;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const type = req.query.type ? req.query.type : null;
    const order = req.query.order ? req.query.order : "asc";
    const query = {
      $or: [
        { title: { $regex: req.query.search, $options: "i" } },
        { location: { $regex: req.query.search, $options: "i" } },
      ],
    };

    let sort = req.query.sort ? req.query.sort : null;

    if (sort === "date_added") {
      sort = "createdAt";
    } else if (sort === "highest_price") {
      sort = "price";
    }

    const count = await Announcement.countDocuments({
      type: type ? type : { $exists: true },
      $or: [
        { title: { $regex: req.query.search, $options: "i" } },
        { location: { $regex: req.query.search, $options: "i" } },
      ],
    });

    const announcements = await Announcement.find({
      type: type ? type : { $exists: true },
      ...query,
    })
      .sort({ [sort]: order })
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.status(200).json({ announcements, totalCount: count });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.post(
  "/upload",
  checkToken,
  upload.single("photo"),
  async function (req, res, next) {
    try {
      const {
        title,
        description,
        location,
        slaapkamers,
        badkamers,
        price,
        type,
      } = req.body;

      // Cloudinary upload
      const result = await cloudinary.uploader.upload(req.file.path);

      // Create new announcement
      const data = new Announcement({
        title,
        description,
        location,
        slaapkamers,
        badkamers,
        price,
        type,
        photoUrl: result.secure_url,
      });
      await data.save();
      cloudinary.uploader.destroy(req.file.filename);

      res.status(200).json({
        header: "Success",
        message: "Announcement created",
      });
    } catch (err) {
      res.status(500).json({
        header: "Error",
        message: err.message,
      });
    }
  }
);

export default router;
