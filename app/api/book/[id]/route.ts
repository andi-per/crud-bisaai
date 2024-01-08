import { connectToDb } from "@utils/database";
import Book from "@models/book";

// GET (read)
export const GET = async (request: any, { params }: any) => {
  try {
    await connectToDb();

    const book = await Book.findById(params.id).populate("creator");

    if (!book) return new Response("Book Not Found", { status: 404 });

    return new Response(JSON.stringify(book), { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

// PATCH
export const PATCH = async (request: any, { params }: any) => {
  const { title, author, reason, tag } = await request.json();

  try {
    await connectToDb();

    // Find the existing book by ID
    const existingBook = await Book.findById(params.id);

    if (!existingBook) {
      return new Response("Book not found", { status: 404 });
    }

    // Update the book with new data
    existingBook.title = title;
    existingBook.author = author;
    existingBook.reason = reason;
    existingBook.tag = tag;

    await existingBook.save();

    return new Response("Successfully updated the Books", { status: 200 });
  } catch (error) {
    return new Response("Error Updating Book", { status: 500 });
  }
};

// DELETE
export const DELETE = async (request: any, { params }: any) => {
  try {
    await connectToDb();

    // Find the book by ID and remove it
    await Book.findByIdAndDelete(params.id);

    return new Response("Book deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting book", { status: 500 });
  }
};
