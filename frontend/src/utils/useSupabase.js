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

    const getProfile = async () => {
        try {    
            let { data, error, status } = await supabase
            .from("profiles")
            .select(`username, website, avatar_url`)
            .eq("id", supabaseState.user.id)
            .single()
    
            if (error && status !== 406) throw error
    
            if (data) {
                return data;
            }
        } catch (error) {
            alert(error.message)
        }
    }

    
    const initSupabase = () => {
        supabase.auth.onAuthStateChange((_, session) => {
            supabaseState.user = session ? session.user : {};
            const user = session ? session.user : null;
            resolve(user);
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