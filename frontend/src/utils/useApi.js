import { supabaseState, useSupabase } from "./useSupabase";
const { supabase } = useSupabase();

export function useSiteApi() {    
    const add = async (site) => {
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

    const get = async (siteId) => {
        const { data, error } = await supabase.from('sites').select('*').eq('id', siteId);
        if (error) throw error;
        return data;
    }

    const update = async (siteId, site) => {
        const { data, error } = await supabase.from('sites').update(site, { returning: 'minimal' }).eq('id', siteId);
        if (error) throw error;
        return data;
    }

    const getAll = async () => {
        const { data, error } = await supabase.from('sites').select('*');
        if (error) throw error;
        return data?.map(siteToObject);
    }

    const remove = async (siteId) => {
        const sites = (await getAll()).filter(dbSite => dbSite.id !== siteId);
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

export function usePageApi() {
    const get = async (pageId) => {
        const { data, error } = await supabase.from('pages')
        .select(`*,
            page_sites (
                id
            )
        `).eq('id', pageId).limit(1);
        if (error) throw error;
        return data && data[0];
    }

    const getSites = async (pageId) => {
        const { data, error } = await supabase.from('page_sites')
        .select(`*,
            sites (
                *
            )
        `).eq('page_id', pageId);
        if (error) throw error;
        return data.map(pageSites => siteToObject(pageSites.sites));
    }

    return {
        get,
        getSites,
    }
}
 
function parseSite(site) {
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

function siteToObject(site) {
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