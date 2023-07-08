import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);
    scrollTo(0, 1e10);
    setMessage("");

    fetch("http://localhost:8080/", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chats }),
    })
      .then((response) => response.json())
      .then((data) => {
        msgs.push(data.output);
        setChats(msgs);
        setIsTyping(false);
        scrollTo(0, 1e10);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <main>
      <h1 className="logo">
        Chato<span>pedia</span>
      </h1>

      <section className="resField">
        {chats && chats.length
          ? chats.map((chat, index) => (
              <>
                <p
                  key={index}
                  className={chat.role === "user" ? "user_msg" : ""}
                >
                  <span>{chat.content}</span>
                </p>
              </>
            ))
          : ""}
        <div className={isTyping ? "" : "hide"}>
          <p>
            <i>{isTyping ? "Typing.." : ""}</i>
          </p>
        </div>
      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Ask me Any Thing , I Will Help You..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
      </section>
    </main>
  );
}
export default App;
