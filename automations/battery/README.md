# Battery Low Notification Automation

Automatically sends notifications when any battery sensor drops below 20%.

## Features
- Auto-discovers all battery sensors (no manual entity configuration needed)
- Sends notification when battery drops below 20%
- Includes device name and current battery percentage in notification
- Persistent notifications with action buttons
- Parallel execution for multiple low batteries
- Filters out unknown/unavailable states

## Installation

1. Copy `battery-low-notification.yaml` to your Home Assistant automations
2. Save it

## Customization

### Change Battery Threshold
Edit line 6 in the YAML:
```yaml
below: 20  # Change to your preferred percentage (e.g., 25, 30)
```

### Notification Service
Default uses `notify.notify`. Change line 18 if you have specific notification services:
```yaml
service: notify.mobile_app_your_phone  # Example for mobile app
```

### Add Additional Conditions
Add time-based conditions to avoid night notifications:
```yaml
condition:
  - condition: time
    after: "08:00:00"
    before: "22:00:00"
  # ... existing conditions
```

## How It Works
1. Monitors all sensor entities for numeric state changes
2. Template filters for only battery device_class sensors
3. Triggers when value drops below threshold
4. Validates the entity is a battery sensor and has valid state
5. Sends notification with device details
6. Tags notifications to avoid duplicates for same device

## Requirements
- Home Assistant with notification service configured
- Battery sensors with proper `device_class: battery` attribute

## Notes
- Uses `mode: parallel` to handle multiple batteries simultaneously
- Maximum 10 parallel executions to prevent notification spam
- Notifications are persistent and tagged per entity
- Action buttons included for quick dashboard access