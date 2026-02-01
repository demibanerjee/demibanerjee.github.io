import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

const getClient = () => createClient(
  Deno.env.get("SUPABASE_URL") ?? "",
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
);

let cachedOwnerId: string | null = null;

const getOwnerId = async () => {
  if (cachedOwnerId) return cachedOwnerId;
  
  const supabase = getClient();
  // Try to list users to find an existing one
  const { data: { users }, error } = await supabase.auth.admin.listUsers();
  
  if (users && users.length > 0) {
    cachedOwnerId = users[0].id;
    return cachedOwnerId;
  }
  
  // If no users exist, create a system admin user
  // This ensures we have a valid ID for the 'owner_id' column
  try {
    const { data, error: createError } = await supabase.auth.admin.createUser({
      email: 'system_admin@optics-phd.com',
      password: crypto.randomUUID(), // Random password as we won't log in with it manually
      email_confirm: true,
      user_metadata: { name: 'System Admin' }
    });
    
    if (data.user) {
      cachedOwnerId = data.user.id;
      return cachedOwnerId;
    }
  } catch (err) {
    console.error("Failed to create system user:", err);
  }
  
  // Fallback: This might fail if owner_id has a foreign key constraint to auth.users
  // but it's better than null if it's just a UUID field.
  return "00000000-0000-0000-0000-000000000000";
};

// Set stores a key-value pair in the database with owner_id
export const set = async (key: string, value: any): Promise<void> => {
  const supabase = getClient();
  const owner_id = await getOwnerId();
  
  const { error } = await supabase.from("kv_store_96b5a187").upsert({
    key,
    value,
    owner_id
  });
  
  if (error) {
    throw new Error(error.message);
  }
};

// Get retrieves a key-value pair from the database.
export const get = async (key: string): Promise<any> => {
  const supabase = getClient();
  const { data, error } = await supabase.from("kv_store_96b5a187").select("value").eq("key", key).maybeSingle();
  if (error) {
    throw new Error(error.message);
  }
  return data?.value;
};

// Search for key-value pairs by prefix.
export const getByPrefix = async (prefix: string): Promise<any[]> => {
  const supabase = getClient();
  const { data, error } = await supabase.from("kv_store_96b5a187").select("key, value").like("key", prefix + "%");
  if (error) {
    throw new Error(error.message);
  }
  return data?.map((d) => d.value) ?? [];
};
