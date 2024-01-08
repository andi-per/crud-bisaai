"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { IBook } from "@models/interface";

function MyProfile() {
  const { data: session } = useSession();
  const router = useRouter();

  const [myPosts, setMyPosts] = useState<IBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleEdit = (post: IBook) => {
    router.push(`/update-buku?id=${post._id}`);
  };
  const handleDelete = async (post: IBook) => {
    const hasConfirmed = confirm("Apakah anda yakin menghapus postingan ini?");

    if (hasConfirmed) {
      try {
        await fetch(`/api/book/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = myPosts.filter((el) => el._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
      setIsLoading(false);
    };

    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      desc="Selamat datang di halaman profil pribadi Anda. Bagikan judul buku-buku bagus versi Anda kepada Dunia."
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      isLoading={isLoading}
    />
  );
}

export default MyProfile;
