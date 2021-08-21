const axios = require("axios");
const { useSiteApi, useNotificationApi } = require("./useApiServer");
const { getAll, update } = useSiteApi();
const { add: addNotifications } = useNotificationApi();
const { differenceInSeconds, addMinutes, format } = require('date-fns');
const { useMail } = require("./useMail");
const { defaultConfig } = require("../config");
const SLICE_SIZE = 30;

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
    const mails = []
    await axios.get(siteURL).then(response => {
        const timeDiff = getTimeDiff(startTime);
        responseToSave = {
            date: format(startTime, 'yyyy-MM-dd'),
            status: response.status,
            statusText: response.statusText,
            responseSeconds: timeDiff,
            calls: 1,
            success: Number(response.status == 200),
            fails: Number(response.status != 200),
        }
    }).catch(error => {
        const timeDiff = getTimeDiff(startTime);
        mails.push({
            handlers: site.listeners,
            subject: `SUPA UP: ${site.protocol}${site.url} is down!`,
            message: `The site ${siteURL} is down. It took ${timeDiff} seconds to respond.`,
            channel: 'email'
        })
        responseToSave = {
            date: format(startTime, 'yyyy-MM-dd'),
            status: error.status || 500,
            statusText: error.statusText || "Cors",
            responseSeconds: timeDiff,
            calls: 1,
            success: Number(error.status == 200),
            fails: Number(error.status != 200),
        }
    });
    
    const formData = prepareResponse(site.responses, responseToSave, nextCheckDate);
    await update(site.id,  formData).catch(error => {
        console.log(error)
    });
    if (defaultConfig.forceEmails) {
        const { send } = useMail();
        mails.forEach(mail => send(mail.email, mail.subject, mail.message));
    } else {
        const { error } = await addNotifications(mails);
        console.log(error);
    }
}

function prepareResponse(statusResponses, newResponse, nextCheckDate) {
    const responseIndex = statusResponses.findIndex( response => response.date == newResponse.date)
    let responses = []
    if (responseIndex !== -1) {
        const saved = statusResponses[responseIndex]; ;
        statusResponses[responseIndex] = {
            ...saved,
            calls: Number(saved.calls || 0) + 1,
            success: Number(saved.success || 0) + Number(newResponse.success || 0),
            fails: Number(saved.fails || 0) + Number(newResponse.fails || 0),
        };
        responses = statusResponses.slice(-SLICE_SIZE);
    } else {
        responses = [...statusResponses, newResponse].slice(-SLICE_SIZE);
    }
    const formData = { last_response: newResponse, responses, next_check_date: nextCheckDate }
    return formData;
}

function getTimeDiff(startTime) {
    const endTime = new Date();
    const timeDiff = differenceInSeconds(startTime, endTime);
    return timeDiff;
}