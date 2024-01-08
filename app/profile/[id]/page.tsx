"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";
import { IBook } from "@models/interface";

function UserProfile({ params }: any) {
  const searchParams = useSearchParams();
  const username = searchParams.get("name");

  const [posts, setPosts] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPosts(data);
      setIsLoading(false);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={username}
      desc={`Selamat datang di halaman profil ${username}. Temukan buku-buku bagus rekomendasi ${username} kepada Dunia.`}
      data={posts}
      isLoading={isLoading}
    />
  );
}

export default UserProfile;
