# Fig Jam Charcuterie — GHL Snapshot Specification

**Snapshot Name:** `figjam-charcuterie-v1`
**Version:** 1.0
**Owner:** Mark Holland (IntellaGrow)
**Client:** Elizabeth "Liz" Kent / Fig Jam Charcuterie LLC
**Date drafted:** 2026-05-14
**Target subaccount:** Mark's spare GHL subaccount, repurposed for Fig Jam Charcuterie

---

## 1. Target Use Case

Single-client deployment for a Sarasota-area artisan charcuterie + mobile cart catering business. The owner is non-technical (tried Markate, gave up). **Snapshot must run hands-off after one import.** Mark manages the GHL backend; Liz interacts only with inbound notifications (email/SMS to her phone) and the booked-event pipeline view via the GHL mobile app.

This snapshot doubles as a reusable template for future local food/event vendor clients at the $49.99/mo tier.

---

## 2. Pipelines

### Pipeline: "Fig Jam — New Inquiries"
Single pipeline, 6 stages:

| # | Stage | Trigger to enter | Default close % |
|---|---|---|---|
| 1 | New Inquiry | Form submission OR Voice AI captured lead | 20% |
| 2 | Quoted | Tag `quote-sent` applied | 50% |
| 3 | Booked | Tag `deposit-paid` OR manual move | 90% |
| 4 | Event Completed | Date-based: when `event_date` passes AND stage was Booked | 100% (interim) |
| 5 | Won | Auto-advance from Event Completed after 7 days | 100% |
| 6 | Lost | Manual OR auto after 30 days stale in Quoted | 0% |

---

## 3. Automation Triggers

| Trigger | Fires Workflow |
|---|---|
| Inbound webhook `fig-jam-website-form` receives POST | WF-01: Website Inquiry Intake |
| Conversation channel receives inbound SMS or email | WF-02: Conversation AI Handler |
| Missed call to 941-914-0007 (>4 rings) | WF-03: Voice AI Pickup |
| Opportunity moved to "Quoted" stage | WF-04: Quoted Nurture Sequence |
| Opportunity moved to "Booked" stage | WF-05: Booking Confirmation |
| Date-based: `event_date` passes AND stage = Booked | WF-06: Event Completion + Review Request |
| Opportunity stagnant in "Quoted" for 14+ days | WF-07: Stale Lead Tag |
| Tag `lost-lead` added OR moved to Lost stage | WF-08: Lost Lead Drip (90-day re-engagement) |

---

## 4. Workflows

### WF-01: Website Inquiry Intake **(critical — fixes Liz's broken-form problem)**

**Trigger:** Inbound webhook `fig-jam-website-form`

**Webhook URL:** Generated on import; expose as Custom Value `{{webhook.fig-jam-website-form}}` for the NextJS site to POST to.

**Expected JSON payload from NextJS form:**
```json
{
  "name": "string",
  "phone": "string",
  "email": "string",
  "event_date": "YYYY-MM-DD",
  "event_type": "Date Night | Birthday Party | Bridal Shower | Baby Shower | Corporate Event | Beach Picnic | Wedding | Game Day | Other",
  "guest_count": "number",
  "board_size_interest": "Petite | Classic | Grand | Grazing Table | Cart Service | Unsure",
  "message": "string"
}
```

**Actions (in order):**

1. **Create or update Contact** — match on email; fallback to phone. Map name/email/phone → contact fields; everything else → custom fields.

2. **Calculate `estimated_value`:**
   - Petite: $85
   - Classic: $185
   - Grand: $350
   - Grazing Table: $25 × `guest_count`
   - Cart Service: $300 + ($20 × `guest_count`)
   - Unsure: $25 × `guest_count` (default placeholder)

3. **Add tag** `Website Inquiry`.

4. **Create Opportunity** in "Fig Jam — New Inquiries" pipeline:
   - Stage: New Inquiry
   - Name: `{{contact.first_name}} {{contact.last_name}} – {{event_type}} {{event_date}}`
   - Monetary value: `{{custom_field.estimated_value}}`
   - Expected close date: `{{event_date}}`

5. **Send internal email to Liz** → template `EM-01-OwnerNotify`.

6. **Send internal SMS to Liz** → template `SMS-01-OwnerNotify`.

7. **Send auto-reply email to lead** → template `EM-02-LeadAutoReply`.

8. **Send auto-reply SMS to lead** (if phone provided) → template `SMS-02-LeadAutoReply`.

**Verification after import:** POST a test payload via curl or Postman to the webhook URL. Confirm contact created, opportunity in correct stage, all 4 messages fire.

