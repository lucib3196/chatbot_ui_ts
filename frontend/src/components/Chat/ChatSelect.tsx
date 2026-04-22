import { type ChatSlug } from "../../constants";

type ChatSelectProps = {
    options: ChatSlug[];
    onChange: (v: ChatSlug) => void;
};

export default function ChatSelect({ options, onChange }: ChatSelectProps) {
    return (
        <div className="mb-3">
            <select
                name="chat-select"
                id="chat-select"
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-slate-500"
                onChange={(e) => onChange(e.target.value as ChatSlug)}
            >
                {options.map((v) => (
                    <option key={v} value={v}>
                        {v}
                    </option>
                ))}
            </select>
        </div>
    );
}
