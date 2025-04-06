//import {createServer} from 'node:http' //Servidores http

//request traz dados da requisição que estou fazendo para dentro da minha API.
//response é o objeto que vou utilizar para devolver uma resposta para quem chama minha API.
// const server = createServer((request, response) =>{
//     response.write('Hello World')

//     return response.end();
// })

// server.listen(3333)

import { fastify } from 'fastify'
import { DatabaseMemory } from './database-memory.js'

const server = fastify()
const database = new DatabaseMemory()

//Quando o usuário chamar o endereço raiz da aplicação executa a função
//POST http://localhost:3333/videos
//request body = Corpo de uma requisição
server.post('/videos', (request, reply)=>{
    const {titulo, descricao, duracao} = request.body

    database.create({
        titulo: titulo,
        descricao: descricao,
        duracao: duracao,
    })

    return reply.status(201).send()//Algo foi criado
})

//GET http://localhost:3333/videos
//query parameter, parâmetros adicionais para alguma filtragem, ou modificação
//na forma como vai retornar os dados   
server.get('/videos', (request)=>{
    const search = request.query.search
    const videos = database.list(search)

    console.log(search)

    return videos //Retorna 200 normalmente
})

//Route parameter, parâmetro enviado na rota
//PUT http://localhost:3333/videos/ID
server.put('/videos/:ID', (request, reply)=>{
    const videoID = request.params.ID
    const {titulo, descricao, duracao} = request.body

    console.log(videoID)

    database.update(videoID, {
        titulo,
        descricao,
        duracao
    })

    return reply.status(204).send()
    
})

//DELETE http://localhost:3333/videos/ID
server.delete('/videos/:ID', (request, reply)=>{
    const videoID = request.params.ID

    database.delete(videoID)

    reply.status(204).send()
})

server.listen({
    port: 3333,
})