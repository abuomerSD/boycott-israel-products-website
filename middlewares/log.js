const chalk = require('chalk');

const reqLogger = (req, res, next) => {
    console.log(`${chalk.red(req.method)} ${chalk.green(req.url)}`); 
}

module.exports = {reqLogger};