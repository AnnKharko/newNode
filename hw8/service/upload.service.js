const fs = require('fs/promises');
const { fileDirBuilder, carFileDirBuilder } = require('../helpers');
const { User, Car } = require('../dataBase/models');

const photoDirBuildCar = async (avatar, itemId) => {
    const { filePath, fileDir, uploadPath } = carFileDirBuilder(avatar.name, 'photo', itemId);

    await fs.mkdir(fileDir, { recursive: true });
    await avatar.mv(filePath);

    // await Car.updateOne({ _id: itemId }, { $set: { photos: uploadPath } });
    // await Car.updateOne({ _id: itemId }, { $push: { photos: uploadPath } });
    await Car.findOneAndUpdate({ _id: itemId }, { $push: { photos: { uploadPath } } });
};

const photoDirBuild = async (avatar, itemId) => {
    const { filePath, fileDir, uploadPath } = fileDirBuilder(avatar.name, 'photo', itemId);

    await fs.mkdir(fileDir, { recursive: true });
    await avatar.mv(filePath);

    await User.updateOne({ _id: itemId }, { $set: { avatar: uploadPath } });
};
const docDirBuild = async (doc, itemId) => {
    const { filePath, fileDir, uploadPath } = fileDirBuilder(doc.name, 'docs', itemId);

    await fs.mkdir(fileDir, { recursive: true });
    await doc.mv(filePath);

    await User.updateOne({ _id: itemId }, { $set: { doc: uploadPath } });
};
const docDirBuildCar = async (doc, itemId) => {
    const { filePath, fileDir, uploadPath } = fileDirBuilder(doc.name, 'docs', itemId);

    await fs.mkdir(fileDir, { recursive: true });
    await doc.mv(filePath);

    await Car.updateOne({ _id: itemId }, { $set: { doc: uploadPath } });
};
const videoDirBuild = async (video, itemId) => {
    const { filePath, fileDir, uploadPath } = fileDirBuilder(video.name, 'docs', itemId);

    await fs.mkdir(fileDir, { recursive: true });
    await video.mv(filePath);

    await User.updateOne({ _id: itemId }, { $set: { doc: uploadPath } });
};
// const uploadDirBuilder = async (uploadFile, itemId, uploadType) => {
//     const { filePath, fileDir, uploadPath } = fileDirBuilder(uploadFile.name, uploadType, itemId);
//
//     await fs.mkdir(fileDir, { recursive: true });
//
//     await uploadFile.mv(filePath);
//
//     if (uploadFile === 'avatar') {
//         await User.updateOne({ _id: itemId }, { $set: { avatar: uploadPath } });
//     }
// };
// чомусь у базі даних не створюється поле аватар, але у папці static/user. створюється

module.exports = {
    docDirBuild, photoDirBuild, videoDirBuild, photoDirBuildCar, docDirBuildCar
};
