const supabaseURL = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
exports.defaultConfig = {
    supabaseUrl: typeof supabaseURL === 'string' ? supabaseURL : '',
    supabaseAnonKey: typeof supabaseAnonKey === 'string' ? supabaseAnonKey : '',
}