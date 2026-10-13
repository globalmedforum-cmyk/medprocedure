import React from "react";

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
    <div className="space-y-3 text-base leading-relaxed">
      {parseContent(content).map((block, index) =>
        block.type === "list" ? (
          <ul
            key={index}
            className="list-disc space-y-2 pl-5 marker:text-accent-primary"
          >
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={index}>{block.text}</p>
        )
      )}
    </div>
  );
}
