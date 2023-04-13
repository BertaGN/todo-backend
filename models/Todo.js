const { Schema, model } = require("mongoose");

const TodoSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  todoId: {
    type: String,
    required: true,
  },
  isEditing: {
    type: Boolean,
    required: true,
  }
//   status: {
//     type: String,
//     required: true,
//   }
});

module.exports = model("Todo", TodoSchema);