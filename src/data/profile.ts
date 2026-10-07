export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 기준 경로 (예: "/profile.jpg"). 없으면 이름 첫 글자를 표시합니다. */
  image?: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "김철수",
  bio: "세계 최강 바이브코더",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "blog", title: "블로그", url: "https://velog.io" },
    { id: "instagram", title: "Instagram", url: "https://instagram.com" },
    { id: "youtube", title: "YouTube", url: "https://youtube.com" },
  ],
};
