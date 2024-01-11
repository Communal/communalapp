
export const EnvironmentVariable = {
  Supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  }
}