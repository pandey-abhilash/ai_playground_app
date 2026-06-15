import './App.css';
import Layout from "@/app/layout";
import { useEffect, useCallback, useState, useRef } from "react";
// import { InputGroupTextarea } from './components/ui/input-group';
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';

type ChatData = {
  role: "user" | "assistant";
  content: string;
}

function App() {
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [prompt, setPrompt] = useState<string>("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const fetchChatData = useCallback(async () => {
    try {
      const response = await fetch('/api/chat-history');
      if (!response.ok) {
        console.error('Chat history fetch failed:', response.status);
        setChatData([]);
        return;
      }
      const chatHistory = await response.json();
      setChatData(Array.isArray(chatHistory) ? chatHistory : []);
    } catch (err) {
      console.error('Failed to fetch chat history', err);
      setChatData([]);
    }
  }, []);

  useEffect(() => {
    fetchChatData();
  }, [fetchChatData]);

  // scroll to bottom whenever chatData changes
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    } else if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatData]);

  const handleSendMessage = async () => {
    if (!prompt.trim()) return;
    try {
      await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      setPrompt("");
      fetchChatData();
    } catch (err) {
      console.error('Failed to send message', err);
    }
  }

  return (
    <div className="p-4">
      <Layout>
        <div className="flex min-h-[70vh] w-full max-w-4xl flex-col gap-6 mx-auto pb-24">
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-2xl font-bold">Welcome to Talksy!</h1>
            <h3 className="text-lg font-bold text-gray-600">
              This is the main content area of the application.
            </h3>
          </div>

          <div className="flex-1 w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div ref={chatContainerRef} className="h-full min-h-0 overflow-y-auto p-4 space-y-3">
              {chatData && chatData.length > 0 ? (
                chatData.map((data: ChatData, index: number) => (
                  <div key={index} className={`flex ${data.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`rounded-xl p-3 max-w-[80%] ${data.role === "user" ? "bg-blue-100 text-slate-900" : "bg-gray-100 text-slate-800"}`}>
                      <strong className="block text-xs text-gray-500 mb-1">{data.role === "user" ? "You" : "Assistant"}</strong>
                      <div>{data.content}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-sm text-gray-500">No chat history available yet.</div>
              )}
              <div ref={chatEndRef} />
            </div>
          </div>
          <div className=" fixed bottom-4 w-full left-1/5 right-0 flex max-w-4xl mx-auto justify-center pointer-events-none">
            <div className="w-full max-w-3xl px-4 pointer-events-auto">
              <div className="bg-white/90 rounded-xl p-3 shadow-md backdrop-blur-md flex gap-2 items-center">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full"
                />
                <Button onClick={handleSendMessage} className="whitespace-nowrap">Send</Button>
              </div>
            </div>
          </div>
        </div>

        {/* fixed input area centered at bottom */}

      </Layout>
    </div>
  )
}

export default App
