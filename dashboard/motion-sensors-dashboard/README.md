# Motion Sensors Dashboard

A real-time motion sensor monitoring dashboard for Home Assistant with visual status indicators and room-based organization.

## Features

- **Real-time Motion Detection**: Monitor all motion sensors in your home from a single dashboard
- **Visual Status Indicators**: Animated icons and color-coded cards show active motion
- **Room Organization**: Sensors grouped by location for easy navigation
- **Auto-discovery**: Automatically detects all motion sensors in your Home Assistant setup
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Prerequisites

This dashboard requires the following custom cards to be installed via HACS:

- [Mushroom Cards](https://github.com/piitaya/lovelace-mushroom) - For beautiful UI components
- [Button Card](https://github.com/custom-cards/button-card) - For customizable sensor cards
- [Layout Card](https://github.com/thomasloven/lovelace-layout-card) - For responsive layouts
- [Auto Entities Card](https://github.com/thomasloven/lovelace-auto-entities) - For automatic sensor discovery
- [Card Mod](https://github.com/thomasloven/lovelace-card-mod) - For advanced styling

## Installation

### Step 1: Install Required Custom Cards

1. Install [HACS](https://hacs.xyz/) if you haven't already
2. In HACS, search for and install:
   - Mushroom
   - Button Card  
   - Layout Card
   - Auto Entities Card
   - Card Mod

### Step 2: Add the Dashboard

1. Download `motion-sensors-dashboard.yaml` from this repository
2. In Home Assistant, go to **Settings** → **Dashboards**
3. Click the **Add Dashboard** button
4. Choose **"Start with an empty dashboard"**
5. Give it a title (e.g., "Motion Sensors")
6. Open the new dashboard and click **Edit Dashboard** (three dots menu)
7. Click **Raw configuration editor** (three dots menu again)
8. Replace the entire content with the contents of `motion-sensors-dashboard.yaml`
9. Click **Save**

### Step 3: Configure Your Sensors

The dashboard uses generic entity IDs that you'll need to update to match your sensors:

1. Click **Edit Dashboard**
2. Find each button card and update the `entity:` field to match your sensor's entity ID
3. Update the sensor names to match your preferences
4. Save your changes

Example entity ID mapping:
```yaml
# Replace these generic IDs:
binary_sensor.motion_sensor_living_room_1
binary_sensor.motion_sensor_bedroom
binary_sensor.motion_sensor_bathroom_1

# With your actual sensor IDs:
binary_sensor.aqara_motion_sensor_occupancy
binary_sensor.philips_hue_motion_sensor
binary_sensor.zwave_pir_sensor_motion
```

## Customization

### Adding More Sensors

To add additional motion sensors:

1. Copy an existing button-card block
2. Update the `entity:` field with your new sensor's entity ID
3. Change the `name:` field to describe the sensor
4. Place it under the appropriate room section

### Creating New Room Sections

```yaml
- type: custom:mushroom-title-card
  title: Your New Room
- type: custom:button-card
  entity: binary_sensor.your_sensor_id
  name: Your Sensor Name
  # ... rest of the button card configuration
```


## Dashboard Structure

The dashboard consists of several sections:

1. **Header Cards**: Display total sensor count and active motion count
2. **Room Sections**: Organized by location (Living Room, Bedroom, etc.)
3. **Security Cameras**: Motion detection from security cameras
4. **Other Sensors**: Additional motion sensors
5. **Recent Activity**: Auto-populated list of recently triggered sensors

## Troubleshooting

### Sensors Not Showing Up
- Ensure your motion sensors have `device_class: motion` attribute
- Check that sensor entity IDs are correctly configured
- Verify sensors are not in "unavailable" state

### Cards Not Displaying Properly
- Confirm all required custom cards are installed via HACS
- Clear browser cache and reload
- Check Home Assistant logs for errors

### Animation Not Working
- Ensure Card Mod is properly installed
- Check that JavaScript is enabled in your browser
- Try a different browser to rule out compatibility issues

## Example Setup

After configuration, your dashboard will display:
- Summary cards showing total sensors and active detections
- Individual sensor cards with:
  - Current state (Motion/No Motion)
  - Last changed timestamp
  - Visual animations when motion is detected
  - Color-coded status (red for active, blue for inactive)
- Automatic list of recently triggered sensors sorted by time