# Fig Jam Charcuterie — GHL Build Guide

**For:** Mark Holland
**Target:** Build the Fig Jam Charcuterie automation stack inside your spare GHL subaccount.
**Companion doc:** `ghl-snapshot-spec.md` (the design — this doc is the build steps).
**Estimated total time:** ~2 hours (heavily AI-assisted where possible).

This guide is written so you can execute it linearly. Don't skip phases — later phases depend on earlier ones.

---

## Phase 0 — Pre-flight (5 min, do this first)

Gather these before you start so you don't have to break flow mid-build:

- [ ] Liz's notification email address (probably `liz@figjamcharcuteriellc.com`)
- [ ] Liz's cell number for SMS notifications (the business line 941-914-0007 OR a personal cell — confirm with her)
- [ ] Twilio number provisioned for the subaccount (if 941-914-0007 isn't already on Twilio, you'll need to port it or use a proxy LC Phone number)
- [ ] Liz's Google Business Profile login (or admin invite to it)
- [ ] Liz's Google Calendar invite for the events sync (one-way push, Liz-side only)
- [ ] Liz's Instagram handle (for email signatures) — assumed `@figjamcharcuterie`, verify
- [ ] Liz's Yelp page URL (if she has one)
- [ ] Liz's Google review link (short URL from her GBP)
- [ ] Site URL (use `https://mhol1961.github.io/figjam-site/` until custom domain ships)

Open a notepad and dump these so you can paste them into Custom Values in Phase 3.

---

## Phase 1 — Account scaffolding (UI-only, ~20 min)

Most of this is unavoidable manual clicking. The AI builder can't create custom fields, tags, or pipelines.

### 1.1 — Rename / configure the subaccount

GHL → Settings → Company → **Business Name** = `Fig Jam Charcuterie LLC`
- Address: Liz's service-area description ("Sarasota, FL")
- Phone: `941-914-0007`
- Timezone: `America/New_York`
- Industry: `Food & Beverage`

### 1.2 — Create custom fields

GHL → Settings → Custom Fields → **+ Add Field** (Object: Contact)

Create each in this exact order:

| Field Name | Internal Key | Type | Options |
|---|---|---|---|
| Event Date | `event_date` | Date | — |
| Event Type | `event_type` | Dropdown (single-select) | Date Night, Birthday Party, Bridal Shower, Baby Shower, Corporate Event, Beach Picnic, Wedding, Game Day, Holiday Party, Other |
| Guest Count | `guest_count` | Numerical | — |
| Board Size Interest | `board_size_interest` | Dropdown (single-select) | Charcuterie Cups, Small Board, Medium Board, Large Board, Cart Service, Grazing Table, Unsure |
| Estimated Value | `estimated_value` | Monetary | USD |
| Deposit Paid | `deposit_paid` | Checkbox | — |
| Event Time | `event_time` | Time | — |
| Event Location | `event_location` | Text (Short) | — |
| Dietary Notes | `dietary_notes` | Text (Long) | — |
| Referral Source | `referral_source` | Dropdown | Website, Instagram, Facebook, Google Search, Google Business Profile, Word of Mouth, Wedding Planner, Venue Referral, Other |
| Lifetime Event Count | `lifetime_event_count` | Numerical | — |
| Last Event Date | `last_event_date` | Date | — |

Verify after: GHL → Contacts → click any contact → Custom Fields tab → all 12 visible.

### 1.3 — Create tags

GHL → Settings → Tags → **+ Add Tag**

Create these (paste names in batch):
```
Website Inquiry
Voice AI Capture
quote-sent
deposit-paid
needs-human
stale-lead
lost-lead
re-engaged
review-received
vip
dietary-vegan
dietary-gf
dietary-df
service-cart
service-board
service-grazing
local-sarasota
local-siesta-key
local-lakewood-ranch
local-lido-key
```

### 1.4 — Create the pipeline

GHL → Opportunities → Pipelines → **+ New Pipeline**

