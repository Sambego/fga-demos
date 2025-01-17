import React from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import { Button } from "./ui/button";
import { Clipboard } from "lucide-react";

export interface CodeProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  language?: string;
  darkMode?: boolean;
}
const Code = React.forwardRef<HTMLTextAreaElement, CodeProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex min-h-[80px] w-full rounded border-input px-3 py-2 text-sm bg-gray-200">
        <Button
          variant="outline"
          className="absolute right-2 top-2 z-50"
          onClick={() => navigator.clipboard.writeText(props?.value as string)}
        >
          <Clipboard />
        </Button>
        <CodeEditor
          padding={0}
          data-color-mode={props.darkMode ? "dark" : "light"}
          style={{
            width: "100%",
            backgroundColor: "rgb(229 231 235 / 1)",
            fontFamily: "var(--font-geist-mono)",
          }}
          disabled
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Code.displayName = "CodeBlock";

export default Code;
