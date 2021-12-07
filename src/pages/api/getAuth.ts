import { NextApiRequest, NextApiResponse } from "next";
import Snoowrap, { Listing, Comment, Submission } from "snoowrap";

type PostFetchedT = {
  data?: Submission;
  icon_img?: string;
  comments?: Comment[];
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const basicAuth = Buffer.from(`${process.env.APP_ONLY_ID}:`).toString(
    "base64"
  );

  const resp = await fetch("https://www.reddit.com/api/v1/access_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `grant_type=https://oauth.reddit.com/grants/installed_client&device_id=DO_NOT_TRACK_THIS_DEVICE`
  });

  const json = await resp.json();

  res.send(json);

  res.end();
};

// void Snoowrap.fromApplicationOnlyAuth({
//     userAgent: 'My app',
//     clientId: 'Tmkg5W551ffqPxozPiiY-Q',
//     deviceId: 'DO_NOT_TRACK_THIS_DEVICE',
//     grantType: 'https://oauth.reddit.com/grants/installed_client',
// }).then(r => {
//     // Now we have a requester that can access reddit through a "user-less" Auth token
//     return r.getHot().then(posts => {
//         // do something with posts from the front page
//     });
// });
