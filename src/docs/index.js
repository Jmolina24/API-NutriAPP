const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components')


module.exports = {
    ...basicInfo,
    ...servers,
    ...components
};