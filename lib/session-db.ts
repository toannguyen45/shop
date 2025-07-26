// lib/session-db.ts
import prisma from "@/db/prisma";
import { getSession } from "./session";

export async function createSessionInDb(
  sessionToken: string,
  userId: string,
  expires: Date
) {
  // Delete any existing sessions for this user
  try {
    await prisma.session.deleteMany({
      where: { userId },
    });
  } catch (error) {
    console.log("Failed to delete existing sessions:", error);
  }

  // Create new session in database
  try {
    await prisma.session.create({
      data: {
        sessionToken,
        userId,
        expires,
      },
    });
  } catch (error) {
    console.log("Failed to create session in database:", error);
    throw new Error("Failed to create session");
  }
}

export async function updateSessionInDb(sessionToken: string, expires: Date) {
  try {
    await prisma.session.update({
      where: { sessionToken },
      data: { expires },
    });
    return true;
  } catch (error) {
    console.log("Failed to update session in database:", error);
    return false;
  }
}

export async function deleteSessionFromDb(sessionToken: string) {
  try {
    await prisma.session.deleteMany({
      where: { sessionToken },
    });
  } catch (error) {
    console.log("Failed to delete session from database:", error);
  }
}

export async function getSessionFromDb(sessionToken: string) {
  try {
    return await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });
  } catch (error) {
    console.log("Failed to get session from database:", error);
    return null;
  }
}

export async function getSessionWithUser() {
  const session = await getSession();
  if (!session?.sessionToken) return null;

  const dbSession = await getSessionFromDb(session.sessionToken);
  if (!dbSession || dbSession.expires < new Date()) {
    return null;
  }

  return {
    session,
    user: dbSession.user,
  };
}
