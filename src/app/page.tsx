import { connection } from "next/server";
import ProfileHeader from "@/components/ProfileHeader";
import LinkList from "@/components/LinkList";
import { profile } from "@/data/profile";
import { getClickCounts, type ClickCounts } from "@/lib/clicks";

export default async function Home() {
  // 빌드 시점에 고정되지 않도록 요청마다 렌더링해 최신 클릭 수를 보여줍니다.
  await connection();

  // DB 연결에 실패해도 페이지는 보여야 하므로, 이때는 클릭 수만 숨깁니다.
  let counts: ClickCounts | undefined;
  try {
    counts = await getClickCounts();
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
  }

  return (
    <main className="mx-auto flex w-full max-w-md flex-col items-center gap-10 px-4 py-12 sm:py-16">
      <ProfileHeader name={profile.name} bio={profile.bio} image={profile.image} />
      <LinkList links={profile.links} counts={counts} />
      <footer className="text-xs text-gray-500">🌳 링크나무</footer>
    </main>
  );
}
