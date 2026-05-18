const FIXED = {
  community: 'https://www.jaymelewis.com/products/communities/v2/community922853/challenges',
  upload: 'https://communities.kajabi.com/community922853/challenges',
  challengeJump: 'https://www.jaymelewis.com/products/monthly-challenges/categories/2154249382',
  reaction: 'https://www.jaymelewis.com/products/monthly-challenges/categories/2154249378',
  meetupRoom: 'https://www.jaymelewis.com/products/communities/v2/community922853/live',
};

const OUTPUT_META = [
  { id: 'challenge_email', name: 'Challenge Email', emoji: '🏆' },
  { id: 'lesson_email', name: 'New Lesson Email', emoji: '📚' },
  { id: 'freebie_email', name: 'Freebie Email', emoji: '🎁' },
  { id: 'kajabi_body', name: 'Kajabi Library Body', emoji: '📋' },
  { id: 'ann_challenge', name: 'Announcement: New Challenge', emoji: '🎉' },
  { id: 'ann_meetup', name: 'Announcement: Live Meetup', emoji: '👥' },
  { id: 'ann_lesson', name: 'Announcement: New Lesson', emoji: '🎸' },
  { id: 'ann_reaction', name: 'Announcement: New Reaction Video', emoji: '🎥' },
];

function text(value) {
  return String(value || '').trim();
}

