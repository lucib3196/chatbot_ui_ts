import clsx from "clsx";

type ChatContainerVariant = "demo" | "main";
type Sizes = "sm" | "med" | "lg";

const Variants: Record<ChatContainerVariant, string> = {
  demo:
    "flex flex-col rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100",
  main:
    "mx-auto flex flex-col rounded-2xl border border-slate-200 bg-white p-4 text-slate-900 shadow-lg dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100",
};

const SizeClasses: Record<Sizes, string> = {
  sm: "h-[320px] w-full max-w-md",
  med: "h-[520px] w-full max-w-2xl",
  lg: "h-[720px] w-full max-w-4xl",
};
interface ChatContainerProps {
  input: React.ReactNode;
  children: React.ReactNode;
  variant?: ChatContainerVariant;
  size?: Sizes;
}
export default function ChatContainer({
  input,
  children,
  variant = "main",
  size = "med",
}: ChatContainerProps) {
  return (
    <div className={clsx(Variants[variant], SizeClasses[size], "auto-scroll-y")}>
      <div className="flex min-h-0 flex-1 flex-col gap-y-5 overflow-y-auto">
        {children}
      </div>
      <div>{input}</div>
    </div>
  );
}
