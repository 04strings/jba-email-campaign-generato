# JBA Email Campaign Generator

Static Vercel-safe version of the Jayme's Bass Academy email/announcement generator.

This version removes the React/Vite front-end build step to avoid blank-screen deployment issues. The browser app is in `index.html`, and the OpenAI call still runs securely through `api/generate.js` using the `OPENAI_API_KEY` Vercel environment variable.

## Features

- Generates all 8 emails/announcements in one server-side API call.
- Keeps the OpenAI API key private in Vercel.
- Has MEETUP instead of EVENTS.
- Adds HISTORY after MEETUP.
- Saves prior export history in the browser so you can avoid repeating challenge, lesson, freebie, or meetup info.
- Adds a built-in freebie picker with Jayme's main freebies and links.

## Deploy

Upload the contents of this folder to GitHub, replacing the existing files.

Important:
- Delete any old `src` folder if GitHub still has it.
- Delete `package-lock.json` if GitHub still has it.
- Keep `index.html`, `api/generate.js`, `package.json`, `.npmrc`, and `vercel.json`.
- In Vercel, make sure `OPENAI_API_KEY` is set.
- Redeploy without build cache.


Vercel note: this static version builds by copying index.html into dist because the project output directory is dist.
