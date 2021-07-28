const axios = require("axios");
const { useSiteApi } = require("./utils/useApiServer");
const { getAll, update } = useSiteApi();

exports.runBackground = () => {
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
        console.log(response)
    }).catch(error => {
        const responseToSave = {
            status: error.response.status || 500,
            statusText: error.response.statusText || "Cors",
        }
        const responses = [...site.responses, responseToSave];
        update(site.id, {last_response: responseToSave, responses }).catch(error => {
            console.log(error);
        });
    });
}