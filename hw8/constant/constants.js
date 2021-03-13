module.exports = {
    CURRENT_YEAR: new Date().getFullYear(),
    AUTHORIZATION: 'Authorization',
    USER_IS_CREATED: 'USER IS CREATED',
    CAR_IS_CREATED: 'CAR IS CREATED',
    USER_IS_DELETED: 'USER IS DELETED',
    CAR_IS_DELETED: 'CAR IS DELETED',
    UNKNOWN_FILE: 'UNKNOWN FILE',

    PHOTO_MAX_SIZE: 2 * 1024 * 1024, // 2MB
    FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
    VIDEO_MAX_SIZE: 15 * 1024 * 1024, // 15MB
    PHOTOS_MIMETYPES: [
        'image/gif',
        'image/jpeg',
        'image/pjpeg',
        'image/png',
        'image/tiff',
        'image/webp'
    ],
    DOCS_MIMETYPES: [
        'application/msword', // .doc/.dot
        'application/pdf', // .pdf
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .docx  2007
    ],
    VIDEOS_MIMETYPES: [
        'video/mpeg',
        'video/mp4',
    ]
};
