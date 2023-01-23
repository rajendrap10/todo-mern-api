const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      require: [true, "ToDo is Required"],
      trim: true,
      maxlength: [225, "ToDo must be 225 Ch Long"],
      unique: true,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ToDo", todoSchema);