- Name: `Fig Jam — New Inquiries`
- Stages (in order):
  1. **New Inquiry** — close probability 20%
  2. **Quoted** — 50%
  3. **Booked** — 90%
  4. **Event Completed** — 100%
  5. **Won** — 100%
  6. **Lost** — 0%

Save. Verify by going to Opportunities → all 6 stage columns visible.

---

## Phase 2 — Integrations (~25 min)

### 2.1 — Twilio / LC Phone

GHL → Settings → Phone Numbers → **+ Add Number**
- If 941-914-0007 is already on Twilio: port via support ticket (24-72h)
- If not: provision an LC Phone number temporarily, forward 941-914-0007 to it via her current carrier

Verify: Send a test SMS from another phone to the new GHL number → it should appear in Conversations.

### 2.2 — Google Business Profile

GHL → Settings → Integrations → **Google Business Profile** → Connect
- Sign in with Liz's Google account (or yours if she's added you as a manager)
- Authorize all permissions
- Select "Fig Jam Charcuterie LLC" listing

Verify: GHL → Reputation → Google reviews tab shows her existing reviews (if any).

### 2.3 — Google Calendar (one-way push)

GHL → Settings → Integrations → **Google Calendar** → Connect
- Sign in with Liz's Google account
- Authorize Calendar API
- Select her primary calendar

Verify: GHL → Calendars → Settings → Sync should show "Connected".

### 2.4 — Email sender authentication (CRITICAL — this is what fixed Liz's broken Wix form)

GHL → Settings → Email Services → **Verify Domain**
- Domain: `figjamcharcuteriellc.com` (or `mhol1961.github.io` temporarily if no custom domain yet)
- Add the SPF, DKIM, and Return-Path DNS records GHL provides into the domain's DNS

Without this, outbound emails from Liz's GHL workflows will land in spam — and inbound replies may bounce. This is non-optional.

---

## Phase 3 — Custom Values (~5 min)

GHL → Settings → Custom Values → **+ Add Value**

Create these (use exact keys — workflow templates reference them):

| Key | Value |
|---|---|
| `owner_email` | Liz's notification email |
| `owner_cell` | Liz's cell number with country code: `+19419140007` format |
| `business_phone` | `941-914-0007` |
| `site_url` | `https://mhol1961.github.io/figjam-site/` (swap to custom domain when ready) |
| `google_review_link` | Liz's GBP review short link |
| `yelp_review_link` | Liz's Yelp page URL |
| `instagram_handle` | `@figjamcharcuterie` |
| `webhook_secret` | Random 32-char string (paste from `openssl rand -hex 16`) |

---

## Phase 4 — Workflows (AI-built, ~40 min)

GHL has a Workflow AI builder accessible from Automation → Workflows → **+ Create Workflow** → **AI Workflow Builder** (or "Generate with AI" button depending on version).

For each workflow below, paste the entire prompt block into the AI builder. It will generate a draft. **Then verify** each action box has the correct trigger, custom value reference, and timing. Tweak if needed and save.

⚠️ **Heads up:** The AI builder is good but not perfect. It will get the structure 90% right. You'll need to manually:
- Verify trigger source (especially webhook triggers)
- Confirm template variables resolve correctly (paste `{{contact.first_name}}` style)
- Confirm wait timings (it may default to hours instead of days)

### Workflow 1: Website Inquiry Intake (CRITICAL — Liz's broken-form fix)

**Builder prompt (paste this entire block):**

