# Home Assistant Templates 🏠

A curated collection of ready-to-use Home Assistant templates including dashboards, automations, and configurations. Browse, copy, and customize templates for your smart home setup.

🌐 **Live Website:** [home-assistant-templates.vercel.app](https://home-assistant-templates.vercel.app)


## 🚀 Quick Start

1. **Browse templates** at [home-assistant-templates.vercel.app](https://home-assistant-templates.vercel.app)
2. **Find a template** you like using search and filters
3. **View YAML** configuration by clicking "View YAML"
4. **Copy configuration** and customize entity IDs for your setup
5. **Add to Home Assistant** and restart

## What's Included

### 🤖 Automations
- **🔒 Motion Detection Security** - Smart notifications when motion detected during away mode
- **🔋 Battery Monitoring** - Proactive low battery alerts for all devices

### 📊 Dashboards
- **📊 Motion Sensors Dashboard** - Real-time motion detection monitoring and history
- **🔋 Battery Status Dashboard** - Centralized battery level tracking and alerts
- **🌡️ Temperature Sensors Dashboard** - Room temperature monitoring with trends

## 🤝 Contributing

Any idea/feedback on what's next? Reach me on X (https://x.com/CPunella)!

## Automations

### 🔒 Motion Detection Security System
**Location:** `automations/motion_sensors/`

A comprehensive Home Assistant automation that sends notifications when motion is detected while your alarm system is set to "away" mode.

**Features:**
- ✅ Multi-sensor support (Camera, PIR, Aqara occupancy sensors)
- ✅ Smart notifications with sensor location and timestamp  
- ✅ Optional security lighting activation
- ✅ Parallel processing for multiple simultaneous detections
- ✅ Comprehensive logging and high-priority alerts

### 🔋 Battery Monitoring System
**Location:** `automations/battery/`

Smart battery monitoring automation that tracks device battery levels and sends proactive notifications when batteries need replacement.

**Features:**
- ✅ Configurable battery level thresholds
- ✅ Device-specific notifications with battery percentage
- ✅ Smart filtering to avoid notification spam
- ✅ Support for all battery-powered Home Assistant devices

## Dashboards

### 📊 Motion Sensors Dashboard
**Location:** `dashboard/motion-sensors-dashboard/`

Comprehensive dashboard for monitoring motion detection across your home with real-time status and historical data visualization.

### 🔋 Battery Status Dashboard
**Location:** `dashboard/battery-status-dashboard/`

Centralized battery monitoring dashboard showing current battery levels, low battery alerts, and maintenance schedules for all battery-powered devices.

### 🌡️ Temperature Sensors Dashboard
**Location:** `dashboard/temperature-sensors-dashboard/`

Temperature monitoring dashboard with trend visualization, room-by-room temperature tracking, and climate control insights.

## Features

- **Security Automations**: Motion detection and alert systems for home security
- **Battery Management**: Proactive battery monitoring and replacement notifications
- **Custom Dashboard Scripts**: Enhanced UI components for comprehensive home monitoring
- **Template-Ready**: All automations sanitized and ready for public use

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

These templates should be thoroughly tested in your environment before production use. Always backup your Home Assistant configuration before implementing new automations.