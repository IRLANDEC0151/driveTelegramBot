import mongoose from "mongoose";
const { Schema, model } = mongoose;
const userSchema = new Schema({
  telegramId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },

  routes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Route",
    },
  ]
});

export default model("User", userSchema);