function buildAiTasks(form = {}) {
  const f = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, text(value)]));

  return [
    {
      id: 'challenge_email', name: 'Challenge Email', emoji: '🏆', badge: 'AI',
      subject: `🎸 ${f.challengeType}: ${f.challengeTopic}`,
      prompt: `You are writing a monthly challenge email for Jayme Lewis, a bass guitar teacher. Match the style, tone, length, and structure of this example EXACTLY — same casual warmth, same "y'all" energy, same 3-tier tip format, same community CTA at the end. Do NOT copy the example word-for-word; write fresh copy for the new challenge details below.

STYLE EXAMPLE (match this):
---
Hey y'all! Hope you're having a great week. I've got something super fun lined up for you—this month's Technical Challenge!
We're diving into a really cool diminished lick from my Bass Bootcamp course. It's a great way to stretch your fingers and your brain, and I think you're going to love it.
If you're just starting out, try staying in one position—no need to worry about shifting just yet!
Intermediate players, challenge yourself by shifting up by half steps and see how fast you can get it.
And for my advanced folks, turn off the built-in click and use the audio file with the 2 & 4 click for an extra twist!
Once you've had a go, upload your best take to the Community. I'll be checking them all out at the end of the month and sharing some feedback.
---

NEW CHALLENGE DETAILS:
Challenge Type: ${f.challengeType}
Challenge Topic: ${f.challengeTopic}
Challenge runs: ${f.challengeStart} to ${f.challengeEnd}
Lesson link: ${f.courseLink}
Beginner tip: ${f.tip1}
Intermediate tip: ${f.tip2}
Advanced tip: ${f.tip3}
Community upload link: ${FIXED.upload}

Rules:
- DO NOT mention the course name/location
- Include [insert image here] and [insert lesson link here] as literal placeholders
- Sign off as Jayme (no last name needed)
- Match the example's length (~150–200 words)
- Return 4 real subject line strings with emojis; no placeholder text. First entry is primary.`,
    },
    {
      id: 'lesson_email', name: 'New Lesson Email', emoji: '📚', badge: 'AI',
      subject: '🎸 Hot Lesson Now Live in The Library!',
      prompt: `You are writing a new lesson announcement email for Jayme Lewis, a bass guitar teacher. Match the style, tone, and brevity of this example EXACTLY — short, punchy, enthusiastic, bass-community feel.

STYLE EXAMPLE (match this):
---
Hey bass fam! 🎸
A brand new lesson just dropped in The Library - Go check it out and level up your playing! Dive in here: [LINK]
---

NEW LESSON DETAILS:
Topic: ${f.lessonTopic}
Lesson link: ${f.lessonLink}

Rules:
- Keep it short and punchy like the example — don't over-explain
- Start with "Hey bass fam! 🎸" or a close variation
- Include the lesson link naturally
- Sign off as Jayme
- No podcasts, no webinars
- ~60–100 words total
- Return 4 real subject line strings with emojis. First entry is primary.`,
    },
    {
      id: 'freebie_email', name: 'Freebie Email', emoji: '🎁', badge: 'AI',
      subject: `🔥 Have You Seen My ${f.freebieTopic} Freebie?`,
      prompt: `You are writing a freebie promotion email for Jayme Lewis, a bass guitar teacher. Match the style, tone, structure, and sign-off of this example EXACTLY.

STYLE EXAMPLE (match this):
---
Hey {{first_name}},
Quick question—have you grabbed my freebie yet? If not, you're in for a treat! I put this together to make things way less intimidating and way more fun for you.

🎸 Snag your copy here: [LINK]

Whether you're just starting to explore or want to spice up your playing, this free resource is packed with tips and tricks to help you out. Dive in, experiment, and let your creativity flow!

If you have any questions or want to share your progress, just hit reply—I love hearing from you.

Catch you on the fretboard,
Jayme

P.S. Already checked it out? Awesome! Tell me what you think and if you want more goodies like this. Let's keep the music rolling!
---

NEW FREEBIE DETAILS:
Freebie name/topic: ${f.freebieTopic}
Freebie link: ${f.freebieLink}

Rules:
- Use {{first_name}} salutation
- Keep "Catch you on the fretboard, Jayme" sign-off
- Keep P.S. format
- ~130–170 words
- Return 4 real subject line strings with emojis. First entry is primary.`,
    },
    {
      id: 'kajabi_body', name: 'Kajabi Library Body', emoji: '📋', badge: 'AI',
      subject: '(paste into Kajabi lesson/post body)',
      prompt: `Write a short Kajabi lesson page body for Jayme Lewis announcing this month's challenge. Match this exact style and structure:

STYLE EXAMPLE:
---
This month's Studio Challenge is Walking Bass Lines from my Bass Bootcamp course. Have fun and let me know if you have any questions or need any help!

1. [LESSON LINK] CLICK HERE to download the files & watch the lesson

2. Check-in often at the Community and upload your progress, ask questions or seek motivation and accountability!

3. Near the end of the month, when you're happy with your performance, UPLOAD YOUR VIDEO HERE.

>>> Need help with ???
---

DETAILS:
Challenge Type: ${f.challengeType}
Challenge Topic: ${f.challengeTopic}
Course: ${f.lessonLocation}
Lesson Link: ${f.courseLink}
Community Link: ${FIXED.community}
Upload Link: ${FIXED.upload}

Rules: Keep numbered list structure, use actual URLs, keep ">>> Need help with ???" at end, ~80 words.`,
    },
    {
      id: 'ann_challenge', name: 'Announcement: New Challenge', emoji: '🎉', badge: 'AI',
      subject: '💪 New Community Challenge Added!',
      prompt: `Write a short community announcement for Jayme Lewis for the new monthly challenge. Match this style exactly:

STYLE EXAMPLE:
---
Hey @everyone! This month's Technical Challenge is Walking Bass Lines from Bass Bootcamp course. The challenge has officially begun—jump in and join us!

Challenge details & files: https://www.jaymelewis.com/products/monthly-challenges/categories/2154249382

Let's get grooving!
---

DETAILS:
Challenge Type: ${f.challengeType}
Challenge Topic: ${f.challengeTopic}
Course: ${f.lessonLocation}
Link: ${FIXED.challengeJump}

Rules: Match exact 3-part structure, under 50 words, end with "Let's get grooving!" Return 4 real subject line strings with emojis. First entry is primary.`,
    },
    {
      id: 'ann_meetup', name: 'Announcement: Live Meetup', emoji: '👥', badge: 'AI',
      subject: '📅 Mark Your Calendars - New Live Meetup!',
      prompt: `Write a short community announcement for Jayme Lewis for the next live meetup. Match this style exactly:

STYLE EXAMPLE:
---
Excited to announce our next member meetup @everyone! Join us on Sunday March 2nd, at 2:00 PM PT. Don't miss out—save your spot here: https://www.jaymelewis.com/products/communities/v2/community922853/live. See you there!
---

DETAILS:
Date: ${f.meetupDate}
Time: ${f.meetupTime} PT
Link: ${FIXED.meetupRoom}

Rules: One flowing sentence, include date/time/link, end with "See you there!" Return 4 real subject line strings with emojis. First entry is primary.`,
    },
    {
      id: 'ann_lesson', name: 'Announcement: New Lesson', emoji: '🎸', badge: 'AI',
      subject: '🎸 New Lesson Added!',
      prompt: `Write a short community post for Jayme Lewis announcing a new lesson. Match this style exactly:

STYLE EXAMPLE:
---
Hey @everyone! 🎸

A brand new lesson just dropped in The Library — go check it out and level up your playing!

Dive in here: [LINK]
---

DETAILS:
Topic: ${f.lessonTopic}
Link: ${f.lessonLink}

Rules: 3-line structure, include actual link, under 30 words. Return 4 real subject line strings with emojis. First entry is primary.`,
    },
    {
      id: 'ann_reaction', name: 'Announcement: New Reaction Video', emoji: '🎥', badge: 'AI',
      subject: '🔥 New Reaction Video!',
      prompt: `Write a short community post for Jayme Lewis announcing a new reaction video. Match this style exactly:

STYLE EXAMPLE:
---
Hey @everyone!

I just uploaded a new Reaction video for last month's Challenge, where I watched your submissions and shared my thoughts! Check it out here: https://www.jaymelewis.com/products/monthly-challenges/categories/2154249378
---

DETAILS:
Link: ${FIXED.reaction}

Rules: 2-line structure, include actual link, under 30 words. Return 4 real subject line strings with emojis. First entry is primary.`,
    },
  ];
}

