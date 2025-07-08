import { useState, useRef, useEffect } from "react";

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi there 👋\nHow can I help you today?" }
  ]);
  const [input, setInput] = useState("");
  const [threadId, setThreadId] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open]);

  const handleSend = (msg) => {
    const text = typeof msg === "string" ? msg : input;
    if (!text.trim()) return;
    setMessages([...messages, { from: "user", text }]);
    setInput("");
    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text, thread_id: threadId }),
    })
      .then(res => res.json())
      .then(data => {
        setMessages(msgs => [
          ...msgs,
          { from: "bot", text: data.response }
        ]);
        if (data.thread_id) setThreadId(data.thread_id);
      })
      .catch(() => {
        setMessages(msgs => [
          ...msgs,
          { from: "bot", text: "Sorry, something went wrong." }
        ]);
      });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-black text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        onClick={() => setOpen(true)}
        aria-label="Open Chatbot"
        style={{ display: open ? "none" : "flex" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#a21caf"/><path d="M8 10h8M8 14h5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
      </button>
      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 bg-black rounded-2xl shadow-2xl flex flex-col border border-purple-700 animate-fade-in-down">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-purple-700 to-black rounded-t-2xl border-b border-purple-800">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#a21caf"/><path d="M8 10h8M8 14h5" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
              </span>
              <span className="font-bold text-white text-lg">Virtual Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} className="text-white hover:text-purple-300 text-2xl font-bold">&times;</button>
          </div>
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto max-h-80 bg-black/95">
            {messages.map((msg, i) => (
              <div key={i} className={`mb-3 flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <span className={`inline-block px-4 py-2 rounded-2xl text-base whitespace-pre-line shadow ${msg.from === "user" ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold" : "bg-white/10 text-white"}`}>
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          {/* Input */}
          <form
            className="flex items-center border-t border-purple-800 bg-black/90 px-2 py-2 rounded-b-2xl"
            onSubmit={e => { e.preventDefault(); handleSend(); }}
          >
            <input
              className="flex-1 px-3 py-2 rounded-full border-none focus:outline-none bg-white/10 text-white placeholder-gray-400 text-base"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Write your message..."
            />
            <button
              type="submit"
              className="ml-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full p-2 shadow hover:opacity-90 transition flex items-center justify-center"
              aria-label="Send"
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M3 20l18-8-18-8v6l12 2-12 2v6z" fill="currentColor"/></svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
} 