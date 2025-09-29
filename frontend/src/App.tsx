// App.jsx
import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const wsRef = useRef<WebSocket | null>(null);
  const [msg, setMsg] = useState("");

  // connect once when component mounts
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    wsRef.current = ws;

    ws.onmessage = (e) => {
      alert(e.data); // show server response (e.g., "pong")
    };

    return () => {
      ws.close(); //what does 'return' means here? --> Hey React, when this component goes away, please run this code.
    };
  }, []);

  const sendMsg = () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(msg);
    } else {
      alert("Socket not connected yet!");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="your message.."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <button onClick={sendMsg}>Send</button>
    </div>
  );
}

export default App;
