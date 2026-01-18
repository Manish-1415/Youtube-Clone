// sockets Connecting / initial Handshake 
import {Server} from "socket.io";

const socketMap = new Map();

export const initSocket = (server) => {
    // initial Handshake
    const io = new Server(server , {
        cors : "*"//by this anyone can connect as a socket
    });

    io.on("connection" , (socket) => {
        console.log("Client Connected as Socket" , socket.id);

        // get the channelId
        const channelId = socket.handshake.auth.channelId;

        // set the channelId
        if(channelId) {
            socketMap.set(channelId.toString() , socket.id);
            console.log("Mapped Channel:" , channelId ,"->",socket.id );

        }


        socket.on("disconnect" , () => {
            console.log(("Socket Disconnected", socket.id));
        })

        for(const [key , val] of socketMap.entries()) {
            if(val === socket.id.toString()) {
                socketMap.delete(key);
                break;
            }
        }
    })

    const emitToChannel = (channelId , event , payload) => {
        const socketId = socketMap.get(channelId.toString());

        if(socketId) {
            io.to(socketId).emit(event , payload);
        }
    }

    return {io , emitToChannel}
}
