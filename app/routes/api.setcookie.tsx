// routes/api.privacy.tsx
import { json } from '@remix-run/node';
import { getSession, commitSession } from '~/lib/session.server';

export async function action({ request }: { request: Request }) {
  const formData = await request.formData();

  const cookieData = formData.get('cookieData')?.toString() || '';
 

  try {
    // Get the current session
    const session = await getSession(request.headers.get('Cookie'));
    //console.log("Session Before Update:", session.get('privacySettings'));


    // Update the session with new privacy settings
    session.set('data',cookieData);
    // Commit the session and return a response
    const setCookieHeader = await commitSession(session);
    return json({ ok: true }, {
      headers: {
        'Set-Cookie': setCookieHeader,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export function headers() {
  return {
    "Cache-Control": "no-store, max-age=0",
    "Accept-Encoding": "br, gzip",
  };
}
