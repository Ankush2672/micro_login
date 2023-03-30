const controller = require('./controller');
const common_service = require('../../services/commonService');

module.exports = [
    {
        path: '/users/signup',
        method: 'post',
        config: {
            handler: controller.signup,
            cors: common_service.corsSettings,

        }
    },
    {
        path: '/users/login',
        method: 'post',
        config: {
            handler: controller.login,
            cors: common_service.corsSettings,

        }
    },
    {
        path: '/users/getuser',
        method: 'post',
        config: {
            handler: controller.getuser,
            cors: common_service.corsSettings,

        }
    }
]