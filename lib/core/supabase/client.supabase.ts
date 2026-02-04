import { createClient } from '@supabase/supabase-js';
import { storageAdapter } from '../storage/storage.adapter';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://sciqutnrtleysumeplno.supabase.co';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjaXF1dG5ydGxleXN1bWVwbG5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxNDExNTcsImV4cCI6MjA4NTcxNzE1N30.AP_VByQR0QttMfbDDT-UbBZtlqF6BkOyboAcA8DJKo0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: storageAdapter, // ¡Magia! ✨ Funciona en Web y App
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});