import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://cerqqyruawwpxutetviu.supabase.co';
const supabase = createClient(supabaseUrl, import.meta.env.VITE_SUPABASE_KEY);

export default supabase;
