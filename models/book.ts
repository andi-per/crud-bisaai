import { Schema, model, models } from "mongoose";

const BookSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: [true, "Title is required."],
  },
  author: {
    type: String,
    required: [true, "Author is required."],
  },
  reason: {
    type: String,
    required: [true, "Reason is required."],
  },
  tag: {
    type: String,
    required: [true, "Tag is required."],
  },
});

const Book = models.Book || model("Book", BookSchema);

export default Book;
