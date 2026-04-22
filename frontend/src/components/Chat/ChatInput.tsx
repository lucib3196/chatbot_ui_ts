import clsx from "clsx";
import { useState } from "react";
import ImageUploader from "../ImageUpload";

type ChatInputVariant = "default" | "subtle";

const VariantClasses: Record<
  ChatInputVariant,
  {
    root: string;
    preview: string;
    toolbar: string;
    newButton: string;
    input: string;
    sendButton: string;
  }
> = {
  default: {
    root:
      "rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-500 dark:bg-slate-950/40",
    preview:
      "mb-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-900/70",
    toolbar:
      "mt-0 flex w-full items-center gap-2 border-t border-slate-200 pt-3 dark:border-slate-800",
    newButton:
      "rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800",
    input:
      "flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500",
    sendButton:
      "rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-100 dark:text-slate-900",
  },
  subtle: {
    root: "rounded-xl bg-slate-100/70 p-2 dark:bg-slate-950/20",
    preview:
      "mb-2 w-full rounded-xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900/50",
    toolbar: "mt-0 flex w-full items-center gap-2 pt-3",
    newButton:
      "rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-200 dark:border-slate-700/80 dark:text-slate-200 dark:hover:bg-slate-800/80",
    input:
      "flex-1 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-500 focus:border-slate-500 dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-slate-500",
    sendButton:
      "rounded-md bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-200 dark:text-slate-900",
  },
};

export interface ChatInputProps {
  handleSubmit: (val: string, images?: string[]) => Promise<void>;
  disabled: boolean;
  onNewThread?: () => void;
  multiModal?: boolean;
  variant?: ChatInputVariant;
}

export function ChatInput({
  handleSubmit,
  disabled,
  onNewThread,
  multiModal = true,
  variant = "default",
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [_, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const styles = VariantClasses[variant];

  const submit = () => {
    const trimmed = message.trim();
    if (!trimmed || disabled) return;
    handleSubmit(trimmed, image ? [image] : undefined);
    setImage("");
    setMessage("");
  };

  function onFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    const url = URL.createObjectURL(file);
    setImage(url);
  }

  return (
    <div className={clsx("flex flex-col", styles.root)}>
      {image && (
        <div className={styles.preview}>
          <img
            src={image}
            alt="Preview"
            className="max-h-52 w-full rounded-lg object-contain"
          />
        </div>
      )}
      <div className={styles.toolbar}>
        {onNewThread && (
          <button
            type="button"
            onClick={onNewThread}
            className={styles.newButton}
          >
            New
          </button>
        )}
        <input
          className={styles.input}
          placeholder="Type a message..."
          disabled={disabled}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submit();
          }}
        />
        <button
          type="button"
          onClick={submit}
          disabled={disabled || !message.trim()}
          className={styles.sendButton}
        >
          Send
        </button>
        {multiModal && <ImageUploader onFileSelect={onFileSelect} />}
      </div>
    </div>
  );
}
