import React, { useState, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "@/lib/utils";
import remarkBreaks from "remark-breaks";

interface EditableFieldProps {
    value: string;
    onSave: (value: string) => void;
    isEditing: boolean;
    multiline?: boolean;
    className?: string;
    markdown?: boolean;
    label?: string;
}

export const EditableField: React.FC<EditableFieldProps> = ({
    value,
    onSave,
    isEditing,
    multiline = false,
    className,
    markdown = false,
    label,
}) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setLocalValue(e.target.value);
        onSave(e.target.value);
    };

    if (isEditing) {
        return (
            <div className="relative w-full">
                {label && (
                    <label className="absolute -top-3.5 left-0 text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/70 select-none">
                        {label}
                    </label>
                )}
                {multiline ? (
                    <TextareaAutosize
                        value={localValue}
                        onChange={handleChange}
                        className={cn(
                            "w-full resize-none rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-sans leading-relaxed",
                            className,
                        )}
                    />
                ) : (
                    <input
                        type="text"
                        value={localValue}
                        onChange={handleChange}
                        className={cn(
                            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 font-sans",
                            className,
                        )}
                    />
                )}
            </div>
        );
    }

    if (markdown) {
        return (
            <div className={className}>
                <Markdown
                    remarkPlugins={[remarkBreaks]}
                    components={{
                        h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2 first:mt-0" {...props} />,
                        h4: ({ node, ...props }) => <h4 className="text-base font-semibold mt-3 mb-1" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 space-y-1" {...props} />,
                        li: ({ node, ...props }) => <li className="marker:text-foreground/80" {...props} />,
                        a: ({ node, ...props }) => <a className="underline hover:text-foreground/70" {...props} />,
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0 text-pretty" {...props} />,
                    }}
                >
                    {value}
                </Markdown>
            </div>
        );
    }

    return <span className={className}>{value}</span>;
};
