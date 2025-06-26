const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});
todoSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Todo", todoSchema);
