import mongoose from "mongoose";

export const USER_TYPE = ["USER", "ADMIN"];

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    enum: USER_TYPE,
    default: "USER",
  },
  phoneNumber: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
}
);

export default mongoose.model("User", userSchema);