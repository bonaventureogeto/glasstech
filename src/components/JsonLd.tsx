import type { Thing, WithContext } from "schema-dts";

// One JSON-LD block. `<` is escaped so the data can never close the script tag.
export default function JsonLd({ data }: { data: WithContext<Thing> | WithContext<Thing>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
