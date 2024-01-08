import Book from "@models/book";
import { connectToDb } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDb();

    const books = await Book.find({ creator: params.id }).populate("creator");

    return new Response(JSON.stringify(books), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch books created by user", {
      status: 500,
    });
  }
};
