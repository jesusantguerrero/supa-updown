const { useSupabase } = require("../framework/lumiere/useSupabase")
const { defaultConfig } = require("../config");
const { useNotification } = require("./useNotifications")

const provider = useSupabase(defaultConfig);

module.exports.Provider = () => {
    return {
        notification: useNotification(provider.notifications),
        email: {},
        db: provider.db,
        storage: provider.storage
    }
}