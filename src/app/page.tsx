import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import { profile } from "@/data/profile";

// 클릭 수는 LinkList 가 페이지를 연 뒤 /api/clicks 에서 받아 옵니다.
export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-md flex-col items-center gap-12 px-6 py-16 sm:py-24">
      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />
      <LinkList links={profile.links} />
      <footer className="text-xs tracking-wide text-ink/40">🌳 링크나무</footer>
    </main>
  );
}
