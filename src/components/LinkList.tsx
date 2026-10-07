import type { LinkItem } from "@/data/profile";
import type { ClickCounts } from "@/lib/clicks";
import LinkCard from "./LinkCard";

type LinkListProps = {
  links: LinkItem[];
  counts?: ClickCounts;
};

export default function LinkList({ links, counts }: LinkListProps) {
  return (
    <ul className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            id={link.id}
            title={link.title}
            url={link.url}
            initialCount={counts?.[link.id]}
          />
        </li>
      ))}
    </ul>
  );
}
