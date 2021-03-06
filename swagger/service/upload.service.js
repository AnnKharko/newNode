// ще не перероблено для MySQL
const fs = require('fs/promises');
const db = require('../dataBase/MySQL').getInstance();
const { constants } = require('../constant');
const { fileDirBuilder, carFileDirBuilder } = require('../helpers');
// const { User, Car } = require('../dataBase/models');

const userUploadDirBuilder = async (uploadFile, itemId, uploadType) => {
    const { filePath, fileDir, uploadPath } = fileDirBuilder(uploadFile.name, uploadType, itemId);

    await fs.mkdir(fileDir, { recursive: true });

    await uploadFile.mv(filePath);
    const User = db.getModel('User');

    switch (uploadType) {
        case 'photo':
            // await User.updateOne({ _id: itemId }, { $set: { avatar: uploadPath } });
            await User.update({ avatar: uploadPath }, { where: { id: itemId } });
            break;
        case 'doc':
            // await User.updateOne({ _id: itemId }, { $set: { doc: uploadPath } });
            await User.update({ doc: uploadPath }, { where: { id: itemId } });
            break;
        case 'video':
            // await User.updateOne({ _id: itemId }, { $set: { video: uploadPath } });
            await User.update({ video: uploadPath }, { where: { id: itemId } });
            break;
        default:
            console.log(constants.UNKNOWN_FILE);
    }
};
const carUploadDirBuilder = async (uploadFile, itemId, uploadType) => {
    const Car = db.getModel('Car');
    const { filePath, fileDir, uploadPath } = carFileDirBuilder(uploadFile.name, uploadType, itemId);

    await fs.mkdir(fileDir, { recursive: true });

    await uploadFile.mv(filePath);

    switch (uploadType) {
        case 'photo':
            // await Car.findOneAndUpdate({ _id: itemId }, { $push: { photos: uploadPath } }, { upsert: true });
            break;
        case 'doc':
            await Car.findOneAndUpdate({ _id: itemId }, { $push: { docs: uploadPath } }, { upsert: true });
            break;
        case 'video':
            await Car.findOneAndUpdate({ _id: itemId }, { $push: { videos: uploadPath } }, { upsert: true });
            break;
        default:
            console.log(constants.UNKNOWN_FILE);
    }
};

module.exports = { carUploadDirBuilder, userUploadDirBuilder };
