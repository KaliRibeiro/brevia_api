import express from 'express';
import knex from 'knex';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express()
const port = 3000
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())

const brevia = knex({
    client: 'mysql2',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: 'senacrs',
      database: 'brevia',
    },
  });


app.get('/', (req, res) => {
  res.send('Olá Mundo!')
});

app.post('/user/login', async (req,res) =>{
  const { email, senha } = req.body

  const usuario = await brevia("usuario").where({email}).first()

  if(senha != usuario.senha){
    res.status(401).send('Não Autorizado')
  }

  res.status(200).json({usuario})
})


app.post('/admin/login', async (req,res) =>{
  const { email, senha } = req.body

  const usuario = await brevia("usuario").where({email}).first()

  if(senha != usuario.senha || usuario.administrador === 0){
    res.status(401).send('Não Autorizado')
  }

  res.status(200).json({usuario})
})

app.get("/categorias", async(req,res)=>{

    const categoria = await brevia.select("nome").from("categoria");

    res.json(categoria);

});




app.post('/nova_noticia', async(req,res)=>{


    const {titulo, post,  imagem, categoria_id} = req.body;
    
     if (!titulo || !post || !imagem || !categoria_id) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    const date = new Date()

    const datapost = date.toDateString()

    await brevia("noticia").insert({titulo, post, datapost , imagem, categoria_id});

 

    res.status(201).json({
      mensagem: "Notícia criada com sucesso!"
    });

});


app.get("/noticias/:categoria_id", async(req,res)=>{
    
  const {categoria_id} = req.params;
  
    const noticia = await brevia('noticia').select("categoria.nome","noticia.categoria_id", "noticia.titulo", "noticia.post", "noticia.imagem","noticia.datapost"  )
    .join("categoria", "categoria.id", "=", "noticia.categoria_id")
    .where({categoria_id});

    res.json(noticia);
});




app.listen(port, () => {
  console.log(`App de exemplo esta rodando na porta ${port}`)
});



