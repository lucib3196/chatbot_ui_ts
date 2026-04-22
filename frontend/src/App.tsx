import Chat from "./components/Chat/Chat";
import ModeToggle from "./components/ModeToggle";
import ChatSelect from "./components/Chat/ChatSelect";
import { useState } from "react";
import { type ChatSlug, SLUG_TO_ASSISTANT } from "./constants";

function App() {
  const [selectedChat, setSelectedChat] = useState<ChatSlug>("weather")

  const onChatChange = (val: ChatSlug) => {
    setSelectedChat(val)
  }
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <section className="mx-auto w-full max-w-4xl rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <header className="mb-4">
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-xl font-semibold">React + LangChain Chat Template</h1>
            <ModeToggle />
          </div>
          <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
            A clean, minimal starter UI for React applications using LangChain as the
            backend. The chat below showcases the core interaction flow and prompt
            rendering via <code>renderTemplate</code>.
          </p>
        </header>
        <div className="border-t border-slate-200 pt-4 dark:border-slate-700">
          <ChatSelect options={["weather", "math"]} onChange={onChatChange} />

          <div className="mt-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-700 dark:border-slate-700 dark:bg-slate-800/40 dark:text-slate-200">
            <p className="font-medium text-slate-900 dark:text-slate-100">Assistant description</p>
            <p className="mt-1 whitespace-pre-line">
              {SLUG_TO_ASSISTANT[selectedChat].description}
            </p>
          </div>

          <div className="mt-4">
            <Chat selectedChat={selectedChat} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
