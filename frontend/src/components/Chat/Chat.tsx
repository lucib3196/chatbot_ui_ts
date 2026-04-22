import { AGENT_SERVER_URL, SLUG_TO_ASSISTANT } from "../../constants";
import { useStream } from "@langchain/react";
import ChatContainer from "./ChatContainer";
import { AIMessage, HumanMessage, BaseMessage } from "@langchain/core/messages";
import { HumanBubble, AIBubble } from "./ChatBubbles";
import { ChatInput } from "./ChatInput";
import type { ChatSlug } from "../../constants";
interface MyState {
    messages: BaseMessage[];
    runtime?: any;
}

async function blobURLtoBase64(blobUrl: string): Promise<string> {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(blob);
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
    });
}

type ChatProps = {
    selectedChat?: ChatSlug
}

export default function Chat({ selectedChat = "weather" }: ChatProps) {
    const stream = useStream<MyState>({
        apiUrl: AGENT_SERVER_URL,
        assistantId: SLUG_TO_ASSISTANT[selectedChat].assistantId,
    });

    const handleSubmit = async (
        text: string,
        images?: string[] | null | undefined,
    ) => {
        type ContentItem =
            | { type: "text"; text: string }
            | { type: "image_url"; image_url: { url: string } };

        let content: ContentItem[] = [{ type: "text", text: text }];

        // For now only one image
        if (images && images.length > 0) {
            const b64 = await blobURLtoBase64(images[0]);
            content.push({
                type: "image_url",
                image_url: { url: b64 }, // Now type-safe
            });
        }
        let payload = [
            {
                role: "human",
                content: content,
            },
        ];
        // For now only one image
        stream.submit({ messages: payload });
    };

    return (
        <ChatContainer
            size="lg"
            input={
                <ChatInput
                    handleSubmit={handleSubmit}
                    disabled={stream.isLoading}
                    multiModal={true}
                />
            }
        >
            {stream.messages.length === 0}
            {stream.messages.map((msg) => {
                if (msg.type === "human") {
                    return <HumanBubble key={msg.id} msg={msg as HumanMessage} />;
                }

                if (msg.type === "ai") {
                    return <AIBubble key={msg.id} msg={msg as AIMessage}></AIBubble>;
                }

                return null;
            })}

            {/* Input Section */}
        </ChatContainer>
    );
}
