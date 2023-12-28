"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Profile from "@components/Profile";

function PrompterProfile({ params }) {
  const searchParams = useSearchParams();
  const prompterName = searchParams.get("name");

  const [prompterPosts, setPrompterPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`);
      const data = await response.json();

      setPrompterPosts(data);
      setIsLoading(false);
    };

    if (params?.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={prompterName}
      desc={`Welcome to ${prompterName}'s personalized profile page. Explore ${prompterName}'s exceptional prompts and be inspired by the power of their imagination`}
      data={prompterPosts}
      isLoading={isLoading}
    />
  );
}

export default PrompterProfile;
