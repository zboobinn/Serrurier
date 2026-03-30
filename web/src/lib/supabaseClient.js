import { createClient } from '@supabase/supabase-js'

// 🟢 On récupère les clés depuis les variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Les variables d'environnement Supabase sont manquantes !");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)