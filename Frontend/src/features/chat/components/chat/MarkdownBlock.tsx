interface MarkdownBlockProps {
  content: string;
}

/**
 * Renders a subset of markdown:
 *  - fenced code blocks  ```...```
 *  - pipe tables  | col | col |
 *  - plain paragraphs
 *
 * Swap this component for a real markdown parser (e.g. react-markdown) when integrating the backend.
 */
const MarkdownBlock = ({ content }: MarkdownBlockProps) => {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ── Fenced code block ──────────────────────────────────────────────
    if (line.trimStart().startsWith("```")) {
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <pre
          key={i}
          className="bg-[#1a1a1a] border border-white/8 rounded-lg px-4 py-3 text-xs text-zinc-300 font-mono overflow-x-auto my-2 leading-relaxed"
        >
          <code>{codeLines.join("\n")}</code>
        </pre>
      );
      i++; // skip closing ```
      continue;
    }

    // ── Pipe table row ─────────────────────────────────────────────────
    if (line.trimStart().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trimStart().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }

      const rows = tableLines
        .filter((r) => !r.replace(/\|/g, "").replace(/-/g, "").replace(/\s/g, "").length === false || !/^[\s|:-]+$/.test(r))
        .map((r) =>
          r
            .split("|")
            .filter((_, idx, arr) => idx !== 0 && idx !== arr.length - 1)
            .map((cell) => cell.trim())
        );

      const [header, ...body] = rows;

      elements.push(
        <div key={i} className="overflow-x-auto my-2 rounded-lg border border-white/8">
          <table className="w-full text-xs text-zinc-300">
            {header && (
              <thead className="bg-[#1e1e1e]">
                <tr>
                  {header.map((cell, ci) => (
                    <th
                      key={ci}
                      className="px-4 py-2 text-left font-semibold text-zinc-400 border-b border-white/8"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody>
              {body.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b border-white/5 hover:bg-white/3 transition-colors"
                >
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // ── Plain text / paragraph ─────────────────────────────────────────
    if (line.trim()) {
      elements.push(
        <p key={i} className="text-sm text-zinc-200 leading-relaxed">
          {line}
        </p>
      );
    }
    i++;
  }

  return <div className="flex flex-col gap-1">{elements}</div>;
};

export default MarkdownBlock;
