import "server-only";

import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import prisma from "@/db/prisma";

export type SessionPayload = {
  sessionToken: string;
  expires?: Date;
};

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(
  session: string | undefined = ""
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.log("Failed to verify session:", error);
    return null;
  }
}

export async function createSession(userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const sessionToken = crypto.randomUUID();

  // Delete any existing sessions for this user (optional - for single session per user)
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
        expires: expiresAt,
      },
    });
  } catch (error) {
    console.log("Failed to create session in database:", error);
    throw new Error("Failed to create session");
  }

  // Create JWT session with sessionToken
  const session = await encrypt({ sessionToken, expires: expiresAt });
  const cookieStore = await cookies();
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function updateSession(): Promise<boolean> {
  const currentSession = await getSession();

  if (!currentSession) {
    return false;
  }

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  // Update session in database
  try {
    await prisma.session.update({
      where: { sessionToken: currentSession.sessionToken },
      data: { expires: expiresAt },
    });
  } catch (error) {
    console.log("Failed to update session in database:", error);
    return false;
  }

  // Create new JWT session
  const newSession = await encrypt({
    sessionToken: currentSession.sessionToken,
    expires: expiresAt,
  });
  const cookieStore = await cookies();
  cookieStore.set("session", newSession, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });

  return true;
}

export async function deleteSession(): Promise<void> {
  const currentSession = await getSession();

  // Delete from database
  if (currentSession) {
    try {
      await prisma.session.delete({
        where: { sessionToken: currentSession.sessionToken },
      });
    } catch (error) {
      console.log("Failed to delete session from database:", error);
    }
  }

  // Delete cookie
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getSession(): Promise<SessionPayload | null> {
  const session = (await cookies()).get("session")?.value;
  if (!session) return null;

  return await decrypt(session);
}

export async function getSessionWithUser() {
  const session = await getSession();
  if (!session) return null;

  try {
    const dbSession = await prisma.session.findUnique({
      where: { sessionToken: session.sessionToken },
      include: { user: true },
    });

    if (!dbSession || dbSession.expires < new Date()) {
      // Session expired or not found, delete it
      await deleteSession();
      return null;
    }

    return {
      session: session,
      user: dbSession.user,
    };
  } catch (error) {
    console.log("Failed to get session with user:", error);
    return null;
  }
}
