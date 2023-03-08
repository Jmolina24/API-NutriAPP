import sharp from 'sharp';

const helperImg = (filePath, filename, size = 300) => {
    return sharp(filePath)
    .resize(size)
    .toFile(`./uploads/optimize/${filename}`)
};


module.exports = { helperImg }