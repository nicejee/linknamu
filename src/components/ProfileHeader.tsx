import Image from "next/image";
import { FaUser } from "react-icons/fa6";

type ProfileHeaderProps = {
  name: string;
  bio: string;
  image?: string;
};

// 아래로 부드럽게 퍼지는 따뜻한 그림자로 사진이 살짝 떠 보이게 합니다.
const avatarClass =
  "size-28 rounded-full ring-4 ring-white/90 shadow-[0_12px_32px_-12px_rgba(160,80,40,0.45)] sm:size-32";

export default function ProfileHeader({ name, bio, image }: ProfileHeaderProps) {
  return (
    <header className="flex flex-col items-center text-center">
      {image ? (
        <Image
          src={image}
          alt={`${name} 프로필 사진`}
          width={128}
          height={128}
          priority
          // 외부 이미지(placehold.co 등 SVG)는 최적화 없이 원본 그대로 사용합니다.
          unoptimized={image.startsWith("http")}
          className={`${avatarClass} object-cover object-top`}
        />
      ) : (
        <div
          role="img"
          aria-label={`${name} 기본 프로필 이미지`}
          className={`${avatarClass} flex items-center justify-center bg-linear-to-b from-orange-200 to-orange-300`}
        >
          <FaUser aria-hidden className="size-12 text-white sm:size-14" />
        </div>
      )}
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-blue-600">{name}</h1>
      <p className="mt-2 text-[15px] leading-relaxed text-ink/60">{bio}</p>
    </header>
  );
}
