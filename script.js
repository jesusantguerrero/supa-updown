const axios = require("axios");
const { useSiteApi } = require("./utils/useApiServer");
const { getAll, update } = useSiteApi();
const { differenceInSeconds, addMinutes } = require('date-fns')

exports.runBackground = () => {
    getAll().then(sites => {
        sites.forEach(updateCall);
    }).catch(error => {
        console.log(error)
    });
}

const updateCall = async (site) => {
    const siteURL = `${site.protocol}${site.url}`;
    const startTime = new Date();
    const nextCheckDate = addMinutes(startTime, site.interval || 5);
    let responseToSave = {};
    await axios.get(siteURL).then(response => {
        const timeDiff = getTimeDiff(startTime);
        responseToSave = {
            status: response.status,
            statusText: response.statusText,
            tesponseSeconds: timeDiff,
        }
    }).catch(error => {
        const timeDiff = getTimeDiff(startTime);
        responseToSave = {
            status: error.response.status || 500,
            statusText: error.response.statusText || "Cors",
            responseSeconds: timeDiff,
        }
    });
    const responses = [...site.responses, responseToSave].slice(0, 24);
    const formData = { last_response: responseToSave, responses, next_check_date: nextCheckDate }
    await update(site.id,  formData).catch(error => {
        console.log(error)
    });
    console.log("ran", formData);
}

function getTimeDiff(startTime) {
    const endTime = new Date();
    const timeDiff = differenceInSeconds(startTime, endTime);
    return timeDiff;
}