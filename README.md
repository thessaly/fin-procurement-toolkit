# FIN Open Source Procurement Toolkit

A static prototype for preparing and reviewing institutional requests to fund or organise open-source support. Open `index.html` in a browser. Answers are held only in page memory; refresh or closing the page loses them. Download a record to retain the assessment. No institutional submission service is connected.

## ORCA feedback edition — 13 November 2026

This branch carries forward the 5 November reviewer edition (combined use/rationale question, licensing details, automated evidence and dependency review) and adds:

- Plain-language purpose, intended users and first steps on the landing page; separate entry points for a new request and a clearly marked example.
- Nine guided steps, previous/next controls, a step selector and a reason for each question. Step progress is not an approval score.
- Requested work, provider/internal team, budget and period in the request, institutional review and downloaded records.
- A fictional managed JupyterHub service example: paid hosting, maintenance and training, with explicit responsibilities and illustrative costs. The example is not a quotation or live project assessment.
- Evidence labels: Information retrieved, Needs review, No information available. Retrieval is not verification, and missing evidence is not proof of absence. Sources and dates accompany observations; illustrative and failed/partial retrievals need review.
- Broader institutional staff roles, a live review-progress counter, clearer handoff and record guidance.

The existing public site and the earlier review preview are not changed by creating this branch. No private email content is included.

## Checks

Install development dependencies with `npm install`, then run `npm test` for DOM-based functional checks. These cover the guided flow, answer retention, procurement details in the record, review progress, evidence labels, illustrative provenance, failed API fallback, and existing licensing/dependency helpers.

For browser checks, run `npx playwright install chromium`, then `npm run test:browser`. An existing Chromium executable can be selected with `CHROMIUM_PATH`.

Functional checks and JavaScript syntax checks passed in the implementation environment. Full browser rendering could not be checked because that environment blocked Chromium's socket creation. Browser tests are supplied but are not claimed to have passed. Public API responses, rate limits and dependency graph coverage vary; this change does not validate every live API or provide an institutional approval.
