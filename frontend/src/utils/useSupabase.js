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

    const logout = async () => {
        const { data, error } = await supabase.auth.signOut();
        if (error) {
            throw new Error(error);
        }
        
        supabaseState.user = {};
        return data;
    }

    const getProfile = async () => {  
        const { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", supabaseState.user.id)
        .single()

        if (error && status !== 406) throw error
        if (data) {
            return data;
        }
    }

    
    const initSupabase = (authenticatedCallback) => {
        supabase.auth.onAuthStateChange((_, session) => {
            supabaseState.user = session ? session.user : {};
            authenticatedCallback && authenticatedCallback(session)
        });
    };

    const isAuthenticated = () => {
        return supabaseState.user.id ? true : false;
    }

    return {
        supabase,
        getProfile,
        logout,
        initSupabase,
        isAuthenticated,
    }
}