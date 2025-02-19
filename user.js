const { MD5 } = require("./auth");
const { insertUsuario, crearSuscripcion, deleteUsuario, updateUsuario, updateUserPhoto } = require("./db");
const { saveImage, esImagenBase64, saveImageFile } = require("./images");

async function registrarUsurio(data)
{
    const res = {
            status : 400, 
            json: {}
        };

    if(
        data.apellido == "" 
        || data.nombre == "" 
        || data.image == "" 
        || data.correo == ""
        || data.cedula == ""
        || data.membresia == 0
    )
    {
        res.json = {message : "Debe rellenar todos los campos"} ;
        return res;
    }

    const id_image = await saveImage(data.image);
    const temp_pass = genPassRand();


    const res_user = await insertUsuario(id_image, data.cedula, data.nombre, data.apellido, data.correo, MD5(temp_pass));
    console.log(res_user);
    if(res_user.code)
    {
        if(res_user.code == 'ER_DUP_ENTRY')
        {
            res.json = {message : "Cedula repetida"};
        }
        //console.log(response.code);

        return res;
    }
    
    if(res_user[1].affectedRows > 0)
    {
        const id_user = res_user[0][0].id;
        const res_mem = await crearSuscripcion(id_user, data.membresia);
        console.log(res_mem);
        if(res_mem.code)
        {
            if(res_mem.code == 'ER_DUP_ENTRY')
            {
                res.json = {message : "Error al crear a suscripcion"};
            }
            //console.log(response.code);
    
            return res;
        }

        res.status = 200;
        res.json = {temp_pass}

        return res;
    }

    return res;

    //console.log(response);

}

async function eliminarUsuario(id)
{
    const res_user = await deleteUsuario(id);
    if(res_user.code)
    {
        return 400;
    }else if(res_user.affectedRows > 0)
        return 200;

}

async function actualizarUsuario(data, id)
{
    console.log(data);
    const res_user = await updateUsuario(id, data.cedula, data.correo, data.nombre, data.apellido);
    if(res_user.code)
    {
        return 400;
    }else if(res_user.affectedRows > 0)
    {
        if(esImagenBase64(data.image))
        {
           const name_image = await saveImageFile(data.image);
           if(name_image !== "")
           {
                const res_image = updateUserPhoto(id, name_image, "");
                console.log(res_image);
           }
        }

        return 200;
    }
}

function genPassRand() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let resultado = '';
    for (let i = 0; i < 5; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return resultado;
}



module.exports = {registrarUsurio, eliminarUsuario, actualizarUsuario};