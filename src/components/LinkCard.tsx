"use client";

import { useState } from "react";
import LinkIcon from "./LinkIcon";

type LinkCardProps = {
  id: string;
  title: string;
  url: string;
  /** 서버에서 읽어 온 클릭 수. 없으면(DB 오류 등) 표시하지 않습니다. */
  initialCount?: number;
};

// 페이지 이동을 막지 않도록 sendBeacon 으로 클릭을 기록합니다.
function trackClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  if (navigator.sendBeacon?.("/api/clicks", body)) return;
  fetch("/api/clicks", { method: "POST", body, keepalive: true }).catch(() => {});
}

export default function LinkCard({ id, title, url, initialCount }: LinkCardProps) {
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    trackClick(id);
    setCount((c) => (c === undefined ? c : c + 1));
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      onAuxClick={(e) => {
        if (e.button === 1) handleClick(); // 마우스 휠 클릭(새 탭 열기)
      }}
      className="relative block w-full rounded-3xl border border-white/70 bg-white/45 px-16 py-[18px] text-center font-semibold shadow-[0_4px_24px_-10px_rgba(160,80,40,0.25)] backdrop-blur-xl transition duration-300 ease-out hover:-translate-y-px hover:bg-white/65 hover:shadow-[0_8px_28px_-10px_rgba(160,80,40,0.3)] active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
    >
      <span className="flex items-center justify-center gap-2">
        <LinkIcon id={id} className="size-6 shrink-0" />
        <span className="truncate">{title}</span>
      </span>
      {count !== undefined && (
        <span
          aria-label={`클릭 ${count.toLocaleString("ko-KR")}회`}
          className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium text-ink/50 tabular-nums"
        >
          {count.toLocaleString("ko-KR")}
        </span>
      )}
    </a>
  );
}
