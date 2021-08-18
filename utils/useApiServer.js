const { useSupabase } = require('./useSupabase');
const { supabase } = useSupabase();

exports.useSiteApi = () => {    
    const update = async (siteId, site) => {
        const { data, error } = await supabase.from('sites').update(site, { returning: 'minimal' }).eq('id', siteId);
        if (error) throw error;
        return data;
    }

    const getAll = async () => {
        const { data, error } = await supabase.from('sites').select('*').lt('next_check_date', new Date().toISOString()).order('next_check_date', 'asc').limit(100)
        if (error) throw error;
        return data.map(siteToObject);
    }

    return {
        update,
        getAll,
    };
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