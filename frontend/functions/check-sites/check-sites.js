// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const { runBackground } = require('../../../utils/runBackground');
const handler = async () => {
    await runBackground();
    return {
        statusCode: 200,
        body: "OK"
    }
}
module.exports = { handler }
