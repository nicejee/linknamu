"use client";

import LinkIcon from "./LinkIcon";

type LinkCardProps = {
  id: string;
  title: string;
  url: string;
  count: number;
  /** 클릭 직후 화면의 클릭 수를 바로 1 올리기 위해 부모에 알립니다. */
  onClick: (id: string) => void;
};

// 페이지 이동을 막지 않도록 sendBeacon 으로 클릭을 기록합니다.
function trackClick(linkId: string) {
  const body = JSON.stringify({ linkId });
  if (navigator.sendBeacon?.("/api/clicks", body)) return;
  fetch("/api/clicks", { method: "POST", body, keepalive: true }).catch(() => {});
}

export default function LinkCard({ id, title, url, count, onClick }: LinkCardProps) {
  const handleClick = () => {
    trackClick(id);
    onClick(id);
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
      <span
        aria-label={`클릭 ${count.toLocaleString("ko-KR")}회`}
        className="absolute top-1/2 right-4 -translate-y-1/2 rounded-full bg-white/60 px-2 py-0.5 text-xs font-medium text-ink/50 tabular-nums"
      >
        {count.toLocaleString("ko-KR")}회
      </span>
    </a>
  );
}
