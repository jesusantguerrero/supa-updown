const supabaseURL = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const defaultConfig = {
    supabaseUrl: typeof supabaseURL === 'string' ? supabaseURL : '',
    supabaseAnonKey: typeof supabaseAnonKey === 'string' ? supabaseAnonKey : '',
}