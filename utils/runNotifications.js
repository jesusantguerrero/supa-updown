const { useNotificationApi } = require("./useApiServer");
const { getAll: getNotifications, update: updateNotifications } = useNotificationApi();
const { useMail } = require("./useMail");
const EMAIL_SIZE = 3;

exports.runNotifications = () => {
    getNotifications(EMAIL_SIZE).then(notifications => {
        notifications.forEach( notification => workers[notification.channel](notification));
    }).catch(error => {
        console.log(error)
    });
}

const workers = {
    email: emailWorker
}

//  send emails
const { send } = useMail();
async function emailWorker (notification) {
    console.log(notification);
    send(notification.handlers.join(','), notification.subject, notification.message);
    updateNotifications(notification.id, { status: "sent" });
}

// maybe a slack, zen, telegram or another channel 
