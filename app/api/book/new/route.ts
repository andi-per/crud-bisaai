import { connectToDb } from "@utils/database";
import Book from "@models/book";

export const POST = async (req, res) => {
  const { userId, title, author, reason, tag } = await req.json();

  try {
    await connectToDb();
    const newBook = await Book.create({
      creator: userId,
      title,
      author,
      reason,
      tag,
    });

    await newBook.save();
    return new Response(JSON.stringify(newBook), { status: 201 });
  } catch (error) {
    return new Response("Failed to share a book", { status: 500 });
  }
};
