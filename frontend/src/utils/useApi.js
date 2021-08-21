import { supabaseState, useSupabase } from "./useSupabase";
const { supabase } = useSupabase();

export async function addRows(tableName, rows) {
    const { data, error } = await supabase
    .from(tableName)
    .insert(rows.map(row => ({
        ...row,
        user_uid: supabaseState.user.id, 

    })));

    if (error) throw error;
    return data;
} 
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
        const { data, error } = await supabase.from('sites').select('*')
        .eq('user_uid', supabaseState.user.id)
        .eq('id', siteId);
        if (error) throw error;
        return data;
    }

    const update = async (siteId, site) => {
        const { data, error } = await supabase.from('sites').update(site, { returning: 'minimal' }).eq('id', siteId);
        if (error) throw error;
        return data;
    }

    const getAll = async () => {
        const { data, error } = await supabase.from('sites')
        .select('*')
        .eq('user_uid', supabaseState.user.id);
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
        `)
        .eq('id', pageId)
        .limit(1);
        if (error) throw error;
        return data && data[0];
    }

    const getAll = async (pageId) => {
        const { data, error } = await supabase.from('pages')
        .select(`*,
            page_sites (
                id
            )
        `)
        .eq('user_uid', supabaseState.user.id)
        if (error) throw error;
        return data;
    }

    const add = async (page) => {
        const pageSites = [...page.sites];
        delete page.sites;

        const savedPage = await addRows('pages', [page])
        const savedSites = await addRows('page_sites', pageSites.map(site => ({
            page_id: savedPage[0].id,
            site_id: site.id,
            name: site.alias || site.url,
        })));
        savedPage[0].sites = savedSites;
        return savedPage;
    };

    const remove = async (pageId) => {
        await supabase.from('page_sites').delete().eq('page_id', pageId);
        return await supabase.from('pages').delete().eq('id', pageId);
    }

    const getSites = async (pageId) => {
        const { data, error } = await supabase.from('page_sites')
        .select(`*,
            sites (
                *
            )
        `)
        .eq('page_id', pageId);
        if (error) throw error;
        return data.map(pageSites => siteToObject(pageSites.sites));
    }

    return {
        add,
        get,
        remove,
        getAll,
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