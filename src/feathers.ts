import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'

const herok= 'http://18.170.52.169:8080/'
const url= 'http://localhost:5000'
const API = process.env.NODE_ENV !== 'production' ?  url :'https://healthstack-backend.herokuapp.com' ;
const socket=io(url, {
    transports: ['websocket'],
    forceNew: true
  })
const client=feathers()
client.configure(socketio(socket,{timeout:700000}))
client.configure(authentication({
    storage:window.localStorage
}))
//client.configure(restClient.axios(axios));

export default client
