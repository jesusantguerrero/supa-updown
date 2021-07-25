import { v4 as uuid } from "uuid";
import { supabaseState, useSupabase } from "./useSupabase";
const { supabase } = useSupabase();

export function useSiteApi() {    
    const add = async (site: object) => {
        const { data, error } = await supabase
        .from('sites')
        .insert([{
            user_uid: supabaseState.user.id, 
            ...parseSite(site),
            }
        ])

        if (error) throw error;
        return data;
    };

    const get = async (siteId: string) => {
        const { data, error } = await supabase.from('sites').select('*').eq('id', siteId);
        if (error) throw error;
        return data;
    }

    const update = async (siteId: string, site: object) => {
        const { data, error } = await supabase.from('sites').update(site, { returning: 'minimal' }).eq('id', siteId);
        if (error) throw error;
        return data;
    }

    const getAll = async () => {
        const { data, error } = await supabase.from('sites').select('*');
        if (error) throw error;
        return data?.map(siteToObject);
    }

    const remove = (siteId) => {
        const sites = getAll().filter(dbSite => dbSite.id !== siteId);
        localStorage.setItem('sites', JSON.stringify(sites));
    }

    return {
        add,
        get,
        update,
        getAll,
        remove
    };
}

function parseSite(site: object) {
    return {
        protocol: site.protocol,
        url: site.url,
        title: site.title,
        contains: site.contains,
        interval: site.interval,
        apdex: site.apdex,
        http_request: site.httpRequest,
        last_response: site.lastResponse,
        responses: site.responses || [],
    };
}

function siteToObject(site: object) {
    return {
        id: site.id,
        protocol: site.protocol,
        url: site.url,
        title: site.title,
        contains: site.contains,
        interval: site.interval,
        apdex: site.apdex,
        httpRequest: site.http_request,
        lastResponse: site.last_response,
        responses: site.responses || [],
    };
}