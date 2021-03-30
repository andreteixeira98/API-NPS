import   'reflect-metadata';

import express from 'express';

const app = express(); 

app.listen(3333, ()=>console.log('server is running!'));

app.get('/',(req,res)=>{
    res.json({message:'lista de produtos'});
});

app.post('/',(req, res)=>{
    res.json({message:'cadastro realizado com sucesso'});
});