```
Create a workflow named "WF-01 Website Inquiry Intake".

TRIGGER: Inbound Webhook. Name the webhook trigger "fig-jam-website-form".
Expected JSON payload fields: name, phone, email, event_date, event_type,
guest_count, board_size_interest, message, source, submitted_at.

ACTION 1: Create/Update Contact.
- Match on email; fallback to phone.
- Map: name → First Name + Last Name (split on space), phone → Phone,
  email → Email, event_date → custom field "Event Date",
  event_type → custom field "Event Type",
  guest_count → custom field "Guest Count",
  board_size_interest → custom field "Board Size Interest",
  message → contact note.

ACTION 2: Math Operation. Calculate "estimated_value" custom field:
- If board_size_interest = "Charcuterie Cups": guest_count × 12, minimum 120
- If "Small Board": 50
- If "Medium Board": 125
- If "Large Board": 175
- If "Cart Service": 300 + (guest_count × 20)
- If "Grazing Table": guest_count × 25
- If "Unsure" or empty: guest_count × 15, minimum 50

ACTION 3: Add Tag "Website Inquiry" to contact.

ACTION 4: Create Opportunity in pipeline "Fig Jam — New Inquiries":
- Stage: "New Inquiry"
- Name: "{{contact.first_name}} {{contact.last_name}} – {{contact.event_type}} {{contact.event_date}}"
- Monetary value: {{contact.estimated_value}}
- Expected close date: {{contact.event_date}}

ACTION 5: Send Internal Email to {{custom_values.owner_email}}:
Subject: "🎉 New inquiry: {{contact.event_type}} for {{contact.guest_count}} on {{contact.event_date}}"
Body: Full inquiry details (name, phone, email, event type, date, guest count, board interest, estimated value, their message), plus note that auto-reply was sent.

ACTION 6: Send Internal SMS to {{custom_values.owner_cell}}:
"🎉 NEW INQUIRY: {{contact.first_name}} {{contact.last_name}}. {{contact.event_type}} on {{contact.event_date}}. {{contact.guest_count}} guests. Est ${{contact.estimated_value}}. 📞 {{contact.phone}}. Auto-reply sent."

ACTION 7: Send Email to {{contact.email}} (auto-reply to lead):
Subject: "Got your inquiry, {{contact.first_name}} — we'll be in touch within 24 hours"
Body: Warm thank-you, what to expect next, links to /menu and /gallery,
urgency note for <48hr events (call 941-914-0007), signed by Elizabeth Kent.

ACTION 8: Send SMS to {{contact.phone}} (auto-reply to lead):
"Hi {{contact.first_name}}! Liz here from Fig Jam Charcuterie — got your inquiry, will reply within 24hr. For urgent (<48hr) events, call 941-914-0007. 🧀✨"
```

**Verification after AI builds:**
1. Click the webhook trigger → copy the **Webhook URL**. This is what we need to paste into the site's `.env.local` file (see Phase 8).
2. Confirm pipeline reference points to "Fig Jam — New Inquiries" (not a default).
3. Confirm both Custom Value references (`owner_email`, `owner_cell`) are wrapped correctly.
4. Save and **publish** the workflow.

---

### Workflow 2: Quoted Nurture Sequence

**Builder prompt:**

```
Create a workflow named "WF-04 Quoted Nurture Sequence".

TRIGGER: Opportunity stage changed to "Quoted" in pipeline "Fig Jam — New Inquiries".

ACTION 1: Wait 3 days.
ACTION 2: If/Else — check if opportunity stage is still "Quoted". If not, exit workflow.
ACTION 3: Send Email to {{contact.email}}:
Subject: "Quick check-in on your {{contact.event_type}} quote"
Body: Friendly check-in mentioning common questions (dietary accommodations, Siesta Key beach delivery, custom theming), invite reply or call 941-914-0007.

ACTION 4: Wait 5 days (total 8 days from quote).
ACTION 5: If/Else — still in "Quoted"? If not, exit.
ACTION 6: Send SMS to {{contact.phone}}:
"Hey {{contact.first_name}}, Liz from Fig Jam 👋 Just bumping our quote up to the top — any thoughts? Happy to tweak anything to fit your vision."

ACTION 7: Wait 6 days (total 14 days).
ACTION 8: If/Else — still in "Quoted"? If not, exit.
ACTION 9: Send Email to {{contact.email}}:
Subject: "Still planning your {{contact.event_type}}, {{contact.first_name}}?"
Body: Soft last-touch asking "yes still on" or "plans changed", mention Sarasota event season fills up.

ACTION 10: Add Tag "stale-lead".

ACTION 11: Send Internal SMS to {{custom_values.owner_cell}}:
"{{contact.first_name}} hasn't responded after 3 nurture touches. Marking stale."
```

