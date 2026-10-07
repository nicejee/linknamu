import type { IconType } from "react-icons";
import { FaGithub, FaInstagram, FaLink, FaYoutube } from "react-icons/fa6";
import { SiVelog } from "react-icons/si";

// 링크 id 별 로고와 브랜드 색상. 목록에 없는 링크는 기본 링크 아이콘을 씁니다.
const icons: Record<string, { Icon: IconType; color: string }> = {
  github: { Icon: FaGithub, color: "#181717" },
  blog: { Icon: SiVelog, color: "#20C997" },
  instagram: { Icon: FaInstagram, color: "#E4405F" },
  youtube: { Icon: FaYoutube, color: "#FF0000" },
};

type LinkIconProps = {
  id: string;
  className?: string;
};

export default function LinkIcon({ id, className }: LinkIconProps) {
  const { Icon, color } = icons[id] ?? { Icon: FaLink, color: "#6B7280" };
  return <Icon aria-hidden className={className} style={{ color }} />;
}
