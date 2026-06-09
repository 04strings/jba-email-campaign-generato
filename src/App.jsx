import { useState, useEffect } from "react";

const C = {
  bg: '#0a0a0d',
  surface: '#111116',
  card: '#16161d',
  input: '#1e1e27',
  border: 'rgba(255,255,255,0.07)',
  borderFocus: 'rgba(245,158,11,0.45)',
  accent: '#f59e0b',
  accentSoft: 'rgba(245,158,11,0.1)',
  accentText: '#fbbf24',
  text: '#eeeef2',
  muted: '#6b6b82',
  dim: '#2e2e3e',
  success: '#10b981',
  danger: '#f87171',
};

const FIXED = {
  community: 'https://www.jaymelewis.com/products/communities/v2/community922853/challenges',
  upload: 'https://communities.kajabi.com/community922853/challenges',
  challengeJump: 'https://www.jaymelewis.com/products/monthly-challenges/categories/2154249382',
  reaction: 'https://www.jaymelewis.com/products/monthly-challenges/categories/2154249378',
  meetupRoom: 'https://www.jaymelewis.com/products/communities/v2/community922853/live',
};

const FREEBIES = [
  { name: 'Top 50', url: 'https://s3.amazonaws.com/kajabi-storefronts-production/file-uploads/sites/2147954607/downloads/481f6d6-572-11fa-edde-12a14db2844_Jayme_s_Favorite_Basslines_Licks.pdf' },
  { name: 'Practice Toolkit', url: 'https://www.jaymelewis.com/jaymes-free-practice-toolkit' },
  { name: 'Arpeggio Playbook', url: 'https://www.jaymelewis.com/arpeggio-playbook' },
  { name: 'Bassics 101', url: 'https://www.jaymelewis.com/thebassics101' },
  { name: 'Reading Cheat Sheet', url: 'https://s3.amazonaws.com/kajabi-storefronts-production/file-uploads/sites/2147954607/downloads/7cdde6-62c1-032-0428-bcdf45a5b5_Sheet_Happens.pdf' },
  { name: 'Fretboard Fast-Track', url: 'https://www.jaymelewis.com/jayme-s-free-fretboard-fast-track' },
  { name: '30 Free Lessons', url: 'https://www.jaymelewis.com/blog' },
  { name: 'Tone Guide', url: 'https://s3.amazonaws.com/kajabi-storefronts-production/file-uploads/sites/2147954607/themes/2160539597/downloads/505386c-fca-461-c3c3-4ad0c80f1ba_Jayme_s_Tone_Guide.pdf' },
  { name: 'Must-Have Bass Gear', url: 'https://www.jaymelewis.com/blog/jayme-s-gear-recommendations' },
  { name: 'Ear Training', url: 'https://s3.amazonaws.com/kajabi-storefronts-production/file-uploads/sites/2147954607/downloads/6070226-a675-fb7-8fd-e2556fba3b8_Jayme_s_Ear_Training_Guide.pdf' },
  { name: 'How to Groove with Drummer', url: 'https://s3.amazonaws.com/kajabi-storefronts-production/file-uploads/sites/2147954607/downloads/c670a01-245-60b-38c-bb088c2e8151_Listen_to_your_Drummer.pdf' },
];

const HISTORY_KEY = 'jba-email-campaign-history-v1';
const HISTORY_LIMIT = 60;