**Verification:** Confirm all 3 If/Else branches correctly exit the workflow (not just skip to next action). Confirm wait timings are in days, not hours.

---

### Workflow 3: Booking Confirmation

**Builder prompt:**

```
Create a workflow named "WF-05 Booking Confirmation".

TRIGGER (use ANY of these — OR logic):
- Opportunity stage changed to "Booked" in "Fig Jam — New Inquiries" pipeline
- Tag "deposit-paid" added to contact

ACTION 1: Send Email to {{contact.email}}:
Subject: "🎉 You're booked! Your {{contact.event_type}} on {{contact.event_date}} is locked in"
Body: Event recap (date, type, guests, board), what to expect on the day, deposit confirmation, contact info, signed by Liz.

ACTION 2: Send SMS to {{contact.phone}}:
"🎉 You're officially booked for {{contact.event_date}}! Confirmation email with all the details on its way. Can't wait to make your {{contact.event_type}} amazing. — Liz"

ACTION 3: Send Internal SMS to {{custom_values.owner_cell}}:
"✅ {{contact.first_name}} confirmed for {{contact.event_type}} on {{contact.event_date}} — {{contact.guest_count}} guests"

ACTION 4: Create Calendar Event on calendar "Fig Jam Events":
- Title: "{{contact.event_type}} — {{contact.first_name}} {{contact.last_name}}"
- Date: {{contact.event_date}}
- Time: {{contact.event_time}} (if blank, all-day)
- Notes: Guest count, board size, dietary notes, message.

ACTION 5: Schedule Email (send 48 hours before {{contact.event_date}}):
Subject: "Two days until your {{contact.event_type}}!"
Body: Confirm details, request final headcount, weather plan for outdoor events.

ACTION 6: Schedule SMS (send 5pm the day before {{contact.event_date}}):
"Hi {{contact.first_name}}! Confirming we're all set for tomorrow's {{contact.event_type}} at {{contact.event_time}}. {{contact.guest_count}} guests, {{contact.board_size_interest}}. Anything change? Text or call. — Liz"
```

---

### Workflow 4: Event Completion + Review Request

**Builder prompt:**

```
Create a workflow named "WF-06 Event Completion + Review Request".

TRIGGER: Date-based — when {{contact.event_date}} passes AND opportunity stage = "Booked" in "Fig Jam — New Inquiries" pipeline.

ACTION 1: Move opportunity to stage "Event Completed".

ACTION 2: Wait 3 days.

ACTION 3: Send SMS to {{contact.phone}}:
"Hi {{contact.first_name}}! Hope your {{contact.event_type}} was everything you hoped 💛 If we made it special, a quick review means the world to a small business like ours:
⭐ Google: {{custom_values.google_review_link}}
⭐ Yelp: {{custom_values.yelp_review_link}}
Thank you! — Liz"

ACTION 4: Wait 4 days.

ACTION 5: If/Else — does contact have tag "review-received"? If yes, exit.

ACTION 6: Send Email to {{contact.email}}:
Subject: "Did we make your {{contact.event_type}} special?"
Body: Soft follow-up with Google + Yelp links + Instagram tag invitation.

ACTION 7: Wait until 7 days after {{contact.event_date}}.

ACTION 8: Move opportunity to stage "Won".
```

---

### Workflow 5: Lost Lead Re-Engagement

**Builder prompt:**

```
Create a workflow named "WF-08 Lost Lead Re-Engagement".

TRIGGER (use ANY — OR logic):
- Tag "lost-lead" added to contact
- Opportunity moved to "Lost" stage in "Fig Jam — New Inquiries" pipeline

ACTION 1: Wait 90 days.

ACTION 2: Send Email to {{contact.email}}:
Subject: "Any new events on your calendar, {{contact.first_name}}?"
Body: Friendly check-in, mention 2-3 recent event types Liz served (weddings, corporate, beach picnics), soft CTA back to {{custom_values.site_url}}.

ACTION 3: If/Else — did contact reply OR click email link within 14 days?
  - YES: Remove "lost-lead" tag, add "re-engaged" tag, SMS {{custom_values.owner_cell}}: "{{contact.first_name}} re-engaged from lost-lead drip — check inbox"
  - NO: Repeat from ACTION 1 (loop)
```

