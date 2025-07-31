# Home Assistant Motion Detection Automation

A comprehensive Home Assistant automation that sends notifications when motion is detected while your alarm system is set to "away" mode.

## Features

✅ **Multi-sensor support**: Works with camera motion sensors, PIR sensors, and Aqara occupancy sensors  
✅ **Smart notifications**: Detailed alerts with sensor location and timestamp  
✅ **Security lighting**: Optional automatic light activation in alert colors  
✅ **Parallel processing**: Handles multiple simultaneous motion detections  
✅ **Comprehensive logging**: Records all security events  
✅ **Highly customizable**: Easy to adapt to your specific setup  

## Prerequisites

- Home Assistant (tested on 2024.x)
- At least one motion sensor or occupancy sensor
- An alarm system or away mode detection method
- A notification service (mobile app, email, Telegram, etc.)

## Quick Setup

### 1. Copy the Template
Copy `motion_detection_when_away.yaml` to your Home Assistant automations directory.

### 2. Update Motion Sensor Entities
Replace the example entity IDs with your actual sensors:

```yaml
# Replace these examples with your real entities:
entity_id: binary_sensor.camera_1_motion        # Your camera motion sensor
entity_id: binary_sensor.hallway_motion         # Your PIR motion sensor  
entity_id: binary_sensor.0x[device_id]_occupancy # Your Aqara occupancy sensor
```

**How to find your entity IDs:**
- Go to **Settings** → **Devices & Services** → **Entities**
- Search for "motion" or "occupancy"
- Copy the entity IDs you want to monitor

### 3. Configure Your Alarm System
Update the condition section with your alarm setup:

**Option A: Alarm Control Panel**
```yaml
condition:
  - condition: state
    entity_id: alarm_control_panel.your_alarm
    state: 'armed_away'
```

**Option B: Input Boolean (Away Mode)**
```yaml
condition:
  - condition: state
    entity_id: input_boolean.away_mode
    state: 'on'
```

**Option C: House Occupancy (Inverse Logic)**
```yaml
condition:
  - condition: state
    entity_id: binary_sensor.house_occupied
    state: 'off'
```

### 4. Set Up Notifications
Choose your notification method:

**Mobile App:**
```yaml
service: notify.mobile_app_your_phone_name
```

**Telegram:**
```yaml
service: notify.telegram
```

**Email:**
```yaml
service: notify.email
```

**Multiple Services:**
```yaml
service: notify.notify  # Sends to all configured notification services
```

### 5. Optional: Configure Security Lighting
Update the area IDs for automatic light activation:

```yaml
target:
  area_id: 
    - your_hallway_area
    - your_living_room_area
    - your_kitchen_area
```

**To find area IDs:**
- Go to **Settings** → **Areas & Zones**
- Note the area names (use lowercase with underscores)

## Sensor Types Supported

### Camera Motion Sensors
```yaml
- platform: state
  entity_id: binary_sensor.camera_1_motion
  to: 'on'
  id: "camera_1_motion"
```

### PIR Motion Sensors
```yaml
- platform: state
  entity_id: binary_sensor.hallway_motion
  to: 'on'
  id: "hallway_motion"
```

### Aqara Occupancy Sensors
```yaml
- platform: state
  entity_id: binary_sensor.0x[your_device_id]_occupancy
  to: 'on'
  id: "aqara_living_room"
```

### Other Motion Sensors
Works with any `binary_sensor` with device class `motion` or `occupancy`.

## Testing

1. **Enable the automation** in Home Assistant
2. **Set your alarm to away mode**
3. **Trigger a motion sensor** (wave your hand in front of it)
4. **Check for notifications** on your chosen service
5. **Review logs** in Home Assistant → Settings → System → Logs

## Customization Options

### Add Motion Duration Filter
Prevent false triggers by requiring motion for a minimum duration:

```yaml
- platform: state
  entity_id: binary_sensor.your_motion_sensor
  to: 'on'
  for:
    seconds: 3  # Motion must persist for 3 seconds
```

### Time-Based Conditions
Only trigger during certain hours:

```yaml
condition:
  - condition: state
    entity_id: alarm_control_panel.your_alarm
    state: 'armed_away'
  - condition: time
    after: '22:00:00'
    before: '06:00:00'  # Only between 10 PM and 6 AM
```

### Custom Notification Messages
Personalize the notification content:

```yaml
data:
  title: "🏠 Security Alert!"
  message: >
    Motion detected in {{ area_name(trigger.entity_id) }} 
    by {{ state_attr(trigger.entity_id, 'friendly_name') }}
    at {{ now().strftime('%I:%M %p') }}
```

## Troubleshooting

### No Notifications Received
- Verify alarm is actually in "away" state
- Check notification service configuration
- Test notification service independently
- Review Home Assistant logs for errors

### Wrong Entity IDs
- Use **Developer Tools** → **States** to find correct entity IDs
- Ensure entity IDs exactly match (case-sensitive)
- Check that sensors are actually working

### Automation Not Triggering
- Verify motion sensors are functional
- Check automation is enabled
- Review automation traces in Home Assistant
- Confirm condition logic is correct

## Advanced Features

- Compatible with most alarm panel integrations
- Works with DIY alarm setups using input_booleans
- Supports presence detection systems
- Chain with other security automations
- Trigger recordings or snapshots
- Activate sirens or additional alerts

---

**Need help?** Check the [Home Assistant Community Forum](https://community.home-assistant.io/) or the [Home Assistant Documentation](https://www.home-assistant.io/docs/).