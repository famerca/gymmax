// Required Modules
const mariadb = require("mariadb");

//Initialize Pool
const pool = mariadb.createPool({
   host: "localhost",
   user: "phpmyadmin",
   password: "1234",
   database: "GymMax",
   connectionLimit: 100,
});

async function getCon()
{
    const conn = await pool.getConnection();
    console.log("Total connections: ", pool.totalConnections());
    console.log("Active connections: ", pool.activeConnections());
    console.log("Idle connections: ", pool.idleConnections());
    return conn;
}

async function authEmpleado(cedula, pass)
{

    const con = await getCon();

    const rows = await con.query(
        "SELECT rol FROM Empleado WHERE cedula = ? AND password = ?",
        [cedula, pass]
    );
    console.log(rows);
    
    con.close();
    return rows;
}
async function authUsuario(cedula, pass)
{

    const con = await getCon();

    const rows = await con.query(
        "SELECT nombre FROM Usuario WHERE cedula = ? AND password = ?",
        [cedula, pass]
    );
    console.log(rows);
    
    con.close();
    return rows;
}

async function getUsuario(id)
{

    const con = await getCon();

    const rows = await con.query(
        "SELECT s.ID_usuario as id, s.cedula, s.correo, s.nombre, s.apellido, i.image FROM Usuario AS s, Imagen as i WHERE ID_usuario = ? AND i.ID_imagen = s.ID_imagen;",
        [id]
    );
    console.log(rows);
    
    con.close();
    return rows;
}
async function updateUsuario(id, cedula, correo, nombre, apellido)
{

    const con = await getCon();

    try {
        const rows = await con.query(
            "UPDATE `Usuario` SET `cedula`= ?,`nombre`= ?,`apellido`= ?,`correo`= ? WHERE ID_usuario = ?",
            [cedula, nombre, apellido, correo, id]
        );
        console.log(rows);
        con.close();
        return rows;
        
    } catch (error) {
        con.close();
        return err;
    }

}

async function updateUserPhoto(id, image, ext)
{

    const con = await getCon();

    try {
        const rows = await con.query(
            "CALL updateUserPhoto(?, ?, ?)",
            [id, image, ext]
        );
        console.log(rows);
        con.close();
        return rows;
        
    } catch (error) {
        con.close();
        return err;
    }

}

async function getMembresias()
{
    const con = await getCon();

    const rows = await con.query(
        "SELECT ID_membresia as id, plazo, precio, nombre, sauna, familiar, horas_entrenamiento as entrenamiento FROM Membresia"
    );
    console.log(rows);
    
    con.close();
    return rows;
}

async function insertImage(image, ext, thumb = null)
{
    const con = await getCon();

    const res = await con.query(
        "CALL InsertarImagen(?, ?, ?)",
        [image,ext,thumb]
    );
    console.log(res);
    
    con.close();
    return res;
}

async function insertUsuario(imagen = null, cedula, nombre, apellido, correo, pass)
{
    const con = await getCon();

    try
    {
        const res = await con.query(
            "CALL InsertarUsuario (?, ?, ?, ?, ?, ?)",
            [imagen, cedula, nombre, apellido, correo, pass]
        );
        console.log(res);
        con.close();
        return res;

    }catch(err)
    {
        con.close();
        return err;
    }


}
async function crearSuscripcion(usuario, membresia)
{
    const con = await getCon();

    try
    {
        const res = await con.query(
            "CALL CearSuscripcion (?, ?)",
            [usuario, membresia]
        );
        con.close();
        return res;

    }catch(err)
    {
        con.close();
        return err;
    }
    

}

async function getMiembros()
{
    const con = await getCon();

    const rows = await con.query(
        "SELECT * FROM `Miembros`"
    );

    console.log(rows);
    con.close();

    return rows;
}

async function deleteUsuario(id)
{
    const con = await getCon();

    try {
        const rows = await con.query(
            "CALL DeleteUsuario(?)",
            [id]
        );
        console.log(rows);
        con.close();
    
        return rows;
        
    } catch (err) {
        con.close();
        return err;
    }

}

module.exports = {getUsuario,updateUserPhoto, authUsuario , updateUsuario , authEmpleado, getMembresias, insertImage, insertUsuario, crearSuscripcion, getMiembros, deleteUsuario};