# Temperature Dashboard 

## What you get
- Clean temperature overview with room sections and color hints
- Gauges for quick glance
- 24h trend charts and indoor vs outdoor comparison
- High‑temperature alert banner
- Temperature + humidity correlation chart

## Requirements (HACS)
Install these frontend cards:
- Mushroom Cards
- Mini Graph Card
- Layout Card
- Card Mod (styling)

## Install
1) Install the cards above via HACS and reload the frontend
2) Add a new dashboard and paste `temperature-sensors-dashboard.yaml`
3) Replace the placeholders below with your actual entity IDs

### Placeholders to replace
Copy/paste this list into your editor and map each one to an entity from Developer Tools → States:
```yaml
# Indoor temperatures
sensor.temp_kitchen: <your kitchen temperature sensor>
sensor.temp_living_room_sofa: <your living room sensor>
sensor.temp_living_room_tv: <your second living room sensor>
sensor.temp_hallway: <your hallway temp>
sensor.temp_bathroom_main: <your main bathroom temp>
sensor.temp_bathroom_small: <your second/small bathroom temp>
sensor.temp_home: <your general indoor temp / main station>

# Outdoor and special
sensor.temp_kitchen_balcony: <your balcony/outdoor near kitchen>
sensor.temp_outdoor: <your main outdoor temp>
sensor.temp_hub: <equipment/hub temp, optional>

# Gauges/devices (optional)
sensor.temp_living_room_device: <any device temperature you want in a gauge>

# Humidity
sensor.humidity_home: <your indoor humidity sensor>
```
Quick tip: use Find/Replace in your editor to swap each placeholder across the file.

## Customize
- Color thresholds (card backgrounds): in each card’s `card_mod` style, adjust 26/20°C for indoor, 30/10°C for outdoor
- Gauge thresholds: edit the `severity` blocks (green/yellow/red)
- Trend windows: change `hours_to_show` (24h) and `points_per_hour`
- Alert threshold: search for `> 28` and set your preferred value

## Troubleshooting
- If a card shows “Entity not found”, update the placeholder with a valid entity ID
- If graphs look empty, ensure Recorder is enabled and give it time to collect history
- Make sure all required cards are installed and resources are loaded

## Notes
- This template contains no real entities and is safe to share
- Works with any integration as long as your sensors are `sensor` entities reporting temperature/humidity