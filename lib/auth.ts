import { getSessionFromDb } from "@/lib/session-db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await getSession();
  if (!session?.sessionToken) {
    redirect("/login");
  }

  const dbSession = await getSessionFromDb(session.sessionToken);
  if (!dbSession || dbSession.expires < new Date()) {
    redirect("/login");
  }
  if (!dbSession.user || dbSession.user.role !== "admin") {
    redirect("/unauthorized");
  }

  return dbSession.user;
}
