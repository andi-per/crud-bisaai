"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

function CreatePost() {
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    title: "",
    author: "",
    reason: "",
    tag: "",
  });

  const router = useRouter();
  const { data: session } = useSession();

  const createPost = async (evt: Event) => {
    evt.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/book/new", {
        method: "POST",
        body: JSON.stringify({
          title: post.title,
          author: post.author,
          reason: post.reason,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Bagikan"
      post={post}
      setPost={setPost}
      submitting={submitting}
      onSubmit={createPost}
    />
  );
}

export default CreatePost;