const SECTIONS = [
  {
    id: 'challenge', label: 'Monthly Challenge', icon: '🏆',
    fields: [
      { id: 'challengeType',  label: 'Challenge Type',               type: 'select', options: ['STUDIO', 'TECHNICAL'] },
      { id: 'challengeTopic', label: 'Quick Description of Challenge', ph: 'e.g. Walking Bass Lines' },
      { id: 'lessonLocation', label: 'Lesson Location / Course Name', ph: 'e.g. Groove Fundamentals', wide: true },
      { id: 'courseLink',     label: 'Link to Lesson from Challenge', ph: 'https://app.kajabi.com/...', wide: true },
      { id: 'challengeStart', label: 'Challenge Start Date',         type: 'date' },
      { id: 'challengeEnd',   label: 'Challenge End Date',           type: 'date' },
      { id: 'tip1', label: 'Beginner Tip',     ph: 'e.g. Focus on keeping a steady tempo first', wide: true },
      { id: 'tip2', label: 'Intermediate Tip', ph: 'e.g. Add some walking between roots', wide: true },
      { id: 'tip3', label: 'Advanced Tip',     ph: 'e.g. Try adding chromatic approach notes', wide: true },
    ],
  },
  {
    id: 'lesson', label: 'New Lesson', icon: '📚',
    fields: [
      { id: 'lessonTopic', label: 'New Lesson Description', ph: 'e.g. Slap Bass Fundamentals', wide: true },
      { id: 'lessonLink',  label: 'New Lesson URL',      ph: 'https://www.jaymelewis.com/...', wide: true },
    ],
  },
  {
    id: 'freebie', label: 'Freebie', icon: '🎁',
    fields: [
      { id: 'freebieTopic', label: 'Freebie Name or Description', ph: 'e.g. Practice Toolkit', wide: true },
      { id: 'freebieLink',  label: 'Freebie URL',          ph: 'https://www.jaymelewis.com/...', wide: true },
    ],
  },
  {
    id: 'meetup', label: 'Meetup', icon: '📅',
    fields: [
      { id: 'meetupDate', label: 'Next Meetup Date', type: 'date' },
      { id: 'meetupTime', label: 'Meetup Time (PT)',    ph: 'e.g. 2:00 PM' },
    ],
  },
  {
    id: 'history', label: 'History', icon: '🕘',
    fields: [],
  },
];

const ALL_FIELDS = SECTIONS.filter(s => s.id !== 'history').flatMap(s => s.fields);
const AI_STEPS = [
  { id: 'challenge_email', label: 'Challenge Email', emoji: '🏆' },
  { id: 'lesson_email',    label: 'New Lesson Email', emoji: '📚' },
  { id: 'freebie_email',   label: 'Freebie Email', emoji: '🎁' },
  { id: 'kajabi_body',     label: 'Kajabi Library Body', emoji: '📋' },
  { id: 'ann_challenge',   label: 'New Challenge Announcement', emoji: '🎉' },
  { id: 'ann_meetup',      label: 'Live Meetup Announcement', emoji: '👥' },
  { id: 'ann_lesson',      label: 'New Lesson Announcement', emoji: '🎸' },
  { id: 'ann_reaction',    label: 'Reaction Video Announcement', emoji: '🎥' },
];

const mono = { fontFamily: "'DM Mono', monospace" };
const sans = { fontFamily: "'Syne', sans-serif" };

const inputStyle = {
  width: '100%', padding: '10px 14px',
  background: C.input, border: `1px solid ${C.border}`,
  borderRadius: 8, color: C.text, fontSize: 13,
  outline: 'none', boxSizing: 'border-box', ...sans,
};

const labelStyle = {
  display: 'block', fontSize: 10, fontWeight: 500,
  color: C.muted, marginBottom: 5,
  textTransform: 'uppercase', letterSpacing: '0.08em', ...mono,
};

const pillStyle = (active) => ({
  padding: '7px 14px', borderRadius: 8, cursor: 'pointer',
  border: `1px solid ${active ? C.accent : C.border}`,
  background: active ? C.accentSoft : 'transparent',
  color: active ? C.accentText : C.muted,
  fontSize: 13, fontWeight: 500, ...sans,
  transition: 'all 0.15s',
});


const cleanText = (value) => String(value || '').trim();

function loadHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(HISTORY_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeHistory(nextHistory) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(nextHistory));
}

function makeHistoryEntry(form = {}, outputs = []) {
  const now = new Date();
  return {
    id: `${now.toISOString()}-${Math.random().toString(36).slice(2, 8)}`,
    exportedAt: now.toISOString(),
    challengeType: cleanText(form.challengeType),
    challengeTopic: cleanText(form.challengeTopic),
    challengeStart: cleanText(form.challengeStart),
    challengeEnd: cleanText(form.challengeEnd),
    lessonLocation: cleanText(form.lessonLocation),
    courseLink: cleanText(form.courseLink),
    lessonTopic: cleanText(form.lessonTopic),
    lessonLink: cleanText(form.lessonLink),
    freebieTopic: cleanText(form.freebieTopic),
    freebieLink: cleanText(form.freebieLink),
    meetupDate: cleanText(form.meetupDate),
    meetupTime: cleanText(form.meetupTime),
    outputCount: Array.isArray(outputs) ? outputs.length : 0,
  };
}

