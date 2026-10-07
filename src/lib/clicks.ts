import { getDb } from "@/lib/mongodb";
import { profile } from "@/data/profile";

type ClickDoc = {
  _id: string;
  count: number;
  updatedAt: Date;
};

export type ClickCounts = Record<string, number>;

export const validLinkIds = new Set(profile.links.map((link) => link.id));

async function getClicksCollection() {
  const db = await getDb();
  return db.collection<ClickDoc>("clicks");
}

export async function incrementClick(linkId: string) {
  const clicks = await getClicksCollection();
  await clicks.updateOne(
    { _id: linkId },
    { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
    { upsert: true },
  );
}

// 링크별 클릭 수: { "github": 3, "blog": 0, ... }
export async function getClickCounts(): Promise<ClickCounts> {
  const clicks = await getClicksCollection();
  const docs = await clicks.find({ _id: { $in: [...validLinkIds] } }).toArray();
  const counts: ClickCounts = Object.fromEntries(profile.links.map((link) => [link.id, 0]));
  for (const doc of docs) counts[doc._id] = doc.count;
  return counts;
}
