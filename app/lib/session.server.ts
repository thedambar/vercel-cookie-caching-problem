import { createCookieSessionStorage } from '@remix-run/node';

// Simple cookie-based session storage implementation.

type SessionData = {
  data: string;
};

type SessionFlashData = {
  error: string;
};

const sessionSecret = 'secret';

const {getSession, commitSession, destroySession} =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      // CookieOptions to create a Cookie
      cookie: {
        name: "__session",

        // all of these are optional
        maxAge: 60 * 60 * 24 * 7, // One week cookies by default
        path: "/", 
        sameSite: "lax",
        secrets: [sessionSecret],
        secure: true,
      },
    }
  );

export {getSession, commitSession, destroySession};