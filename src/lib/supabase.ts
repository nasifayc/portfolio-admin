import { createBrowserClient } from "@supabase/ssr";

export function createSupabaseClient() {
  console.log("Supabse Url", process.env.NEXT_PUBLIC_SUPABASE_URL!);
  console.log("Supabse Anon Key ", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
