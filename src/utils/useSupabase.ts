import { createClient } from "@supabase/supabase-js";
import { reactive } from "vue";
import { defaultConfig } from "../config";

export const supabaseState = reactive({
    user: {}
})

export function useSupabase() {
    const supabaseUrl = defaultConfig.supabaseUrl
    const supabaseAnonKey = defaultConfig.supabaseAnonKey;

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const logout = () => {
        supabase.auth.signOut();
    }


    return {
    supabase,
    logout,
    }
}