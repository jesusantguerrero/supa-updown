import axios from "axios";
import { useSiteApi } from "./src/utils/useApi";
const { getAll, update } = useSiteApi();

export default function runBackground() {
    getAll().then(sites => {
        sites.forEach(updateCall);
    });
}

const updateCall = (site) => {
    const siteURL = `${site.protocol}${site.url}`;
     axios.get(siteURL).then(response => {
        const responseToSave = {
            status: response.status,
            statusText: response.statusText,
        }
        const responses = [...site.responses, responseToSave];
        update(site.id, { last_response: responseToSave, responses }).catch(error => {
            console.log(error)
        });
    }).catch(error => {
        const responseToSave = {
            status: error?.response?.status || 500,
            statusText: error?.response?.statusText || "Cors",
        }
        const responses = [...site.responses, responseToSave];
        update(site.id, {last_response: responseToSave, responses }).catch(error => {
            console.log(error);
        });
    });
}