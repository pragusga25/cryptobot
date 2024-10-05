'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Send, User, Bot } from 'lucide-react';
import { useChat } from 'ai/react';
import { useMemo } from 'react';

const ChatContent = (message: { content: string; role: string }) => {
  return (
    <div
      className={`flex ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      <div
        className={`flex items-start space-x-2 ${
          message.role === 'user' ? 'flex-row-reverse' : ''
        }`}
      >
        <Avatar>
          <AvatarFallback>
            {message.role === 'user' ? <User /> : <Bot />}
          </AvatarFallback>
        </Avatar>
        <div
          className={`rounded-lg p-3 ${
            message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          role="log"
          aria-live="polite"
        >
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    maxSteps: 5,
  });

  const contentMessages = useMemo(
    () => messages.filter((m) => !m.toolInvocations),
    []
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b p-4 flex items-center justify-center">
          <h1 className="text-2xl font-bold">CryptoBot</h1>
        </header>

        {/* Chat messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            <ChatContent
              content={`Hello! I'm CryptoBot. How can I assist you with cryptocurrency today?`}
              role="assistant"
            />
            {contentMessages.map((message, index) => (
              <ChatContent
                key={index + message.content + message.role}
                {...message}
              />
            ))}
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="border-t p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about cryptocurrency..."
              className="flex-1"
              aria-label="Message input"
            />
            <Button type="submit" aria-label="Send message">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap">
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.toolInvocations ? (
            <pre>{JSON.stringify(m.toolInvocations, null, 2)}</pre>
          ) : (
            <p>{m.content}</p>
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={handleInputChange}
        />
      </form>
    </div> */
}
