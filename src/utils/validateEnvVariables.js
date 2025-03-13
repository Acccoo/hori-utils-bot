const { ENV_VARS } = require('environment');

module.exports = (client) => {
    let anyVarMissing = false;

    Object.keys(ENV_VARS).forEach(key => {
        if (!ENV_VARS[key] || ENV_VARS[key] === undefined) {
            console.error(`Missing environment variable ${key} in .env file`);
            anyVarMissing = true;
        }
    });

    if (anyVarMissing) {
        throw new Error('Cannot start server with a missing environment variable');
    } else {
        client.login(ENV_VARS.TOKEN);
    }
}