function formatDate(value) {
  if (!value) return '—';
  const d = new Date(`${value}T00:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTime(value) {
  if (!value) return '—';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString(undefined, { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

function FreebieLibrary({ form, setForm }) {
  const choose = (freebie) => {
    setForm(prev => ({ ...prev, freebieTopic: freebie.name, freebieLink: freebie.url }));
  };

  const selectedValue = FREEBIES.find(f => f.name === form.freebieTopic && f.url === form.freebieLink)?.name || '';

  return (
    <div style={{ gridColumn: 'span 2', background: C.card, border: `1px solid ${C.border}`, borderRadius: 12, padding: 14 }}>
      <label style={labelStyle}>Choose from saved freebies</label>
      <select
        value={selectedValue}
        onChange={e => {
          const freebie = FREEBIES.find(item => item.name === e.target.value);
          if (freebie) choose(freebie);
        }}
        style={{ ...inputStyle, cursor: 'pointer', marginBottom: 12 }}
        onFocus={e => e.target.style.borderColor = C.borderFocus}
        onBlur={e => e.target.style.borderColor = C.border}
      >
        <option value="">Pick a freebie...</option>
        {FREEBIES.map(freebie => <option key={freebie.name} value={freebie.name}>{freebie.name}</option>)}
      </select>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: 8 }}>
        {FREEBIES.map(freebie => {
          const active = form.freebieTopic === freebie.name && form.freebieLink === freebie.url;
          return (
            <button key={freebie.name} type="button" onClick={() => choose(freebie)} style={{
              textAlign: 'left', padding: '9px 10px', borderRadius: 8, cursor: 'pointer',
              border: `1px solid ${active ? C.accent : C.border}`,
              background: active ? C.accentSoft : C.surface,
              color: active ? C.accentText : C.text,
              fontSize: 12, fontWeight: 600, ...sans,
            }}>
              {freebie.name}
              <div style={{ marginTop: 3, color: C.muted, fontSize: 10, fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {freebie.url}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function HistorySection({ history, onDeleteHistory, onClearHistory, onUseHistoryEntry }) {
  return (
    <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, padding: 22, marginBottom: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ color: C.text, fontSize: 18, margin: '0 0 6px' }}>Previous Export History</h2>
          <p style={{ color: C.muted, fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            Every CSV download is saved here so you can see the last challenge, lesson, freebie, and meetup before scheduling the next month.
          </p>
        </div>
        {history.length > 0 && (
          <button type="button" onClick={onClearHistory} style={{
            padding: '8px 12px', borderRadius: 8, border: `1px solid ${C.border}`,
            background: 'transparent', color: C.danger, fontSize: 12, cursor: 'pointer', ...sans,
          }}>
            Clear History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div style={{ padding: 18, background: C.card, border: `1px dashed ${C.border}`, borderRadius: 10, color: C.muted, fontSize: 13, lineHeight: 1.7 }}>
          No exports saved yet. Generate a campaign and click “Download CSV + Save History” to start tracking what you used.
        </div>
      ) : (
        <div style={{ display: 'grid', gap: 10 }}>
          {history.map((entry, index) => (
            <div key={entry.id} style={{ background: C.card, border: `1px solid ${index === 0 ? C.accent : C.border}`, borderRadius: 12, padding: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                <div>
                  <div style={{ ...mono, fontSize: 10, color: index === 0 ? C.accentText : C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {index === 0 ? 'Most recent export' : 'Saved export'} · {formatDateTime(entry.exportedAt)}
                  </div>
                  <div style={{ color: C.text, fontSize: 14, fontWeight: 700, marginTop: 4 }}>
                    {entry.challengeType || 'Challenge'}: {entry.challengeTopic || '—'}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" onClick={() => onUseHistoryEntry(entry)} style={{
                    padding: '7px 11px', borderRadius: 8, border: `1px solid ${C.border}`,
                    background: C.surface, color: C.text, fontSize: 12, cursor: 'pointer', ...sans,
                  }}>
                    Load Into Form
                  </button>
                  <button type="button" onClick={() => onDeleteHistory(entry.id)} style={{
                    padding: '7px 11px', borderRadius: 8, border: `1px solid ${C.border}`,
                    background: 'transparent', color: C.muted, fontSize: 12, cursor: 'pointer', ...sans,
                  }}>
                    Delete
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8, fontSize: 12, lineHeight: 1.55 }}>
                <div style={{ padding: 10, borderRadius: 8, background: C.surface }}>
                  <div style={labelStyle}>Challenge</div>
                  <div style={{ color: C.text }}>{entry.challengeType || '—'} · {entry.challengeTopic || '—'}</div>
                  <div style={{ color: C.muted, fontSize: 11 }}>{formatDate(entry.challengeStart)} → {formatDate(entry.challengeEnd)}</div>
                </div>
                <div style={{ padding: 10, borderRadius: 8, background: C.surface }}>
                  <div style={labelStyle}>Lesson</div>
                  <div style={{ color: C.text }}>{entry.lessonTopic || entry.lessonLocation || '—'}</div>
                  <div style={{ color: C.muted, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.lessonLink || entry.courseLink || '—'}</div>
                </div>
                <div style={{ padding: 10, borderRadius: 8, background: C.surface }}>
                  <div style={labelStyle}>Freebie</div>
                  <div style={{ color: C.text }}>{entry.freebieTopic || '—'}</div>
                  <div style={{ color: C.muted, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.freebieLink || '—'}</div>
                </div>
                <div style={{ padding: 10, borderRadius: 8, background: C.surface }}>
                  <div style={labelStyle}>Meetup</div>
                  <div style={{ color: C.text }}>{formatDate(entry.meetupDate)}</div>
                  <div style={{ color: C.muted, fontSize: 11 }}>{entry.meetupTime || '—'} PT</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FormStep({ form, setForm, onGenerate, history, onDeleteHistory, onClearHistory, onUseHistoryEntry }) {
  const [activeSection, setActiveSection] = useState('challenge');
  const [errMsg, setErrMsg] = useState('');
  const sIdx = SECTIONS.findIndex(s => s.id === activeSection);

  const update = (id, val) => setForm(prev => ({ ...prev, [id]: val }));

  const handleGenerate = () => {
    const missing = ALL_FIELDS.filter(f => !form[f.id]?.trim());
    if (missing.length) {
      setErrMsg(`Fill in: ${missing.slice(0, 3).map(f => f.label).join(', ')}${missing.length > 3 ? ` +${missing.length - 3} more` : ''}`);
      return;
    }
    setErrMsg('');
    onGenerate();
  };

  const section = SECTIONS[sIdx];

  return (
    <div style={{ background: C.bg, minHeight: '100vh', padding: '32px 24px', ...sans }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.accent }} />
          <span style={{ ...mono, fontSize: 10, color: C.accent, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Jayme's Bass Academy
          </span>
        </div>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: C.text, margin: 0, lineHeight: 1.2 }}>
          Email Campaign Generator
        </h1>
        <p style={{ color: C.muted, fontSize: 13, marginTop: 6 }}>
          Fill in your info below — get 8 ready-to-use emails & Kajabi announcements.
        </p>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setActiveSection(s.id)} style={pillStyle(s.id === activeSection)}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>

      {section.id === 'history' ? (
        <HistorySection
          history={history}
          onDeleteHistory={onDeleteHistory}
          onClearHistory={onClearHistory}
          onUseHistoryEntry={(entry) => {
            onUseHistoryEntry(entry);
            setActiveSection('challenge');
          }}
        />
      ) : (
        <div style={{ background: C.surface, borderRadius: 14, border: `1px solid ${C.border}`, padding: 22, marginBottom: 20 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {section.id === 'freebie' && <FreebieLibrary form={form} setForm={setForm} />}
            {section.fields.map(f => (
              <div key={f.id} style={{ gridColumn: f.wide ? 'span 2' : 'span 1' }}>
                <label style={labelStyle}>{f.label}</label>
                {f.type === 'select' ? (
                  <select
                    value={form[f.id] || ''}
                    onChange={e => update(f.id, e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={e => e.target.style.borderColor = C.borderFocus}
                    onBlur={e => e.target.style.borderColor = C.border}
                  >
                    <option value="" disabled>Select one...</option>
                    {f.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                ) : (
                  f.type === 'date' ? (
                    <input
                      type="date"
                      value={form[f.id] || ''}
                      onChange={e => update(f.id, e.target.value)}
                      style={{
                        ...inputStyle,
                        cursor: 'pointer',
                        colorScheme: 'dark',
                      }}
                      onFocus={e => e.target.style.borderColor = C.borderFocus}
                      onBlur={e => e.target.style.borderColor = C.border}
                    />
                  ) : (
                  <input
                    type="text"
                    value={form[f.id] || ''}
                    onChange={e => update(f.id, e.target.value)}
                    placeholder={f.ph}
                    style={{ ...inputStyle }}
                    onFocus={e => e.target.style.borderColor = C.borderFocus}
                    onBlur={e => e.target.style.borderColor = C.border}
                  />
                  )
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {sIdx > 0 && (
            <button onClick={() => setActiveSection(SECTIONS[sIdx - 1].id)}
              style={{ padding: '10px 16px', borderRadius: 8, border: `1px solid ${C.border}`, background: 'transparent', color: C.muted, fontSize: 13, cursor: 'pointer', ...sans }}>
              ← Back
            </button>
          )}
          {sIdx < SECTIONS.length - 1 && (
            <button onClick={() => setActiveSection(SECTIONS[sIdx + 1].id)}
              style={{ padding: '10px 18px', borderRadius: 8, border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: 13, cursor: 'pointer', ...sans }}>
              Next: {SECTIONS[sIdx + 1].icon} {SECTIONS[sIdx + 1].label} →
            </button>
          )}
        </div>

        {section.id !== 'history' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {errMsg && <span style={{ fontSize: 12, color: C.danger }}>{errMsg}</span>}
            <button onClick={handleGenerate}
              style={{ padding: '11px 22px', borderRadius: 8, border: 'none', background: C.accent, color: '#000', fontSize: 13, fontWeight: 700, cursor: 'pointer', ...sans }}>
              ⚡ Generate All 8 Outputs
            </button>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 7, marginTop: 28 }}>
        {SECTIONS.map(s => (
          <div key={s.id} onClick={() => setActiveSection(s.id)} style={{
            width: s.id === activeSection ? 20 : 6, height: 6, borderRadius: 3,
            background: s.id === activeSection ? C.accent : C.dim,
            cursor: 'pointer', transition: 'all 0.25s',
          }} />
        ))}
      </div>
    </div>
  );
}

function ProgressStep({ progress, progressMsg }) {
  const pct = Math.round((progress / AI_STEPS.length) * 100);
  return (
    <div style={{ background: C.bg, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, ...sans }}>
      <div style={{ maxWidth: 460, width: '100%', textAlign: 'center' }}>
        <div style={{
          width: 58, height: 58, borderRadius: '50%',
          background: C.accentSoft, border: `2px solid ${C.accent}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, margin: '0 auto 24px',
        }}>⚡</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 8 }}>
          Writing your emails...
        </h2>
        <p style={{ color: C.muted, fontSize: 14, marginBottom: 28, minHeight: 20 }}>{progressMsg}</p>
        <div style={{ height: 3, background: C.border, borderRadius: 2, marginBottom: 28, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: C.accent, borderRadius: 2, transition: 'width 0.6s ease' }} />
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 20 }}>
          {AI_STEPS.map((s, i) => (
            <div key={s.id} style={{
              padding: '6px 14px', borderRadius: 20, fontSize: 11, ...mono,
              border: `1px solid ${i < progress ? C.success : i === progress ? C.accent : C.border}`,
              color: i < progress ? C.success : i === progress ? C.accentText : C.muted,
              background: i === progress ? C.accentSoft : 'transparent',
              fontWeight: i === progress ? 500 : 400,
            }}>
              {i < progress ? '✓ ' : ''}{s.emoji} {s.label}
            </div>
          ))}
        </div>
        <p style={{ color: C.dim, fontSize: 11, ...mono }}>One secure OpenAI API call for all 8 outputs...</p>
      </div>
    </div>
  );
}

