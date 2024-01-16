"use server";
import { fetchUserCommunities } from ".";

export async function checkIfUserHasCommunities() {
  return Boolean((await fetchUserCommunities()).length);
}