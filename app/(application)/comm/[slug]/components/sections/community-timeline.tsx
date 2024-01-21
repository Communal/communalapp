"use client";
import { Post, PostInterface } from "@communalapp/app/(application)/components/sections/posts-feed";
import { supabase } from "@communalapp/config/supabase-client";
import { fetchCommunityPosts } from "@communalapp/scripts";
import { Stack } from "craftbook";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CommunityTimeline({ communityName }: { communityName: string }) {
  const [posts, setPosts] = useState<PostInterface[] & any[]>([]);
  const router = useRouter();

  console.log("community name in client side while rendering community posts", communityName);

  useEffect(() => {
    async function fetchPosts() {
      let response = await fetchCommunityPosts(communityName);
      setPosts(response);
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('realtime-posts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
        },
        (res) => {
          if (res.new.length) {
            res.new.map((newPost: any) => {
              setPosts((prevPosts) => [newPost, ...prevPosts]);
            })
          }
          router.refresh();
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router]);

  return (
    <Stack rowGap={0}>
      {posts.map((post, index) => {
        return (
          <Post
            key={index}
            content={post.content}
            username={post.username}
            community_name={post.community_name}
            id={post.id}
            profile_picture={post.profile_picture}
          />
        );
      })}
    </Stack>
  )
}