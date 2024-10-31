import express from 'express';

const app = express();

app.use(express.json());

let usuarios = [
    {id: 1, nome: "Joao", email: "joao@email.com", idade: 25},
    {id: 2, nome: "Joao Vitor", email: "joao-v@email.com", idade: 22},
    {id: 3, nome: "Joao Pedro", email: "joao-pe@email.com", idade: 21},
    {id: 4, nome: "Joao Paulo", email: "joao-pa@email.com", idade: 24}
];

app.get("/usuarios", (req, res) => {
    res.status(200).json({success: true, data: usuarios})
})


app.get("/", (req, res) => {
    res.send('Hello FIPP 23');
});

app.get("/usuarios/:id", (req, res) => {
    const id = req.params.id;

    if(!id){
        res.status(400).json({success: false, message: "Manda o ID "});
    }
    else{
        const usuarioEncontrado = usuarios.find((usuario) => 
            usuario.id === Number(id)
        );

        if(usuarioEncontrado !== undefined){
            res.status(200).json({success: true, data:usuarioEncontrado});
        }
        else{
            res.status(404).json({success: false, message: "User not found!"});
        }
    }
});


app.post("/usuarios", (req, res) => {
    const {nome, email, idade } = req.body;
    if(!nome || !email || !idade) 
        res.status(400).json({success: false, message: "Informações inválidas"});
    else{
        const novoUsuario = {
            id: usuarios[usuarios.length -1].id + 1,
            nome,
            email,
            idade
        };

        usuarios.push(novoUsuario);

        res.status(200).json({success: true, message: "Usuario criado com sucesso!"});

    }
});

app.listen(5000, () => {
    console.log('Servidor rodando em http://localhost:5000');
});