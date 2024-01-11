"use server";

import { currentUser } from "@clerk/nextjs";
import { supabase } from "@communalapp/config/supabase-client";

export async function checkIfUserHasCommunities() {
  const user = await currentUser();
  let { data: communities, error } = await supabase
    .from('users')
    .select('communities')
    .eq('username', user?.username);
  
  return Boolean(communities?.length);
}