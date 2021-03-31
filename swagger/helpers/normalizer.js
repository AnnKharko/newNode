module.exports = (object) => {
    const hiddenFields = [
        'password',
        'access_token',
        'refresh_token'
    ];

    // console.log(object.dataValues);
    hiddenFields.forEach((field) => {
        for (let i = 0; i < object.length; i++) {
            delete object[i].dataValues[field];
            console.log('++++++++++++++++');
            console.log(object[i].dataValues);
            console.log('++++++++++++++++');
        }
    });
    return object;
};
