import { NextResponse } from "next/server";
import { getClickCounts, incrementClick, validLinkIds } from "@/lib/clicks";

// 링크 클릭 1회 기록. sendBeacon 은 text/plain 으로 보내므로 본문을 직접 파싱합니다.
export async function POST(request: Request) {
  let linkId: unknown;
  try {
    linkId = JSON.parse(await request.text()).linkId;
  } catch {
    return NextResponse.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  if (typeof linkId !== "string" || !validLinkIds.has(linkId)) {
    return NextResponse.json({ error: "존재하지 않는 링크입니다." }, { status: 400 });
  }

  try {
    await incrementClick(linkId);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}

export async function GET() {
  try {
    return NextResponse.json(await getClickCounts());
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}
