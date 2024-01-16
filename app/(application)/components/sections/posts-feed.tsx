"use client";
import { createFeed } from "@communalapp/scripts";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Box, Stack } from "craftbook";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function PostsFeed() {
  const [posts, setPosts] = useState<any[]>([]);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      let response = await createFeed();
      setPosts(response);
    }
    fetchPosts();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('realtime-posts')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'posts'
      }, () => {
        router.refresh();
      }).subscribe();

    return () => {
      supabase.removeChannel(channel);
    }
  }, [supabase, router]);

  return (
    <Stack>
      {posts.map((post, index) => {
        return (
          <Post
            key={index}
            {...post}
          />
        )
      })}
    </Stack>
  )
}

export function Post({ content, username, community_name, profile_picture, id }: any) {
  return (
    <Box
      className="p-6 border-b"
    >
      {"working" + content}
    </Box>
  )
}