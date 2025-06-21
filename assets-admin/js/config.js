// config.js
// Koneksi ke Supabase versi lengkap dan rapi

import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Ganti dengan project kamu (kalau beda)
const SUPABASE_URL = "https://mrghlcedtafomwnznywf.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // (pastikan ini adalah public anon key)

// Nama tabel utama
const TABLE_NAME = "Data_Barang";

// Inisialisasi Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Export Supabase client dan tabel
export { supabase, TABLE_NAME };
