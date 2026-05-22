# Ukens helt

A single-page poster that shows who is the current week's "hero" on the team — the person responsible for monitoring the dashboard and following up on alerts. The rotation cycles automatically through the team week by week.

## How it works

- The current hero is calculated from today's date and the rotation start date in `config.json`
- The page also shows the upcoming rotation for the next several weeks
- Dark/light mode follows your OS setting and can be toggled manually

## Configuration

All team settings live in `config.json`:

```json
{
  "team": "Team name shown in the header",
  "rotationStartDate": "YYYY-MM-DD",
  "names": ["Person A", "Person B"],
  "responsibilities": [
    "Plain text responsibility",
    "Responsibility with a [link](https://example.com)"
  ]
}
```

- **`rotationStartDate`** — the Monday the rotation started. The app counts weeks from this date to determine whose turn it is.
- **`names`** — ordered list of team members. The rotation follows this order.
- **`responsibilities`** — supports plain text and Markdown-style links `[text](url)`.

## Running tests

```bash
node tests.js
```

Tests cover the ISO week number calculation and initials generation.