---

### WF-02: Conversation AI Handler

**Trigger:** Inbound SMS or email reply on any business channel.

**Configuration:**
- GHL Conversation AI module enabled
- Brand voice: warm, professional, slightly playful — "Sarasota's friendly artisan caterer"
- Training documents (upload during setup):
  - Pricing per board size + cart service tiers (mirror site `/menu` content)
  - Service area: Sarasota, Siesta Key, Lakewood Ranch, Lido Key
  - Lead time: 48hr minimum standard, 7+ days for parties of 25+
  - Dietary accommodations: vegan, GF, DF available — must be specified at booking
  - Cart service: $300 base, $15–25/guest, 15-guest min, 2hr standard
  - Deposit policy: TBD with Liz (placeholder text until confirmed)
  - Cancellation policy: TBD with Liz (placeholder)
- AI capabilities enabled: answer FAQ, book quote calls (calendar `Liz - Quote Calls`)
- **Escalation rule:** if AI confidence < 70% OR message contains `cancel | refund | complaint | wrong | upset | angry | disappointed` → tag contact `needs-human`, halt AI, SMS Liz: "AI handed off conversation with {{contact.first_name}} — check inbox now"

**Verification:** Send test SMS "How much for 20 people?" — should respond with cart pricing breakdown. Send "I want to cancel" — should NOT auto-respond; should SMS Liz.

---

### WF-03: Voice AI Pickup

**Trigger:** Inbound call to 941-914-0007 not answered within 4 rings (~20 seconds).

**Configuration:**
- GHL Voice AI module enabled
- Greeting (business hours, Mon–Sat 9am–6pm ET): *"Hi! You've reached Fig Jam Charcuterie. Liz is probably elbow-deep in cheese right now — I'm her AI assistant. I can take your event details and have her call you back within a few hours. What's your name?"*
- Greeting (off-hours): *"Hi! You've reached Fig Jam Charcuterie. Liz is off the clock right now, but I can grab your event details so she can call you back first thing in the morning. What's your name?"*
- Capture (in order): name, phone, email (optional), event_date, event_type, guest_count, message
- Confirm details back to caller before hangup
- Max call duration: 5 min

**Post-call actions:**
- Create contact (if new)
- Add tag `Voice AI Capture`
- Create opportunity in New Inquiry stage with calculated `estimated_value`
- Email Liz the transcript + audio recording
- SMS Liz: *"📞 Voice AI captured a call from {{contact.first_name}} — {{event_type}} on {{event_date}}, {{guest_count}} guests. Transcript in your email."*

**Verification:** Call 941-914-0007 from a test number; let it ring out. Confirm Voice AI picks up, captures details, fires SMS to Liz with transcript.

---

### WF-04: Quoted Nurture Sequence

**Trigger:** Opportunity stage changes to "Quoted".

**Steps:**
1. Wait 3 days
2. Check: still in Quoted? → if not, exit
3. Send `EM-03-Nurture-Touch1`
4. Wait 5 days (total 8 days from quote)
5. Check: still in Quoted? → if not, exit
6. Send `SMS-03-Nurture-Touch2`
7. Wait 6 days (total 14 days)
8. Check: still in Quoted? → if not, exit
9. Send `EM-04-Nurture-Touch3`
10. Add tag `stale-lead`
11. SMS Liz: *"{{contact.first_name}} hasn't responded after 3 nurture touches. Marking stale."*

---

### WF-05: Booking Confirmation

**Trigger:** Opportunity stage changes to "Booked" (or tag `deposit-paid` added).

**Steps:**
1. Send `EM-05-BookingConfirm` to lead
2. Send `SMS-04-BookingConfirm` to lead
3. SMS Liz: *"✅ {{contact.first_name}} confirmed for {{event_type}} on {{event_date}} — {{guest_count}} guests"*
4. Create calendar event on Liz's "Fig Jam Events" calendar for `event_date`
5. Schedule `EM-06-EventReminder` to send 48 hours before `event_date`
6. Schedule `SMS-05-DayBeforeReminder` to send at 5pm the day before `event_date`

---

### WF-06: Event Completion + Review Request

**Trigger:** Date-based — when `event_date` passes AND opportunity stage = "Booked".

**Steps:**
1. Move opportunity to "Event Completed" stage
2. Wait 3 days
3. Send `SMS-06-ReviewRequest` with Google + Yelp links
4. Wait 4 days
5. Check: tag `review-received` present? (manual OR Google Reviews API)
6. If no review → send `EM-07-ReviewFollowup`
7. Wait until 7 days after `event_date` → move opportunity to "Won"

