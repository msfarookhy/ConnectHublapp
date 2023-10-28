import mongoose from "mongoose";

const subUserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);


const subUser = mongoose.model("SubUser", subUserSchema);

export default subUser;
