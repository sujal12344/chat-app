import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      index: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      match: [
        /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password must contain at least one special character, one number, one lowercase and one uppercase letter, and at least 8 or more characters",
      ],
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    DOB: {
      type: Date,
      required: [false, "Date of Birth is required"],
    },
    profilePic: {
      type: String,
      default: "",
    },
    // token: {
    //   type: String,
    //   default: "",
    // },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
