export default function RichTextRenderer({ content }) {
  if (!content) return null;

  return content.map((block, index) => {
    switch (block.type) {
      case "paragraph":
        return <p key={index}>{block.children.map(c => c.text).join("")}</p>;

      case "heading":
        const Tag = `h${block.level || 2}`;
        return <Tag key={index}>{block.children.map(c => c.text).join("")}</Tag>;

      case "image":
        return (
          <img
            key={index}
            src={`${process.env.URL}${block.image.url}`}
            alt={block.image.alternativeText || ""}
            className="my-4 rounded shadow"
          />
        );

      case "list":
        return (
          <ul key={index} className="list-disc ml-6">
            {block.children.map((li, i) => (
              <li key={i}>{li.children.map(c => c.text).join("")}</li>
            ))}
          </ul>
        );

      case "quote":
        return (
          <blockquote key={index} className="border-l-4 pl-4 italic">
            {block.children.map(c => c.text).join("")}
          </blockquote>
        );

      default:
        return null;
    }
  });
}
