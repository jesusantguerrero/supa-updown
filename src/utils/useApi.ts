import { v4 as uuid } from "uuid";

export function useSiteApi() {    
    const add = (site: object) => {
        site.id = uuid();
        const sites = getAll();
        sites.push(site);
        localStorage.setItem('sites', JSON.stringify(sites));
        return new Promise(resolve => resolve(site));
    };

    const get = (siteId: string) => {
        const sites = getAll();
        return sites.filter(dbSite => dbSite.id === siteId)[0];
    }

    const getAll = () => {
        const sites = localStorage.getItem('sites');
        return JSON.parse(sites) || [];
    }

    const remove = (siteId) => {
        const sites = getAll().filter(dbSite => dbSite.id !== siteId);
        localStorage.setItem('sites', JSON.stringify(sites));
    }

    return {
        add,
        get,
        getAll,
        remove
    };
}