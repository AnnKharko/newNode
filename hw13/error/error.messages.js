module.exports = {
    // NOT FOUND
    NOT_EXIST_USER_WITH_SUCH_EMAIL: {
        customCode: 4041
    },
    NOT_EXIST_USER_WITH_SUCH_ID: {
        customCode: 4042
    },
    NOT_EXIST_CAR_WITH_SUCH_ID: {
        customCode: 4043
    },
    NOT_EXIST_CAR_WITH_SUCH_MODEL: {
        customCode: 4044
    },
    // BED REQUEST
    BED_REQUEST: {
        customCode: 4000
    },
    WRONG_EMAIL_OR_PASSWORD: {
        customCode: 4001
        // message: {
        //     en: 'Wrong email or password'
        // },
    },
    NOT_VALID_TOKEN: {
        customCode: 4002
    },
    NOT_VALID_REFRESH_TOKEN: {
        customCode: 4003
    },
    TOKEN_IS_REQUIRED: {
        customCode: 4004
    },
    REFRESH_TOKEN_IS_REQUIRED: {
        customCode: 4005
    },
    WRONG_MAIL_ACTION: {
        customCode: 4006
    },
    NOT_VALID_FILE: {
        customCode: 4007
    },
    // PAYLOAD_TOO_LARGE
    FILE_TOO_LARGE: {
        customCode: 4130,
        message: 'File too large'
    },
    //    NOT_ALLOWED
    ONLY_ONE_FILE_ALLOWED_UPLOAD: {
        customCode: 4051,
        message: 'Only one photo is  allowed to be upload'
    },
    // FORBIDDEN
    FORBIDDEN: {
        customCode: 4030,
        message: 'Access denied'
    }
};
