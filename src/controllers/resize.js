// const isBase64 = require('is-base64');
const sharp = require('sharp');

function isBase64(str) {
  var notBase64 = /[^A-Z0-9+\/=]/i;
  const isString = (typeof str === 'string' || str instanceof String);

  if (!isString) {
    let invalidType;
    if (str === null) {
      invalidType = 'null';
    } else {
      invalidType = typeof str;
      if (invalidType === 'object' && str.constructor && str.constructor.hasOwnProperty('name')) {
        invalidType = str.constructor.name;
      } else {
        invalidType = `a ${invalidType}`;
      }
    }
    throw new TypeError(`Expected string but received ${invalidType}.`);
  }

  const len = str.length;
  if (!len || len % 4 !== 0 || notBase64.test(str)) {
    return false;
  }
  const firstPaddingChar = str.indexOf('=');
  return firstPaddingChar === -1 ||
    firstPaddingChar === len - 1 ||
    (firstPaddingChar === len - 2 && str[len - 1] === '=');

}

async function compressImage(input) {
  const image = new Buffer.from(input, 'base64');
  const buffer = await sharp(image)
    .resize({
      fit: sharp.fit.contain,
      width: 600
    })
    .toFormat('jpg')
    .toBuffer();
  const resizedImageData = buffer.toString('base64');
  const output = `data:image/jpg;base64,${resizedImageData}`;

  return output;
}

exports.post = async (req, res, next) => {
  let image;

  try {
    image = req.body.image;
  } catch (error) {
    console.log(error);
    res.status(400).send({
      type: 'Error',
      message: 'No image provided.'
    });

    return;
  }
  
  if (image.split(',')[1] != undefined) {
    image = image.split(',')[1];
  }
  
  if (!isBase64(image)) {
    res.status(400).send({
      type: 'Error',
      message: 'Verify the image and try again.'
    });

    return;
  }

  const compressedImage = await compressImage(image);

  res.status(201).send({
    output: {
      image: compressedImage.toString(),
    }
  });
}