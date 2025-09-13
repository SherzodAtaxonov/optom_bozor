import { useState } from "react";
import "../styles/Chat.css";

export default function Chat() {
  const [messages, setMessages] = useState([
    { from: "seller", text: "Salom, qanday yordam bera olaman?" },
    { from: "buyer", text: "Olma narxi qancha?" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim() === "") return;
    setMessages([...messages, { from: "buyer", text: newMessage }]);
    setNewMessage("");
  };

  return (
    <div className="chat-page">
      <h1>Chat</h1>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${
              msg.from === "buyer" ? "sent" : "received"
            }`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMessage}
          placeholder="Xabar yozing..."
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Yuborish</button>
      </div>
    </div>
  );
}
