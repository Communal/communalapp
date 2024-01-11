import { supabase } from "@communalapp/config/supabase-client";

export async function fetchAllCategories() : Promise<string[]> {
  let { data: categories, error } = await supabase
    .from('communities')
    .select('category');
  
  let response: string[] = [];
  if (categories || !error) {
    categories?.map((category) => {
      response.push(category.category as string);
    });
    response = [...response.filter((item) => item !== null && item !== undefined)];
    return [...new Set(response)];
  }

  return response;
}