---

## Phase 5 — Conversation AI (~15 min)

GHL → AI Employee → Conversation AI → **+ Create Bot** (or Settings depending on version).

### 5.1 — Bot configuration

- Name: `Fig Jam Lead Assistant`
- Voice/Personality: `Warm, professional, slightly playful`
- Channels enabled: SMS, Email, Web Chat
- Operating mode: `Auto-reply with human escalation`
- Escalation keywords: `cancel, refund, complaint, wrong, upset, angry, disappointed, sue, lawyer, lawsuit, bbb`
- Confidence threshold for escalation: `70%`

### 5.2 — System prompt (paste this exactly)

```
You are Liz's AI assistant for Fig Jam Charcuterie LLC, a Sarasota,
Florida-based artisan charcuterie business specializing in custom
boards and mobile charcuterie cart catering for events.

VOICE: Warm, friendly, slightly playful. Liz is a small business
owner who treats every client like a friend. You sound like a
helpful friend who happens to know everything about charcuterie.
Never corporate, never stiff. Use light emoji sparingly (🧀 ✨ 💛).

WHAT YOU CAN DO:
- Answer pricing questions
- Confirm service area (Sarasota, Siesta Key, Lakewood Ranch, Lido Key)
- Explain lead times
- Describe dietary accommodations
- Book a 15-minute quote call on the "Liz - Quote Calls" calendar
- Send pricing info and links
- Capture event details for a custom quote

WHAT YOU CANNOT DO (escalate to Liz instead):
- Negotiate custom pricing for unusual events
- Process refunds or cancellations
- Resolve complaints
- Make binding commitments on dates without checking with Liz first
- Discuss legal/contractual matters

If a customer mentions cancel, refund, complaint, or sounds upset:
STOP responding and tag the contact with "needs-human", then send
Liz an SMS notification.

PRICING (memorize these):
- Charcuterie Cups: $12 each, minimum 10 cups
- Small Board: $50 (feeds 2-3)
- Medium Board: $125 (feeds 6-8)
- Large Board: $175 (feeds 8-10)
- Charcuterie Cart Service: $300 base for 2 hours + $15-25 per
  guest depending on menu, 15-guest minimum
- Custom Grazing Tables: starts ~$25 per guest

SERVICE AREA: Sarasota, Siesta Key, Lakewood Ranch, Lido Key.
Outside these areas: ask, may charge travel.

LEAD TIME: 48 hours minimum for boards. 7+ days for parties
of 25+ or cart service. Same-day usually not possible.

DIETARY: Yes, we accommodate vegan, gluten-free, dairy-free.
Just mention dietary needs when booking so Liz can prep the
right ingredients.

DELIVERY: We deliver throughout the service area. Beach setups
need an extra 30 min for setup. Indoor events we typically
arrive 30 min before guest arrival.

PAYMENT: [Liz to confirm deposit policy — until then, say
"Liz will share payment details when you book."]

If you don't know something, say "Let me check with Liz on
that and get back to you" — DO NOT make up answers.

For every conversation, your goal is to either (a) answer
clearly and book a quote call, or (b) escalate to Liz quickly.
```

### 5.3 — Knowledge base documents

Upload three text files to the bot's knowledge base:

1. **FAQ doc** — paste the contents of `/faq` page from the site
2. **Menu doc** — paste the contents of `/menu` page (board sizes, ingredients)
3. **Cart service doc** — paste the contents of `/cart-service` page

### 5.4 — Booking calendar link

