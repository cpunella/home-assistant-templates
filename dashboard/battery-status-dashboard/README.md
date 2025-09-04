# Battery Status Dashboard

A clean, auto‑discovered overview of all battery levels in your Home Assistant, with clear highlights for anything at or below 20%.

## What it shows
- Summary chips (top):
  - Total number of battery sensors
  - Average battery percentage
  - Count of batteries below 20%
  - Lowest battery (name + %)
- All batteries, sorted by level (Entities list powered by auto‑entities)
- Low batteries (≤ 20%) list to act on quickly
- Battery alerts (binary_sensors with `device_class: battery` and state not `off`)
- Global alert banner that appears only if any battery is ≤ 20%

## Requirements (HACS)
Install these frontend cards via HACS → Frontend:
- Mushroom Cards
- Auto‑entities
- Card Mod (for banner styling)

After installation, refresh the browser (hard reload) and ensure resources are loaded (HACS usually registers them automatically).

## Install
1) Copy `battery-status-dashboard.yaml` to your dashboard (or create a new dashboard and paste the YAML)
2) Save, then reload the dashboard

No entity changes needed. It auto‑discovers any `sensor` entities with `device_class: battery`.

## Customization
- Threshold for “low battery”: search the YAML for `threshold = 20` and change the number everywhere to your preferred value (e.g., 25)
- Sorting: currently sorts ascending (lowest first). Flip `reverse:` to `true` if you prefer highest first in the “All Batteries” section
- Styling: tweak `card_mod` color in the alert banner (`rgba(244, 67, 54, 0.1)`) to match your theme

## Notes
- The “Battery Alerts (binary sensors)” section shows any `binary_sensor` with `device_class: battery` that has a state other than `off`
- Sensors that report `unknown` or `unavailable` are excluded from lists and counts

## Troubleshooting
- “Custom element not found”: ensure the listed HACS cards are installed and resources are added
- Lists look empty: confirm your entities expose `device_class: battery` and aren’t `unknown/unavailable`
- Percentages wrong: verify your battery sensors report a numeric percentage value (0–100)

Enjoy the quick visual of your home’s batteries and never get caught with a dead device again! 🔋
