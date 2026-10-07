"use client";

import { useEffect, useState } from "react";
import type { LinkItem } from "@/data/profile";
import type { ClickCounts } from "@/lib/clicks";
import LinkCard from "./LinkCard";

type LinkListProps = {
  links: LinkItem[];
};

// 모든 링크의 클릭 수를 한 번에 받아 옵니다.
async function fetchClickCounts(): Promise<ClickCounts> {
  const res = await fetch("/api/clicks", { cache: "no-store" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default function LinkList({ links }: LinkListProps) {
  // 데이터를 받기 전에는 0회로 보여 주고, 받으면 실제 값으로 갱신합니다.
  const [counts, setCounts] = useState<ClickCounts>({});

  useEffect(() => {
    let cancelled = false;
    fetchClickCounts()
      .then((data) => {
        if (!cancelled) setCounts(data);
      })
      .catch((error) => console.error("클릭 수 조회 실패:", error));
    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }));
  };

  return (
    <ul className="flex w-full flex-col gap-4">
      {links.map((link) => (
        <li key={link.id}>
          <LinkCard
            id={link.id}
            title={link.title}
            url={link.url}
            count={counts[link.id] ?? 0}
            onClick={handleClick}
          />
        </li>
      ))}
    </ul>
  );
}
