const express = require('express');
const app = express();
const cors = require('cors');
const auth = require('./auth');
const db = require('./db');
const { registrarUsurio, eliminarUsuario, actualizarUsuario } = require('./user');
app.use(cors());
app.use(express.json({ limit: '5mb' }));


app.post("/login", (req, res) => {
    if(!req._body)
        return res.status(400).json({message : "No hay cuerpo"});
    const body = req.body;
    if (!body.cedula || !body.password)
    {
        return res.status(400).json({message : "Falta campos"});
    }
    console.log(body);

    auth.login(body.cedula, body.password).then(json =>
    {
        if(json.token === "")
            return res.status(400).json({message : "Cedula o contraseña invalida"});
        console.log(json.token);
        res.status(200).json(json);
    })
});

app.get('/users', auth.verifyToken, (req, res) =>
{
    res.status(200).json({});
});

app.get('/miembros', auth.verifyToken, (req, res) =>
{
    db.getMiembros().then(r => 
    {
        res.status(200).json(r);
    })
});


app.get('/membresias', auth.verifyToken, (req, res) =>
{
    db.getMembresias().then(rows => {
        res.status(200).json(rows);
    });
});

app.post("/user", auth.verifyToken ,(req, res) =>
{
    //console.log(req.body);
    registrarUsurio(req.body).then(r => {
        console.log(r);
        res.status(r.status).json(r.json);
    });
    //console.log(req.session);
})

app.get('/user/:userid', auth.verifyToken, (req, res) =>
{
    const userid = req.params.userid;
    db.getUsuario(userid).then(r => {
        res.status(200).json(r);
    });
   
});

app.delete('/user/:userid', auth.verifyToken, (req, res) =>
{
    const userid = req.params.userid;
    eliminarUsuario(userid).then(status => {
        res.status(status).send("Borrado");
    });
});

app.put('/user/:userid', auth.verifyToken, (req, res) =>
{
    const userid = req.params.userid;
    actualizarUsuario(req.body, userid).then(r => {
        console.log(r);
        res.status(r).send("actualizado");
    });
});

app.listen(5050);