---

### WF-07: Stale Lead Tag
Covered as final step of WF-04. Standalone variant for manually-quoted opportunities not tracked through stage automation.

---

### WF-08: Lost Lead Drip (90-day re-engagement)

**Trigger:** Tag `lost-lead` added OR moved to Lost stage.

**Steps:**
1. Wait 90 days
2. Send `EM-08-Reengagement`
3. If reply or click → remove `lost-lead`, add `re-engaged`, SMS Liz
4. If no engagement → repeat in 90 days

---

## 5. Email Templates

### EM-01-OwnerNotify (to Liz)

**Subject:** `🎉 New inquiry: {{event_type}} for {{guest_count}} on {{event_date}}`

**Body:**
```
You got a new inquiry from your website!

NAME: {{contact.first_name}} {{contact.last_name}}
PHONE: {{contact.phone}}
EMAIL: {{contact.email}}

EVENT DETAILS:
- Type: {{event_type}}
- Date: {{event_date}}
- Guest count: {{guest_count}}
- Board interest: {{board_size_interest}}
- Estimated value: ${{estimated_value}}

THEIR MESSAGE:
{{message}}

---
Their inquiry is already in your "New Inquiries" pipeline. The AI has sent
them an auto-reply confirming you'll be in touch within 24 hours.

Reply to this email to email them back, or tap below to text them:
{{sms_reply_link}}

— Your Fig Jam GHL assistant
```

---

### EM-02-LeadAutoReply (to lead)

**Subject:** `Got your inquiry, {{contact.first_name}} — we'll be in touch within 24 hours`

**Body:**
```
Hi {{contact.first_name}},

Thank you for reaching out to Fig Jam Charcuterie! I got your inquiry about
{{event_type}} on {{event_date}} for {{guest_count}} guests, and I'm
excited to chat.

Here's what happens next:
✓ I'll personally review your event details
✓ I'll respond within 24 hours (often much sooner) with a custom quote
✓ Once we lock in the details, you'll get a confirmation and a simple way
  to secure your date

In the meantime, take a look at our boards and gallery:
👉 {{site_url}}/menu
👉 {{site_url}}/gallery

If your event is in the next 48 hours, please call or text me directly at
941-914-0007 so I can prioritize.

Talk soon!
Elizabeth Kent
Fig Jam Charcuterie LLC
Sarasota · Siesta Key · Lakewood Ranch · Lido Key
```

---

### EM-03-Nurture-Touch1 (3 days after quote)

**Subject:** `Quick check-in on your {{event_type}} quote`

**Body:**
```
Hi {{contact.first_name}},

I sent over a quote for your {{event_type}} on {{event_date}} a few days
ago — just making sure it didn't get lost in your inbox!

Any questions I can answer? A few common ones:
- Yes, we accommodate dietary needs (vegan, GF, DF)
- Yes, we deliver to Siesta Key beaches (need an extra 30 min for setup)
- Yes, we can customize colors/theme for your event

Just hit reply or text me at 941-914-0007.

— Elizabeth
```

---

### EM-04-Nurture-Touch3 (14 days after quote)

**Subject:** `Still planning your {{event_type}}, {{contact.first_name}}?`

**Body:**
```
Hi {{contact.first_name}},

I don't want to be a pest — but I also don't want to assume you've moved
on if you're still planning.

If your {{event_type}} on {{event_date}} is still happening, I'd love to
lock in your date before someone else grabs it. Sarasota event season
fills up fast.

Reply with "yes still on" or "no, plans changed" and I'll either send the
booking link or stop bugging you 😊

Either way, thanks for considering Fig Jam!

— Elizabeth
```

---

### EM-05-BookingConfirm
**Subject:** `🎉 You're booked! Your {{event_type}} on {{event_date}} is locked in`
**Body:** Event recap, what to expect on the day, contact details, deposit confirmation. (Long-form template; finalize after deposit policy decided.)

### EM-06-EventReminder (48hr before)
**Subject:** `Two days until your {{event_type}}!`
**Body:** Confirm event details, request final headcount, weather contingency note for outdoor events.

### EM-07-ReviewFollowup
**Subject:** `Did we make your {{event_type}} special?`
**Body:** Soft review request with Google + Yelp + Instagram tag links.

### EM-08-Reengagement (90 days post-Lost)
**Subject:** `Any new events on your calendar, {{contact.first_name}}?`
**Body:** Friendly check-in mentioning 2–3 recent event types Liz served, soft CTA back to the site.

