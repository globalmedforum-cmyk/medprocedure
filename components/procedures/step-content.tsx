import React from "react";
import { CheckCircle2 } from "lucide-react";

// Format du champ `content` d'une étape (texte saisi dans l'administration) :
// - une ligne « - texte » est un point de la liste « En pratique » ;
// - une ligne indentée « ··- texte » est une sous-puce du point précédent ;
// - une ligne « ## Titre » ouvre un encadré complémentaire, affiché sous
//   « En pratique » (par exemple « Focus : dossier de candidature ») ;
// - dans cet encadré, chaque ligne « ### Titre » ouvre une carte ;
// - dans le texte : **gras**, *italique* et [libellé](https://lien).

interface ListItem {
  text: string;
  children: string[];
}

type Block =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: ListItem[] };

interface FocusCard {
  title: string;
  blocks: Block[];
}

export interface ParsedStepContent {
  blocks: Block[];
  focus: { title: string; intro: Block[]; cards: FocusCard[] } | null;
}

function pushLine(blocks: Block[], rawLine: string) {
  const line = rawLine.trim();
  if (!line) return;

  const isBullet = line.startsWith("- ");
  const isNested = isBullet && /^\s{2,}-\s/.test(rawLine);
  const last = blocks.at(-1);

  if (isNested && last?.type === "list" && last.items.length > 0) {
    last.items.at(-1)!.children.push(line.slice(2));
  } else if (isBullet) {
    const item = { text: line.slice(2), children: [] };
    if (last?.type === "list") last.items.push(item);
    else blocks.push({ type: "list", items: [item] });
  } else {
    blocks.push({ type: "paragraph", text: line });
  }
}

export function parseStepContent(content: string): ParsedStepContent {
  const result: ParsedStepContent = { blocks: [], focus: null };
  let target = result.blocks;

  for (const rawLine of content.split("\n")) {
    const line = rawLine.trim();

    if (line.startsWith("### ") && result.focus) {
      const card = { title: line.slice(4), blocks: [] };
      result.focus.cards.push(card);
      target = card.blocks;
    } else if (line.startsWith("## ")) {
      result.focus = { title: line.slice(3), intro: [], cards: [] };
      target = result.focus.intro;
    } else {
      pushLine(target, rawLine);
    }
  }

  return result;
}

const inlinePattern =
  /(\*\*.+?\*\*|\[[^\]]+\]\(https?:\/\/[^\s)]+\)|\*[^*\s][^*]*?\*)/g;

// Gras, italique et liens externes, sans jamais interpréter de HTML
function InlineText({ text }: { text: string }) {
  const parts = text.split(inlinePattern);

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
          return (
            <strong key={index} className="font-semibold text-text-primary">
              <InlineText text={part.slice(2, -2)} />
            </strong>
          );
        }

        const link = /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/.exec(part);
        if (link) {
          return (
            <a
              key={index}
              href={link[2]}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-accent-primary underline-offset-4 hover:underline"
            >
              {link[1]}
            </a>
          );
        }

        if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
          return <em key={index}>{part.slice(1, -1)}</em>;
        }

        return <React.Fragment key={index}>{part}</React.Fragment>;
      })}
    </>
  );
}

function ContentBlocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-3 text-[0.95rem] leading-relaxed">
      {blocks.map((block, index) =>
        block.type === "list" ? (
          <ul key={index} className="space-y-2.5">
            {block.items.map((item, itemIndex) => (
              <li key={itemIndex} className="flex items-start gap-2.5">
                <CheckCircle2
                  aria-hidden
                  className="mt-1 h-4 w-4 shrink-0 text-accent-primary"
                />
                <div className="min-w-0 space-y-1.5">
                  <p>
                    <InlineText text={item.text} />
                  </p>
                  {item.children.length > 0 && (
                    <ul className="list-disc space-y-1 pl-4 marker:text-accent-primary">
                      {item.children.map((child, childIndex) => (
                        <li key={childIndex}>
                          <InlineText text={child} />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p key={index}>
            <InlineText text={block.text} />
          </p>
        ),
      )}
    </div>
  );
}

interface StepContentProps {
  content: string;
}

// Encadré gris « En pratique », puis l'encadré complémentaire s'il existe
export function StepContent({ content }: StepContentProps) {
  const { blocks, focus } = parseStepContent(content);

  return (
    <>
      {blocks.length > 0 && (
        <section className="space-y-3 rounded-2xl border border-border-default/60 bg-bg-base p-4 sm:p-6">
          <h3 className="text-sm font-bold">En pratique</h3>
          <ContentBlocks blocks={blocks} />
        </section>
      )}

      {focus && (
        <section className="space-y-4 rounded-2xl border border-accent-primary/20 bg-accent-soft/50 p-3 sm:p-6">
          <h3 className="text-sm font-bold">{focus.title}</h3>
          {focus.intro.length > 0 && <ContentBlocks blocks={focus.intro} />}
          {focus.cards.length > 0 && (
            <ol className="space-y-3">
              {focus.cards.map((card, index) => (
                <li
                  key={index}
                  className="space-y-2 rounded-xl border border-border-default bg-bg-surface p-3 sm:p-4"
                >
                  <h4 className="flex items-start gap-2.5 font-heading text-base font-bold">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-primary font-mono text-xs text-primary-foreground">
                      {index + 1}
                    </span>
                    <span className="pt-px">
                      <InlineText text={card.title} />
                    </span>
                  </h4>
                  <ContentBlocks blocks={card.blocks} />
                </li>
              ))}
            </ol>
          )}
        </section>
      )}
    </>
  );
}