function OutputCard({ output, openId, setOpenId, editableOutputs, setEditableOutputs }) {
  const isOpen = openId === output.id;
  const isAI = output.badge === 'AI';
  const ed = editableOutputs[output.id] || { subject: output.subject, body: output.body };
  const [copied, setCopied] = useState({});

  const copy = async (key, text) => {
    await navigator.clipboard.writeText(text);
    setCopied(p => ({ ...p, [key]: true }));
    setTimeout(() => setCopied(p => ({ ...p, [key]: false })), 1800);
  };

  const updateEd = (field, val) =>
    setEditableOutputs(prev => ({ ...prev, [output.id]: { ...ed, [field]: val } }));

  return (
    <div style={{
      border: `1px solid ${isOpen ? (isAI ? C.accent : 'rgba(255,255,255,0.14)') : C.border}`,
      borderRadius: 12, marginBottom: 8, overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      <div onClick={() => setOpenId(isOpen ? null : output.id)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '13px 18px', cursor: 'pointer',
          background: isOpen ? (isAI ? C.accentSoft : C.surface) : 'transparent',
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 17 }}>{output.emoji}</span>
          <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{output.name}</span>
          <span style={{
            fontSize: 9, padding: '2px 8px', borderRadius: 20, ...mono,
            background: isAI ? C.accentSoft : C.card,
            color: isAI ? C.accentText : C.muted,
            border: `1px solid ${isAI ? 'rgba(245,158,11,0.25)' : C.border}`,
          }}>{output.badge}</span>
        </div>
        <span style={{ color: C.muted, fontSize: 11 }}>{isOpen ? '▲' : '▼'}</span>
      </div>

      {isOpen && (
        <div style={{ borderTop: `1px solid ${C.border}` }}>
          <div style={{ padding: '12px 18px', background: C.surface, borderBottom: `1px solid ${C.border}` }}>
            <label style={labelStyle}>Subject Line</label>
            {output.subjects && output.subjects.length > 1 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
                {output.subjects.map((s, i) => {
                  const isSelected = ed.subject === s;
                  return (
                    <button key={i} onClick={() => updateEd('subject', s)} style={{
                      padding: '5px 11px', borderRadius: 20, fontSize: 11, cursor: 'pointer',
                      border: `1px solid ${isSelected ? C.accent : C.border}`,
                      background: isSelected ? C.accentSoft : 'transparent',
                      color: isSelected ? C.accentText : C.muted,
                      fontFamily: 'inherit', transition: 'all 0.15s',
                    }}>
                      {s}
                    </button>
                  );
                })}
              </div>
            )}
            <input
              value={ed.subject}
              onChange={e => updateEd('subject', e.target.value)}
              style={{ ...inputStyle, fontSize: 13 }}
              onFocus={e => e.target.style.borderColor = C.borderFocus}
              onBlur={e => e.target.style.borderColor = C.border}
            />
          </div>

          <div style={{ padding: '14px 18px', background: C.card }}>
            <label style={labelStyle}>Body (editable)</label>
            <textarea
              value={ed.body}
              onChange={e => updateEd('body', e.target.value)}
              rows={10}
              style={{
                width: '100%', padding: '10px 12px', background: C.input,
                border: `1px solid ${C.border}`, borderRadius: 8,
                color: C.text, fontSize: 12, lineHeight: 1.8,
                outline: 'none', resize: 'vertical', boxSizing: 'border-box', ...mono,
              }}
              onFocus={e => e.target.style.borderColor = C.borderFocus}
              onBlur={e => e.target.style.borderColor = C.border}
            />
          </div>

          <div style={{
            padding: '10px 18px', background: C.surface,
            borderTop: `1px solid ${C.border}`, display: 'flex', gap: 8,
          }}>
            <button onClick={() => copy('body', ed.body)} style={{
              padding: '7px 14px', borderRadius: 7, cursor: 'pointer', fontSize: 12, ...sans,
              border: `1px solid ${copied.body ? C.success : C.border}`,
              background: copied.body ? 'rgba(16,185,129,0.12)' : 'transparent',
              color: copied.body ? C.success : C.text, fontWeight: 500,
            }}>
              {copied.body ? '✓ Copied!' : 'Copy Body'}
            </button>
            <button onClick={() => copy('full', `SUBJECT: ${ed.subject}\n\n${ed.body}`)} style={{
              padding: '7px 14px', borderRadius: 7, cursor: 'pointer', fontSize: 12, ...sans,
              border: `1px solid ${C.border}`, background: 'transparent',
              color: copied.full ? C.success : C.muted,
            }}>
              {copied.full ? '✓ Copied!' : 'Copy Subject + Body'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function OutputsStep({ outputs, form, onReset, onSaveHistory }) {
  const [openId, setOpenId] = useState(null);
  const [editableOutputs, setEditableOutputs] = useState(
    Object.fromEntries(outputs.map(o => [o.id, { subject: o.subject, body: o.body }]))
  );
  const [historySaved, setHistorySaved] = useState(false);

  const saveHistory = () => {
    if (onSaveHistory) onSaveHistory(form, outputs);
    setHistorySaved(true);
  };

  const downloadCSV = () => {
    const rows = [['Type', 'Subject', 'Body']];
    outputs.forEach(o => {
      const ed = editableOutputs[o.id] || {};
      rows.push([o.name, ed.subject || '', ed.body || '']);
    });
    const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jayme-bass-emails.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    saveHistory();
  };

  const emailOutputs = outputs.slice(0, 3);
  const announcementOutputs = outputs.slice(3);

  return (
    <div style={{ background: C.bg, minHeight: '100vh', padding: '28px 24px', ...sans }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 10 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 4 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: C.success }} />
            <span style={{ ...mono, fontSize: 10, color: C.success, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              8 outputs ready
            </span>
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: C.text }}>Your Emails & Announcements</h2>
          <p style={{ color: C.muted, fontSize: 13, marginTop: 4 }}>All editable. Click any card to expand, copy, and paste into Kajabi.</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={downloadCSV} style={{
            padding: '8px 15px', borderRadius: 8, border: `1px solid ${C.border}`,
            background: C.surface, color: C.text, fontSize: 12, cursor: 'pointer', ...sans,
          }}>
            ↓ Download CSV + Save History
          </button>
          <button onClick={saveHistory} style={{
            padding: '8px 15px', borderRadius: 8, border: `1px solid ${historySaved ? C.success : C.border}`,
            background: historySaved ? 'rgba(16,185,129,0.12)' : 'transparent', color: historySaved ? C.success : C.text, fontSize: 12, cursor: 'pointer', ...sans,
          }}>
            {historySaved ? '✓ Saved' : 'Save to History'}
          </button>
          <button onClick={onReset} style={{
            padding: '8px 15px', borderRadius: 8, border: `1px solid ${C.border}`,
            background: 'transparent', color: C.muted, fontSize: 12, cursor: 'pointer', ...sans,
          }}>
            Edit & Regenerate
          </button>
        </div>
      </div>

      <div style={{
        padding: '12px 16px', background: C.surface, border: `1px solid ${C.border}`,
        borderRadius: 10, marginBottom: 22, fontSize: 12, lineHeight: 1.7, color: C.muted,
      }}>
        <span style={{ color: C.text, fontWeight: 600 }}>Getting into Kajabi: </span>
        <span style={{ color: C.accentText }}>Emails</span> → Marketing → Emails → Broadcasts → Create Broadcast → paste Subject + Body. &nbsp;
        <span style={{ color: C.accentText }}>Announcements</span> → paste into Community posts or Library lesson pages. &nbsp;
        Want full automation? Ask me to build a <span style={{ color: C.accentText }}>Google Apps Script</span> that pushes to Kajabi via API.
      </div>

      <div style={{
        ...mono, fontSize: 10, color: C.muted, letterSpacing: '0.09em',
        textTransform: 'uppercase', marginBottom: 10, paddingBottom: 8,
        borderBottom: `1px solid ${C.border}`,
      }}>
        ⚡ AI-Generated Emails — send to subscribers
      </div>
      {emailOutputs.map(o => (
        <OutputCard key={o.id} output={o} openId={openId} setOpenId={setOpenId}
          editableOutputs={editableOutputs} setEditableOutputs={setEditableOutputs} />
      ))}

      <div style={{
        ...mono, fontSize: 10, color: C.muted, letterSpacing: '0.09em',
        textTransform: 'uppercase', margin: '22px 0 10px', paddingBottom: 8,
        borderBottom: `1px solid ${C.border}`,
      }}>
        ⚡ AI-Generated Announcements & Posts
      </div>
      {announcementOutputs.map(o => (
        <OutputCard key={o.id} output={o} openId={openId} setOpenId={setOpenId}
          editableOutputs={editableOutputs} setEditableOutputs={setEditableOutputs} />
      ))}
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const [outputs, setOutputs] = useState([]);
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const id = 'jba-fonts';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const persistHistory = (nextHistory) => {
    setHistory(nextHistory);
    writeHistory(nextHistory);
  };

  const handleSaveHistory = (currentForm, currentOutputs) => {
    const entry = makeHistoryEntry(currentForm, currentOutputs);
    const next = [entry, ...history].slice(0, HISTORY_LIMIT);
    persistHistory(next);
  };

  const handleDeleteHistory = (id) => {
    persistHistory(history.filter(entry => entry.id !== id));
  };

  const handleClearHistory = () => {
    persistHistory([]);
  };

  const handleUseHistoryEntry = (entry) => {
    setForm(prev => ({
      ...prev,
      challengeType: entry.challengeType || '',
      challengeTopic: entry.challengeTopic || '',
      challengeStart: entry.challengeStart || '',
      challengeEnd: entry.challengeEnd || '',
      lessonLocation: entry.lessonLocation || '',
      courseLink: entry.courseLink || '',
      lessonTopic: entry.lessonTopic || '',
      lessonLink: entry.lessonLink || '',
      freebieTopic: entry.freebieTopic || '',
      freebieLink: entry.freebieLink || '',
      meetupDate: entry.meetupDate || '',
      meetupTime: entry.meetupTime || '',
    }));
  };

  const handleGenerate = async () => {
    setStep(2);
    setProgress(1);
    setProgressMsg('Writing all 8 outputs with one secure OpenAI API call...');

    const makeErrorOutputs = (message = 'Could not generate. Check your connection and try again.') =>
      AI_STEPS.map(task => ({
        id: task.id,
        name: task.label,
        emoji: task.emoji,
        badge: 'AI',
        subject: 'Generation error',
        subjects: ['Generation error'],
        body: message,
      }));

    try {
      const resp = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form }),
      });

      const data = await resp.json().catch(() => ({}));

      if (!resp.ok) {
        throw new Error(data?.error || `Generation request failed with status ${resp.status}`);
      }

      if (!Array.isArray(data.outputs) || data.outputs.length === 0) {
        throw new Error('The API returned no outputs.');
      }

      setProgress(AI_STEPS.length);
      setProgressMsg('Done!');
      setOutputs(data.outputs);
      setStep(3);
    } catch (err) {
      console.error(err);
      setProgress(AI_STEPS.length);
      setProgressMsg('Could not generate outputs.');
      setOutputs(makeErrorOutputs(err?.message || undefined));
      setStep(3);
    }
  };

  if (step === 1) return <FormStep form={form} setForm={setForm} onGenerate={handleGenerate} history={history} onDeleteHistory={handleDeleteHistory} onClearHistory={handleClearHistory} onUseHistoryEntry={handleUseHistoryEntry} />;
  if (step === 2) return <ProgressStep progress={progress} progressMsg={progressMsg} />;
  return <OutputsStep outputs={outputs} form={form} onSaveHistory={handleSaveHistory} onReset={() => { setStep(1); setOutputs([]); }} />;
}
