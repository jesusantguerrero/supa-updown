import { AuthState } from "@lumiere"

export async function addRows(tableName, rows) {
    const supabase = AuthState.provider.supabase
    const { data, error } = await supabase
    .from(tableName)
    .insert(rows.map(row => ({
        ...row,
        user_uid: AuthState.user.id, 
        
    })));
    
    if (error) throw error;
    return data;
}

export async function updateRow(tableName, row) {
    const supabase = AuthState.provider.supabase
    const { data, error } = await supabase
    .from(tableName)
    .update(row, { returning: "representation" })
    .eq("id", row.id)
    
    if (error) throw error;
    return data;
} 

export function useSiteApi() {    
    const supabase = AuthState.provider.supabase
    const add = async (site) => {
        const { data, error } = await supabase
        .from('sites')
        .insert([{
            ...parseSite(site),
            user_uid: AuthState.user.id, 
            }
        ])

        if (error) throw error;
        return data;
    };

    const get = async (siteId) => {
        const { data, error } = await supabase.from('sites').select('*')
        .eq('user_uid', AuthState.user.id)
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
        .eq('user_uid', AuthState.user.id);
        if (error) throw error;
        return data?.map(siteToObject);
    }

    const remove = async (siteId) => {
        const isSiteUsed = (await supabase.from('page_sites').select('*', { count: 'exact' }).eq('site_id', siteId)).count > 0;
        if (isSiteUsed) {
            return { error: new Error('The site is used in an status page') };
        } else {
            return await supabase.from('sites').delete().eq('id', siteId);        
        }
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
    const supabase = AuthState.provider.supabase
    const get = async (pageId) => {
        const { data, error } = await supabase.from('pages')
        .select(`*,
            page_sites (
                id,
                site_id
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
                id,
                sites (
                    id,
                    title,
                    url,
                    protocol,
                    status,
                    user_uid
                )
            )
        `)
        .eq('user_uid', AuthState.user.id)
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

    const update = async (page) => {
        const pageSites = [...page.sites];
        delete page.sites;

        await supabase.from('page_sites').delete().eq('page_id', page.id);
        const savedPage = await updateRow('pages', page)
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

    const getIncidents = async (pageId) => {
        const { data, error } = await supabase.from('incidents')
        .select(`*`)
        .eq('page_id', pageId)
        .is('incident_id', null);
        if (error) throw error;
        return data;
    }

    return {
        add,
        get,
        update,
        remove,
        getAll,
        getSites,
        getIncidents,
    }
}

export function useIncidentApi() {
    const supabase = AuthState.provider.supabase
    const add = async (incident) => {
        const savedIncident = await addRows('incidents', [{
            incident_id: incident.incident_id,
            page_id: incident.page_id,
            title: incident.title,
            description: incident.description,
            status: incident.status,
            sites: incident.sites.map(site => site.id),
            notify_listeners: incident.notify_listeners,
            log: incident.sites,
            user_uid: AuthState.user.id,
        }])

        if (incident.sites.length > 0) {
            for (const site of incident.sites) {
                await updateRow('sites', {
                    id: site.id,
                    status: site.status,
                    user_uid: site.user_uid,
                });
            }
        }

        if (incident.incident_id) {
            updateRow('incidents', {
                id: incident.incident_id,
                status: incident.status,
                user_uid: incident.user_uid,
            });
        }
  
        return savedIncident[0];
    };

    const get = async (id) => {
        const { data, error } = await supabase.from('incidents')
        .select(`*`)
        .eq('id', id)
        .is('incident_id', null)

        if (error) throw error;
        return data[0];
    }

    const getUpdates = async (parentId) => {
        const { data, error } = await supabase.from('incidents')
        .select(`*`)
        .eq('incident_id', parentId)

        if (error) throw error;
        return data;
    }

    const getAll = async (status) => {
        const { data, error } = await supabase.from('incidents')
        .select(`*`)
        .eq('user_uid', AuthState.user.id)
        .is('incident_id', null)
        .neq('status', 'resolved');

        if (error) throw error;
        return data;
    }

    return {
        add,
        get,
        getUpdates,
        getAll,
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
        listeners: site.listeners || [],
        user_uid: site.user_uid,
        status: site.status,
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
        listeners: site.listeners || [],
        user_uid: site.user_uid,
        status: site.status
    };
}