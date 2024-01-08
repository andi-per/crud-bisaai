"use client";
import { useState, useEffect } from "react";

import BookCard from "./BookCard";
import Loader from "./Loader";
import { IBook } from "@models/interface";

const BookCardList = ({ data, handleTagClick }: any) => {
  return (
    <div className="mt-16 book_layout">
      {data.map((post: IBook) => (
        <BookCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

function Feed() {
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<IBook[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<
    string | number | Timeout | undefined
  >(null);
  const [searchedResults, setSearchedResults] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearchChange = (e: any) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      window.setTimeout(() => {
        const searchResult = filterBooks(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const filterBooks = (searchText: string | RegExp) => {
    const regex = new RegExp(searchText, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item?.tag) ||
        regex.test(item?.reason) ||
        regex.test(item?.title) ||
        regex.test(item?.author)
    );
  };

  const handleTagClick = (tagName: string) => {
    setSearchText(tagName);

    const searchResult = filterBooks(tagName);
    setSearchedResults(searchResult);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("api/book", {
        next: { revalidate: 10 },
      });
      const data = await response.json();

      setPosts(data.filter((post: any) => post.hasOwnProperty("creator")));
      console.log(data);
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Cari buku/penulis/tag/nama pengguna..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      {isLoading && <Loader />}
      {searchText && !isLoading ? (
        <BookCardList data={searchedResults} handleTagClick={handleTagClick} />
      ) : (
        <BookCardList data={posts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
}

export default Feed;