Connect the bot to calendar `Liz - Quote Calls` (you'll create this in Phase 7). When the bot needs to book a call, it should send the calendar link inline.

### 5.5 — Test

Send a test SMS to the GHL business number:
- "How much for 20 people?" → expect cart-service pricing breakdown
- "Do you do gluten-free?" → expect yes + invite to specify at booking
- "I want to cancel my order" → expect NO auto-reply, internal SMS to Liz

---

## Phase 6 — Voice AI (~10 min)

GHL → AI Employee → Voice AI → **+ Create Voice Agent**

### 6.1 — Configuration

- Name: `Fig Jam Phone Assistant`
- Phone number: 941-914-0007
- Pickup trigger: Missed call (no answer after 4 rings, ~20 sec)
- Voice: Choose a warm female voice (recommend: "Bella" or "Aria" — preview a few)
- Max call duration: 5 minutes
- Recording: ON (will save audio + transcript to contact)

### 6.2 — Business hours greeting (paste)

```
Hi! You've reached Fig Jam Charcuterie. Liz is probably elbow-deep
in cheese right now — I'm her AI assistant. I can take your event
details and have her call you back within a few hours. What's
your name?
```

### 6.3 — Off-hours greeting (paste)

```
Hi! You've reached Fig Jam Charcuterie. Liz is off the clock right
now, but I can grab your event details so she can call you back
first thing in the morning. What's your name?
```

(Set business hours: Mon-Sat 9am-6pm ET, Sunday closed.)

### 6.4 — Capture script (paste)

```
After getting their name:

1. "Nice to meet you, [name]! Are you reaching out about an upcoming
   event, or something else?"

2. If event: "Got it! What kind of event — like a wedding, shower,
   corporate thing, beach picnic?"

3. "And do you have a date in mind?"

4. "About how many guests are you planning for?"

5. "Were you thinking one of our charcuterie boards, the full
   mobile cart experience, or are you still figuring it out?"

6. "Perfect. What's the best number for Liz to call you back on?
   I'll also note your name and these details so she has
   everything when she reaches out."

7. Confirm details back: "Just to confirm: [recap]. Sound right?"

8. "Awesome. Liz will give you a call back within a few hours
   during business hours, or first thing in the morning if it's
   late. Talk soon!"

If they ask urgent pricing questions, give the same pricing as
the SMS bot. If they're upset, complaining, or asking about
refunds/cancellations — say "I'll have Liz call you back right
away" and DO NOT try to handle it.
```

### 6.5 — Post-call actions

- Create contact (if new)
- Add tag `Voice AI Capture`
- Create opportunity in `Fig Jam — New Inquiries` → New Inquiry stage
- Email Liz the transcript + audio
- SMS Liz: `📞 Voice AI captured a call from {{contact.first_name}} — {{contact.event_type}} on {{contact.event_date}}, {{contact.guest_count}} guests. Transcript in your email.`

### 6.6 — Test

Call 941-914-0007 from a different phone. Let it ring out. Verify:
- Voice AI picks up with correct greeting
- Captures all details and confirms back
- Liz receives the transcript email + summary SMS
- Contact + opportunity appear in GHL

---

## Phase 7 — Calendar setup (~5 min)

### 7.1 — Liz - Quote Calls

GHL → Calendars → **+ New Calendar**
- Name: `Liz - Quote Calls`
- Type: 1-on-1
- Owner: Liz (add her as a user first if not already)
- Duration: 15 min
- Buffer: 15 min before/after
- Availability: Mon-Fri 10am-2pm ET, Sat 11am-1pm ET (no Sundays)
- Confirmation: Auto-email + SMS reminder 1hr before
- Booking page slug: `quote-call`

### 7.2 — Fig Jam Events

GHL → Calendars → **+ New Calendar**
- Name: `Fig Jam Events`
- Type: Internal (no public booking)
- Owner: Liz
- Synced to Liz's Google Calendar (Phase 2.3)
- Populated by: WF-05 (booking confirmation workflow)

---

## Phase 8 — Connect the site to GHL (~3 min)

You only need to do this AFTER Workflow 1 is built (Phase 4.1).

1. Go to Workflow 1 → click the webhook trigger → copy the **Webhook URL**.

2. In the figjam-site repo, create `.env.local` (it's gitignored):
   ```
   NEXT_PUBLIC_GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/...
   ```

3. For the GitHub Pages deploy, also add this as a repo secret:
   - GitHub → repo Settings → Secrets and variables → Actions → New repository secret
   - Name: `NEXT_PUBLIC_GHL_WEBHOOK_URL`
   - Value: (paste URL)
   - Then update `.github/workflows/deploy.yml` to inject it at build time (I'll do this in the deploy.yml edit in the next code pass).

4. Re-deploy. Form submissions now hit GHL.

---

## Phase 9 — End-to-end test (~15 min)

Once everything is in place, run this checklist:

### Test 1 — Webhook intake (most important — this is Liz's pain point fix)
```bash
curl -X POST <WEBHOOK_URL> \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Lead",
    "phone": "5555555555",
    "email": "test@example.com",
    "event_date": "2026-08-15",
    "event_type": "Bridal Shower",
    "guest_count": 12,
    "board_size_interest": "Large Board",
    "message": "Testing the form integration",
    "source": "manual test",
    "submitted_at": "2026-05-15T10:00:00Z"
  }'
```

Expected:
- [ ] Contact "Test Lead" created with all custom fields populated
- [ ] Opportunity in "New Inquiries" pipeline, value = $175, expected close = 2026-08-15
- [ ] Tag `Website Inquiry` applied
- [ ] Liz receives email with full inquiry details
- [ ] Liz receives SMS notification
- [ ] test@example.com receives auto-reply email
- [ ] 5555555555 receives auto-reply SMS (will fail due to fake number — that's fine)

### Test 2 — Real form submission
- Go to live site `/contact`
- Fill out form with your own info, hit submit
- Should see success message
- Repeat checks above

### Test 3 — Conversation AI
- Text the GHL business number from your phone:
  - "How much for 20 people?" → expect pricing breakdown
  - "I want to cancel my order" → expect NO bot reply, Liz gets SMS

### Test 4 — Voice AI
- Call 941-914-0007 from your phone, let it ring out
- Voice AI picks up
- Run through capture script
- Verify transcript email + Liz SMS notification

### Test 5 — Pipeline stage progression
- Manually advance test opportunity through Quoted → Booked → Event Completed
- Verify each workflow fires (you may need to fake `event_date` to be in the past to trigger WF-06)

---

## Phase 10 — Hand off to Liz (~10 min)

1. Install GHL mobile app on Liz's phone (App Store / Play Store: "LeadConnector")
2. Create her user account, give her access to:
   - Conversations (so she sees inbound messages)
   - Opportunities (so she sees her pipeline)
   - Calendars (so she sees booked events)
3. Hide everything else from her view (no Workflows, no Settings) — keep it simple
4. Send her a 10-min Loom walking through:
   - "Here's where new inquiries show up"
   - "Here's how to message a lead back"
   - "Here's your event calendar"
   - "If anything's confusing, text me"

She does NOT need to know about workflows, AI configuration, or any of the backend. That's your $49.99/mo.

---

## Troubleshooting

**Webhook returns 200 but no contact created**
→ Check Workflow 1 is published (not just saved). Check trigger payload field names match.

**Liz's notification email lands in spam**
→ Phase 2.4 wasn't completed properly. Verify SPF/DKIM/Return-Path DNS records.

**Conversation AI replies with weird off-brand answers**
→ Knowledge base docs may have ingested with formatting issues. Re-upload as plain text.

**Voice AI hangs up immediately**
→ Twilio number may not be configured for voice. Check Phone Numbers settings.

**Form submission fails with CORS error**
→ GHL inbound webhooks allow all origins by default. If you see CORS errors, the issue is the URL is wrong, not CORS.

---

## After this is done

Once GHL is live and Liz can see inquiries flowing in, the next phases of the site build:
- Phase B: Above-the-fold rewrite (hero copy + pricing-at-a-glance strip)
- Phase C: Full SEO/GEO/AEO buildout (sitemap, robots, schema, llms.txt, metadata)

Both can ship without further GHL involvement.
