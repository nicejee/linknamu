export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 기준 경로(예: "/profile.jpg") 또는 외부 URL. 없으면 기본 사람 아이콘을 표시합니다. */
  image?: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "김개발",
  bio: "플스택 개발자를 꿈꿔보는 시민 기획자",
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "blog", title: "블로그", url: "https://velog.io" },
    { id: "instagram", title: "Instagram", url: "https://instagram.com" },
    { id: "youtube", title: "YouTube", url: "https://youtube.com" },
  ],
};