function cleanSubjects(subjects, fallback) {
  const list = Array.isArray(subjects) ? subjects : [subjects];
  const cleaned = list
    .map(s => String(s || '').trim())
    .filter(Boolean)
    .filter(s => {
      const lower = s.toLowerCase();
      return !lower.includes('generate') && !lower.includes('placeholder') && !lower.includes('more creative');
    });

  return cleaned.length ? cleaned : [fallback];
}

function buildMasterPrompt(aiTasks) {
  return `Generate all 8 Jayme's Bass Academy email/community outputs in ONE response.

IMPORTANT:
- You are receiving an array of tasks.
- Follow each task's individual writing instructions exactly.
- Do NOT return separate JSON objects for each task.
- Return ONE valid JSON object only.
- No markdown fences, no commentary, no preamble.
- Every item must include the exact id from the task.
- Every item must include 4 usable subject line options in subjects unless the task is a Kajabi body, where one subject is acceptable.
- Use \\n inside body strings for line breaks.

Return this exact shape:
{
  "outputs": [
    {
      "id": "challenge_email",
      "subjects": ["subject 1", "subject 2", "subject 3", "subject 4"],
      "body": "body text with \\n line breaks"
    }
  ]
}

TASKS:
${JSON.stringify(aiTasks.map(({ id, name, subject, prompt }) => ({ id, name, fallbackSubject: subject, instructions: prompt })), null, 2)}`;
}


function extractOpenAIText(data) {
  if (typeof data?.output_text === 'string') return data.output_text;

  const chunks = [];
  for (const item of data?.output || []) {
    for (const content of item?.content || []) {
      if (typeof content?.text === 'string') chunks.push(content.text);
    }
  }

  return chunks.join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing OPENAI_API_KEY environment variable in Vercel.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const form = body.form || {};
    const aiTasks = buildAiTasks(form);
    const masterPrompt = buildMasterPrompt(aiTasks);

    const openaiResp = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4.1',
        max_output_tokens: 7000,
        instructions: 'You are an expert email copywriter for music educators. Return ONLY valid JSON, no markdown fences, no preamble.',
        input: masterPrompt,
      }),
    });

    const data = await openaiResp.json();

    if (!openaiResp.ok) {
      return res.status(openaiResp.status).json({
        error: data?.error?.message || `OpenAI request failed with status ${openaiResp.status}`,
      });
    }

    const raw = extractOpenAIText(data)
      .replace(/```json|```/g, '')
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      return res.status(502).json({
        error: 'OpenAI returned text that was not valid JSON.',
        raw,
      });
    }

    const outputArray = Array.isArray(parsed.outputs) ? parsed.outputs : [];
    const byId = Object.fromEntries(outputArray.map(item => [item.id, item]));

    const outputs = aiTasks.map(task => {
      const generated = byId[task.id] || {};
      const subjects = cleanSubjects(generated.subjects || generated.subject, task.subject || task.name);
      const meta = OUTPUT_META.find(item => item.id === task.id) || task;

      return {
        id: task.id,
        name: meta.name,
        emoji: meta.emoji,
        badge: 'AI',
        subject: subjects[0] || task.subject || task.name,
        subjects,
        body: generated.body || '',
      };
    });

    return res.status(200).json({ outputs });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err?.message || 'Could not generate outputs.' });
  }
}
