import { connectToDb } from "@utils/database";
import Book from "@models/book";

export const GET = async (request) => {
  try {
    await connectToDb();

    const books = await Book.find({}).populate("creator");

    return new Response(JSON.stringify(books), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all books", { status: 500 });
  }
};
