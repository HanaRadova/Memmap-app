const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

function saveBase64Image(base64String) {
    const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    const type = matches[1].split('/')[1];
    const buffer = Buffer.from(matches[2], 'base64');
    const filename = `${uuidv4()}.${type}`;
    const filePath = path.join('./images', filename);

    fs.writeFileSync(filePath, buffer, (err) => {
        if (err) {
            throw err;
        }
        console.log('Image saved successfully!');
    });

    return filePath
}

module.exports = saveBase64Image