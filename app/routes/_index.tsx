import { useFetcher, useLoaderData } from "@remix-run/react";
import { HeadersFunction, json, LoaderFunction } from "@remix-run/node";
import { getSession } from "~/lib/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const data = session.get("data") || "No data set";
  return json({ data });
};

export default function Index() {
  const fetcher = useFetcher();
  const {data} = useLoaderData<typeof loader>();

  return (
    <div>
      <fetcher.Form action="/api/setcookie" method="post">
        <label htmlFor="cookieData">Cookie Data:</label>
        <input type="text" id="cookieData" name="cookieData" />
        <button type="submit">Set Cookie</button>
      </fetcher.Form>

      <div>
        <strong>Cookie Data: {`${data}`}</strong>
      </div>
    </div>
  );
}


export const headers: HeadersFunction = () => {
  return {
    "Cache-Control": "no-store, max-age=0"
  };
};