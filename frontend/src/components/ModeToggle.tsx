import { useState, useEffect } from "react";
import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import clsx from "clsx";
type Theme = "light" | "dark";

export default function ModeToggle() {
    const [theme, setTheme] = useState<Theme>(() => {
        const stored = localStorage.getItem("theme") as Theme | null;
        if (stored) {
            return stored;
        } else {
            return "light";
        }
    });

    useEffect(() => {
        // apply to <html>
        document.documentElement.dataset.theme = theme;

        // or if using class-based:
        document.documentElement.classList.toggle("dark", theme === "dark");

        // persist
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <div className="flex flex-row gap-x-3">
            <button
                value="dark"
                onClick={() => setTheme("dark")}
                className={clsx(
                    "rounded-md p-2 transition-colors duration-200 hover:bg-slate-200 dark:hover:bg-slate-700",
                    theme === "dark"
                        ? "bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
                )}
                aria-label="Enable dark mode"
            >
                <MdDarkMode size={22} />
            </button>

            <button
                value="light"
                onClick={() => setTheme("light")}
                className={clsx(
                    "rounded-md p-2 transition-colors duration-200 hover:bg-amber-100 dark:hover:bg-amber-900/40",
                    theme === "light"
                        ? "bg-amber-200 text-amber-900 dark:bg-amber-300 dark:text-amber-950"
                        : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
                )}
                aria-label="Enable light mode"
            >
                <MdLightMode size={22} />
            </button>
        </div>
    );
}
