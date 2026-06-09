# JBA Email Campaign Generator

React + Vercel version of the Jayme's Bass Academy email/announcement generator.

This version makes **one server-side OpenAI API call** for all 8 outputs. The API key is kept out of the browser and out of GitHub by using a Vercel environment variable.

## What this app does

- Generates all 8 emails/announcements in one request.
- Keeps the OpenAI API key private in Vercel.
- Lets you edit each result in the browser.
- Lets you copy individual outputs or download the CSV.
- Adds a Meetup section in the top nav instead of Events.
- Adds a History section that saves previous CSV exports in the browser so you can avoid repeating the same challenge, lesson, freebie, or meetup month-to-month.
- Adds a built-in freebie picker with Jayme's main freebies and links.

## Deploy to Vercel

1. Unzip this folder.
2. Create a new GitHub repo and upload the contents of this folder.
3. In Vercel, click **Add New → Project**.
4. Import the GitHub repo.
5. In Vercel, go to **Project → Settings → Environment Variables**.
6. Add this variable:

```txt
OPENAI_API_KEY=your_openai_api_key_here
```

7. Optional: add this if you want to control the model without editing code:

```txt
OPENAI_MODEL=gpt-4.1
```

8. Redeploy the project.

## Local development

Install dependencies:

```bash
npm install
```

For frontend-only preview:

```bash
npm run dev
```

For the `/api/generate` route locally, use Vercel's local dev server:

```bash
npm i -g vercel
vercel dev
```

Create a local `.env` file first:

```txt
OPENAI_API_KEY=your_openai_api_key_here
```

## Important

Do **not** commit `.env` or your actual OpenAI API key to GitHub.
