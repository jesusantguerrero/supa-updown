const supabaseURL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

exports.defaultConfig = {
    supabaseUrl: supabaseURL || '',
    supabaseAnonKey: supabaseAnonKey || '',
    mailHost: process.env.MAIL_HOST || "",
    mailPort: process.env.MAIL_PORT || "",
    mailUser: process.env.MAIL_USER || false,
    mailPass: process.env.MAIL_PASS || "",
    mailSecure: process.env.MAIL_SECURE || false,
    mailFrom: process.env.MAIL_FROM || "me@example.com",
}