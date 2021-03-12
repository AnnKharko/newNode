const {
    ErrorHandler,
    errorCodesEnum,
    errorMessages
} = require('../error');
const {
    DOCS_MIMETYPES,
    FILE_MAX_SIZE,
    PHOTO_MAX_SIZE,
    PHOTOS_MIMETYPES,
    VIDEOS_MIMETYPES,
    VIDEO_MAX_SIZE
} = require('../constant/constants');

module.exports = {
    checkFile: (req, res, next) => {
        try {
            const { files } = req;

            console.log('______________________________');
            console.log(files);
            console.log('______________________________');

            const docs = [];
            const photos = [];
            const videos = [];

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { name, size, mimetype } = allFiles[i];

                if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (PHOTO_MAX_SIZE < size) {
                        throw new ErrorHandler(
                            errorCodesEnum.PAYLOAD_TOO_LARGE,
                            errorMessages.FILE_TOO_LARGE,
                            `file ${name} is too big`
                        );
                    }

                    photos.push(allFiles[i]);
                } else if (DOCS_MIMETYPES.includes(mimetype)) {
                    if (FILE_MAX_SIZE < size) {
                        throw new ErrorHandler(
                            errorCodesEnum.PAYLOAD_TOO_LARGE,
                            errorMessages.FILE_TOO_LARGE,
                            `file ${name} is too big`
                        );
                    }

                    docs.push(allFiles[i]);
                } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
                    if (VIDEO_MAX_SIZE < size) {
                        throw new ErrorHandler(errorCodesEnum.PAYLOAD_TOO_LARGE, errorMessages.FILE_TOO_LARGE);
                    }

                    videos.push(allFiles[i]);
                } else {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.NOT_VALID_FILE);
                }
            }

            req.docs = docs;
            req.photos = photos;
            req.videos = videos;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAvatar: (req, res, next) => {
        try {
            console.log(req.photos);
            if (req.photos.length > 1) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, errorMessages.ONLY_ONE_FILE_ALLOWED_UPLOAD);
            }

            [req.avatar] = req.photos;
            // req.avatar = req.photos[0];

            next();
        } catch (e) {
            next(e);
        }
    }
};
