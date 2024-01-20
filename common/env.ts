export const EnvironmentVariable = {
  Supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    anon: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
    storage: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL as string,
  },
  Resend: {
    apiKey: process.env.NEXT_PUBLIC_RESEND_API_KEY as string,
  },
};
