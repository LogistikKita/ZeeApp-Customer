// env.js
const SUPABASE_URL = "https://mrghlcedtafomwnznywf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yZ2hsY2VkdGFmb213bnpueXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzMTAwMTcsImV4cCI6MjA2NTg4NjAxN30.vCLC9w8sT0-4uMLFt9c-3BsFeLVco68ajtsu2ZQUiWs";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
