import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nuczqhpetehnwtxhgciy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51Y3pxaHBldGVobnd0eGhnY2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NDk1ODQsImV4cCI6MjA5MDQyNTU4NH0.4GT5iqPxPeVWTLnyOw0jOeAQPVELLLCCf6GN89o7TnY'

export const supabase = createClient(supabaseUrl, supabaseKey)