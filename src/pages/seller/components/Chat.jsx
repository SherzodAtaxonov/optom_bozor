// src/components/Chat.jsx
import { useState } from "react";

export default function Chat({ messages, setMessages }) {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if(!newMessage.trim()) return;
    setMessages([...messages, { from: "seller", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div>
      <div style={{border:"1px solid #ccc", height:"200px", overflowY:"auto", marginBottom:"5px"}}>
        {messages.map((m,i)=>(
          <div key={i} style={{textAlign: m.from==="seller"?"right":"left"}}>
            <span>{m.text}</span>
          </div>
        ))}
      </div>
      <input value={newMessage} onChange={e=>setNewMessage(e.target.value)} placeholder="Xabar yozing" />
      <button onClick={handleSend}>Yuborish</button>
    </div>
  );
}
