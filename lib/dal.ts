import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { getSessionWithUser } from "./session-db";

// Cache session data to avoid repeated DB queries
type CacheEntry = {
  data: {
    isAuth: boolean;
    userId: string;
    user: Record<string, unknown>;
    session: Record<string, unknown>;
  };
  timestamp: number;
};

const sessionCache = new Map<string, CacheEntry>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export const verifySession = cache(async () => {
  const sessionWithUser = await getSessionWithUser();

  if (!sessionWithUser) {
    redirect("/login");
  }

  // Cache the result for this session
  const cacheKey = sessionWithUser.session.sessionToken;
  const cached = sessionCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }

  const result = { 
    isAuth: true, 
    userId: sessionWithUser.user.id,
    user: sessionWithUser.user,
    session: sessionWithUser.session
  };

  // Cache for 5 minutes
  sessionCache.set(cacheKey, {
    data: result,
    timestamp: Date.now()
  });

  return result;
});

// Clean up expired cache entries
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of sessionCache.entries()) {
    if (now - value.timestamp > CACHE_TTL) {
      sessionCache.delete(key);
    }
  }
}, CACHE_TTL);

// Alternative: Lightweight session check (no DB query)
export const verifySessionLight = cache(async () => {
  const { getSession } = await import("./session");
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return { 
    isAuth: true, 
    sessionToken: session.sessionToken,
    session: session
  };
});
