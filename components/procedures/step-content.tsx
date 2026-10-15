import React from "react";
import { CheckCircle2 } from "lucide-react";

interface StepContentProps {
  content: string;
}

type Block =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

// Les lignes qui commencent par « - » forment une liste ; les autres, des paragraphes.
function parseContent(content: string): Block[] {
  const blocks: Block[] = [];

  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("- ")) {
      const last = blocks.at(-1);
      if (last?.type === "list") {
        last.items.push(line.slice(2));
      } else {
        blocks.push({ type: "list", items: [line.slice(2)] });
      }
    } else {
      blocks.push({ type: "paragraph", text: line });
    }
  }

  return blocks;
}

export function StepContent({ content }: StepContentProps) {
  return (
    <div className="space-y-3 text-[0.95rem] leading-relaxed">
      {parseContent(content).map((block, index) =>
        block.type === "list" ? (
          <ul key={index} className="space-y-2.5">
            {block.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2
                  aria-hidden
                  className="mt-1 h-4 w-4 shrink-0 text-accent-primary"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p key={index}>{block.text}</p>
        )
      )}
    </div>
  );
}
