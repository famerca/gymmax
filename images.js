const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const { insertImage } = require('./db');

const dir_photos = path.join(path.join(__dirname, '..'), 'cliente/public/photos');

async function saveImage(data)
{
    const ext = getExtension(data);
    if(ext == "")
        return 0;

    data = data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(data, 'base64');

    const nombreImagen = uuidv4() + '.' + ext;

    try {
        fs.writeFileSync(`${dir_photos}/${nombreImagen}`, buffer);
        const res = await saveImageInDataBase(nombreImagen, ext);
        return res;
    } catch (error) {
        console.log(error);
        return 0;
    }
}

async function saveImageFile(data)
{
    const ext = getExtension(data);
    if(ext == "")
        return "";

    data = data.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(data, 'base64');

    const nombreImagen = uuidv4() + '.' + ext;

    try {
        fs.writeFileSync(`${dir_photos}/${nombreImagen}`, buffer);
        return nombreImagen;
    } catch (error) {
        console.log(error);
        return "";
    }
}


async function saveImageInDataBase(nombre, ext)
{
    const res = await insertImage(nombre, ext);

    if(res[0][0].id)
    {
        return res[0][0].id
    }else
    {
        return 0;
    }

}

function getExtension(data)
{
    const matches = data.match(/^data:([A-Za-z-+\/]+);base64,/);

    if (matches) 
    {
        const mimeType = matches[1];
        let extension = mimeType.split('/')[1];
        
        // Convierte algunas extensiones conocidas
        switch (extension) {
            case 'jpg':
                extension = 'jpg';
            break;
            case 'jpeg':
                extension = 'jpg';
            break;
            case 'svg+xml':
            extension = 'svg';
            break;
            case 'png':
            extension = 'png';
            break;
            default:
                extension = "";
                break;
            // Añade más casos si es necesario
        }

        return extension;
    }

    return "";
}

function esImagenBase64(str) {
    const regex = /^data:image\/[a-zA-Z]+;base64,([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
    return regex.test(str);
}

module.exports = {saveImage, esImagenBase64, saveImageFile};