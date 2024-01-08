"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

function UpdatePost() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("id");

  const [post, setPost] = useState({
    title: "",
    author: "",
    reason: "",
    tag: "",
  });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getBookDetails = async () => {
      const response = await fetch(`/api/book/${bookId}`);
      const data = await response.json();

      setPost({
        title: data.title,
        author: data.author,
        reason: data.reason,
        tag: data.tag,
      });
    };

    if (bookId) getBookDetails();
  }, [bookId]);

  const updateBook = async (evt: Event) => {
    evt.preventDefault();
    setIsSubmitting(true);

    if (!bookId) return alert("Missing BookId!");

    try {
      const response = await fetch(`/api/book/${bookId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: post.title,
          author: post.author,
          reason: post.reason,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      onSubmit={updateBook}
    />
  );
}

export default UpdatePost;
