/**
 * Renders a JSON-LD script tag. Kept as a server component so structured data
 * is present in the initial HTML for crawlers.
 */
export default function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is generated from local content, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