---

## 6. SMS Templates

### SMS-01-OwnerNotify (to Liz)
```
🎉 NEW INQUIRY
{{contact.first_name}} {{contact.last_name}}
{{event_type}} on {{event_date}}
{{guest_count}} guests • Est ${{estimated_value}}
📞 {{contact.phone}}
Auto-reply sent. Details emailed.
```

### SMS-02-LeadAutoReply (to lead)
```
Hi {{contact.first_name}}! Liz here from Fig Jam Charcuterie — got your
inquiry, will reply within 24hr. For urgent (<48hr) events, call
941-914-0007. 🧀✨
```

### SMS-03-Nurture-Touch2 (8 days after quote)
```
Hey {{contact.first_name}}, Liz from Fig Jam 👋 Just bumping our quote up
to the top — any thoughts? Happy to tweak anything to fit your vision.
```

### SMS-04-BookingConfirm
```
🎉 You're officially booked for {{event_date}}! Confirmation email with
all the details on its way. Can't wait to make your {{event_type}}
amazing. — Liz
```

### SMS-05-DayBeforeReminder (5pm day before)
```
Hi {{contact.first_name}}! Confirming we're all set for tomorrow's
{{event_type}} at {{event_time}}. {{guest_count}} guests,
{{board_size_interest}}. Anything change? Text or call. — Liz
```

### SMS-06-ReviewRequest (3 days post-event)
```
Hi {{contact.first_name}}! Hope your {{event_type}} was everything you
hoped 💛 If we made it special, a quick review means the world to a
small business like ours:

⭐ Google: {{google_review_link}}
⭐ Yelp: {{yelp_review_link}}

Thank you! — Liz
```

---

## 7. Tags

| Tag | Applied when | Used for |
|---|---|---|
| `Website Inquiry` | WF-01 fires | Source attribution |
| `Voice AI Capture` | WF-03 fires | Source attribution |
| `quote-sent` | Manual or workflow when quote emailed | Triggers Quoted stage |
| `deposit-paid` | Manual or future Stripe webhook | Triggers Booked stage |
| `needs-human` | Conversation AI escalation | Liz must reply manually |
| `stale-lead` | WF-04 after 14 days no response | Pause auto-touches |
| `lost-lead` | Manual or 30 days stale | Triggers WF-08 |
| `re-engaged` | Reply to WF-08 | Tracks recovered leads |
| `review-received` | Manual or Google Reviews API | Stops review followup |
| `vip` | Manual (3+ events booked) | Custom treatment, priority |
| `dietary-vegan` / `dietary-gf` / `dietary-df` | Form intake or manual | Ingredient planning segments |
| `service-cart` / `service-board` / `service-grazing` | Form intake | Service-type segmentation |
| `local-sarasota` / `local-siesta-key` / `local-lakewood-ranch` / `local-lido-key` | Form intake or manual | Geo segmentation for offers |

---

## 8. Custom Fields

| Field | Type | Purpose |
|---|---|---|
| `event_date` | Date | Drives WF-06 timing, calendar event creation |
| `event_type` | Single-select | Personalization, segmentation |
| `guest_count` | Number | Drives `estimated_value` |
| `board_size_interest` | Single-select | Drives `estimated_value` |
| `estimated_value` | Currency | Opportunity value, pipeline reporting |
| `deposit_paid` | Boolean | WF-05 trigger |
| `event_time` | Time | EM-06, SMS-05 reminders |
| `event_location` | Text | Internal prep notes |
| `dietary_notes` | Long text | Ingredient planning |
| `referral_source` | Single-select | Attribution reporting |
| `lifetime_event_count` | Number (auto-increment) | VIP tagging trigger |
| `last_event_date` | Date | Re-engagement timing |

**`event_type` dropdown:** Date Night, Birthday Party, Bridal Shower, Baby Shower, Corporate Event, Beach Picnic, Wedding, Game Day, Holiday Party, Other

**`board_size_interest` dropdown:** Petite, Classic, Grand, Grazing Table, Cart Service, Unsure

**`referral_source` dropdown:** Website, Instagram, Facebook, Google Search, Google Business Profile, Word of Mouth, Wedding Planner, Venue Referral, Other

---

## 9. Calendars

### Calendar 1: "Liz - Quote Calls"
- Type: Single-user (Liz)
- Duration: 15 min
- Buffer: 15 min before/after
- Availability: Mon–Fri 10am–2pm ET, Sat 11am–1pm ET (no Sundays)
- Confirmation: Auto-email + SMS reminder 1hr before
- Used by: Conversation AI quote-call booking; embedded on `/contact` page

