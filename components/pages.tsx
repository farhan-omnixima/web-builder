import { validateRequest } from "@/lib/auth";
import db from "@/lib/db";
import Image from "next/image";
import { redirect } from "next/navigation";
import PageCard from "./page-card";

export default async function Pages({
  siteId,
  limit,
}: {
  siteId?: string;
  limit?: number;
}) {
  const {user, session} = await validateRequest();
  if (!session || !user) {
    redirect("/login");
  }

  const pages = await db.query.posts.findMany({ //TODO: Change table name to pages
    where: (posts, { and, eq }) =>
      and(
        eq(posts.userId, user.id),
        siteId ? eq(posts.siteId, siteId) : undefined,
      ),
    with: {
      site: true,
    },
    orderBy: (posts, { desc }) => desc(posts.updatedAt),
    ...(limit ? { limit } : {}),
  });

  return pages.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {pages.map((page) => (
        <PageCard key={page.id} data={page} />
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center space-x-4">
      <h1 className="font-cal text-4xl">No Pages Yet</h1>
      <Image
        alt="missing page"
        src="https://illustrations.popsy.co/gray/graphic-design.svg"
        width={400}
        height={400}
      />
      <p className="text-lg text-stone-500">
        You do not have any pages yet. Create one to get started.
      </p>
    </div>
  );
}
