const { emailActionsEnum } = require('../constant');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome on the board'
    },
    [emailActionsEnum.USER_DELETED]: {
        templateName: 'user-deleted',
        subject: 'User was deleted'
    }
};
