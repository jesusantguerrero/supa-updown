const { useSupabase } = require('./useSupabase');
const { supabase } = useSupabase();

exports.useSiteApi = () => {    
    const update = async (siteId, site) => {
        const { data, error } = await supabase.from('sites').update(site, { returning: 'minimal' }).eq('id', siteId);
        if (error) throw error;
        return data;
    }

    const getAll = async () => {
        const { data, error } = await supabase.from('sites').select('*').order('next_check_date', 'asc').limit(100)
        if (error) throw error;
        return data.map(siteToObject);
    }

    return {
        update,
        getAll,
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
    };
}

exports.useNotificationApi = () => {
    const update = async (notificationId, notification) => {
        const { data, error } = await supabase.from('notifications').update(notification, { returning: 'minimal' }).eq('id', notificationId);
        if (error) throw error;
        return data;
    }

    const getAll = async (limit = 100, status = 'scheduled') => {
        const {data, error} = await supabase.from('notifications').select('*').eq('status', status).limit(limit);
        if (error) throw error;
        return data;
    }

    const add = async (notifications) => {
        return await supabase.from('notifications').insert(notifications);
    } 

    return {
        add,
        update,
        getAll,
    };
}