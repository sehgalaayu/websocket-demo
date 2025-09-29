import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  console.log("User Connected");
  socket.on("message", (e) => {
    if (e.toString() === "ping") {
      console.log(`client sent ping`);
      socket.send("pong");
      console.log("server sent pong");
    }
  });
});