### Calendar 2: "Fig Jam Events" (internal)
- Type: Internal only, no public booking
- Populated by: WF-05 (auto-add when Booked)
- Synced one-way to Liz's personal Google Calendar

---

## 10. Forms / Funnels Included

### Inbound Webhook Endpoint (PRIMARY — replaces broken Wix form)
- Name: `fig-jam-website-form`
- Endpoint: `https://services.leadconnectorhq.com/hooks/{location_id}/webhook-trigger/{webhook_id}` (generated on import)
- Method: POST, JSON
- Auth: None (public endpoint; rate-limited at GHL level)
- Triggers: WF-01

### Embedded Funnel: Quote Call Booking
- For Conversation AI handoff + `/contact` page CTA
- 2-step: select calendar slot → confirm phone + email

### GBP Post Templates (monthly content engine — 12 pre-written)
1. This week's featured board
2. Behind-the-scenes prep
3. Customer spotlight (post-review)
4. Seasonal ingredient highlight
5. Cart service feature
6. Sarasota event recap
7. Pairing tip
8. Holiday/occasion teaser
9. Dietary accommodations spotlight
10. Meet Liz (founder story)
11. Booking lead-time reminder
12. Service area shout-out (rotating: Sarasota → Siesta Key → Lakewood Ranch → Lido Key)

Each template includes: caption copy, hashtag block, image placeholder, CTA link. **Liz's only required input: 1 photo per week.** GHL Content AI rewrites captions based on the photo if needed.

---

## 11. Custom Values to Configure on Import

| Custom Value | What to set | Used in |
|---|---|---|
| `owner_email` | Liz's actual email | EM-01 destination |
| `owner_cell` | Liz's mobile (for SMS notifications) | SMS-01 destination |
| `business_phone` | 941-914-0007 | Footers, signatures |
| `site_url` | https://figjamcharcuteriellc.com (or temp GH Pages URL) | Email links |
| `google_review_link` | Liz's GBP review URL (full short link) | SMS-06, EM-07 |
| `yelp_review_link` | Liz's Yelp page review URL | SMS-06, EM-07 |
| `instagram_handle` | @figjamcharcuterie (verify actual) | Email signatures |
| `webhook_secret` | Optional random string for HMAC verification on inbound | NextJS form code |

---

## 12. Import Checklist for Mark

After loading the snapshot file in GHL:

- [ ] Set all 8 Custom Values above
- [ ] Connect Liz's Google Business Profile (Settings → Integrations → GBP)
- [ ] Connect Twilio number 941-914-0007 to GHL (port or proxy)
- [ ] Connect Liz's Google Calendar (one-way push for events)
- [ ] Upload Conversation AI training docs (mirror `/faq` page content + pricing notes)
- [ ] Configure Voice AI greeting voice + script
- [ ] End-to-end test:
  - [ ] POST test JSON to inbound webhook → verify Liz gets email + SMS, opportunity in pipeline
  - [ ] Send test SMS reply → verify Conversation AI responds correctly
  - [ ] Call 941-914-0007 from test number, let ring out → verify Voice AI captures
  - [ ] Manually advance test opportunity through all stages → verify all transitions fire
- [ ] Provide Liz with GHL mobile app login + 10-min walkthrough screen recording
- [ ] **Grab the inbound webhook URL → paste into NextJS form config so the site can talk to GHL**

---

## 13. Estimated Setup Time

| Step | Time |
|---|---|
| Snapshot import | 5 min |
| Custom values + integrations | 30 min |
| Conversation/Voice AI training | 45 min |
| End-to-end testing | 30 min |
| **Total one-time** | **~2 hours** |

After that: zero ongoing manual work. Liz sees only inbound notifications + the opportunity board in the GHL mobile app.

---

## 14. Open Items (need Liz to confirm before going live)

- Exact email address she wants notifications sent to (currently assuming `liz@figjamcharcuteriellc.com` — verify)
- Cell number for SMS notifications (the business line 941-914-0007 or a separate personal cell)
- Google Business Profile review link (need her to share it once she claims/owns it)
- Yelp page status (exists? owned? need URL)
- Instagram handle (assumed `@figjamcharcuterie` — verify)
- Deposit policy (% required, when due, refund window) — placeholder text in EM-05 until decided
- Cancellation policy — placeholder until decided
- Service hours (Voice AI uses Mon–Sat 9am–6pm ET — confirm)
