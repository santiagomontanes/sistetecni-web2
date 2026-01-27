import { createBrowserClient } from "@/lib/supabase/client";

export async function checkIsAdmin(userId: string) {
  const supabase = createBrowserClient();
  const { data, error } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    return false;
  }

  return Boolean(data?.user_id);
}
