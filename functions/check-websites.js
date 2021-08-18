const { runBackground } = require('./utils');

exports.handler = async (event) => {
    await runBackground();

    return {
        statusCode: 200,
        body: "OK"
    }
}