import mongoose from "mongoose";

const announcementSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    slaapkamers: {
      type: Number,
      required: true,
    },

    badkamers: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    photoUrl: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Announcement", announcementSchema);
