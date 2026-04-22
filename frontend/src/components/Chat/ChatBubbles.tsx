import { type ContentBlock } from "langchain";
import { cleanChildren } from "./utils";
import { AIMessage, HumanMessage, ToolMessageChunk } from "@langchain/core/messages";
import Markdown from "../MarkdownRender";
type ChatType = "human" | "ai" | "tool";

type BubbleRenderModel =
  | { bubble: "human"; msg: HumanMessage }
  | { bubble: "ai"; msg: AIMessage; showTools?: boolean }
  | { bubble: "tool"; msg: ToolMessageChunk };

interface HumanBubbleProps {
  type?: "human";
  msg: HumanMessage;
}

interface AIMessageBubbleProps {
  type?: "ai";
  msg: AIMessage;
  showTools?: boolean;
}

interface ToolBubbleProps {
  type?: "tool";
  msg: ToolMessageChunk;
}

type CleanableContent = ContentBlock[] | string;

const ChatBubbleBase =
  "my-2 max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap shadow-sm";

const ChatBubbleStyles: Record<ChatType, string> = {
  ai: `${ChatBubbleBase} self-start border border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100`,
  human: `${ChatBubbleBase} self-end bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-slate-100`,
  tool: `${ChatBubbleBase} self-start border border-amber-300/60 bg-amber-50 text-amber-900 dark:border-amber-700/40 dark:bg-amber-950/20 dark:text-amber-100`,
};

function normalizeContent(content: unknown): CleanableContent {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content as ContentBlock[];
  return String(content ?? "");
}

function formatArgs(args: unknown): string {
  try {
    return JSON.stringify(args, null, 2);
  } catch {
    return String(args ?? "");
  }
}

function renderBubbleContent(model: BubbleRenderModel) {
  if (model.bubble === "ai") {
    const hasToolCalls = !!model.msg.tool_calls?.length;

    if (hasToolCalls && model.showTools !== false) {
      return (
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Tool calls
          </div>
          {model.msg.tool_calls!.map((toolCall, index) => (
            <details
              key={`${toolCall.name}-${index}`}
              className="rounded-md border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-950/60"
            >
              <summary className="cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-200">
                {toolCall.name}
              </summary>
              <pre className="mt-2 overflow-x-auto rounded bg-slate-100 p-2 text-xs text-slate-700 dark:bg-slate-900 dark:text-slate-300">
                {formatArgs(toolCall.args)}
              </pre>
            </details>
          ))}
        </div>
      );
    }

    return cleanChildren(normalizeContent(model.msg.content));
  }

  if (model.bubble === "tool") {
    return (
      <div className="space-y-1">
        <div className="text-xs uppercase tracking-wide text-amber-700 dark:text-amber-300/80">
          Tool response
        </div>
        <div className="font-medium">{model.msg.name ?? "unknown_tool"}</div>
        <div>{cleanChildren(normalizeContent(model.msg.content))}</div>
      </div>
    );
  }

  return cleanChildren(normalizeContent(model.msg.content));
}

export function HumanBubble({ msg, type = "human" }: HumanBubbleProps) {
  return (
    <div className={ChatBubbleStyles[type]}>
      <Markdown>
        {renderBubbleContent({ bubble: "human", msg })}
      </Markdown>
    </div>
  );
}

export function AIBubble({
  msg,
  type = "ai",
  showTools = true,
}: AIMessageBubbleProps) {
  return (
    <div className={ChatBubbleStyles[type]}>
      <Markdown>
        {renderBubbleContent({ bubble: "ai", msg, showTools })}
      </Markdown>
    </div>
  );
}

export function ToolMessageBubble({ msg, type = "tool" }: ToolBubbleProps) {
  return (
    <div className={ChatBubbleStyles[type]}>
      {renderBubbleContent({ bubble: "tool", msg })}
    </div>
  );
}
