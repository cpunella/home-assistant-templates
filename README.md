# Home Assistant AI Automations & Dashboard Scripts

This repository contains AI-generated automations and dashboard scripts for Home Assistant, designed to enhance smart home functionality and user experience.

## Overview

This project leverages AI to create intelligent automation scripts and custom dashboard configurations for Home Assistant installations. The goal is to provide sophisticated home automation solutions that adapt to user behaviors and preferences.

## Repository Structure

```
homeassistant-ai/
├── automations/
│   └── motion_sensors/     # Motion detection & security automations
│       ├── motion_detection_when_away.yaml
│       └── README.md
└── dashboard/              # Custom dashboard configurations
    └── motion-sensors-dashboard/
```

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

**Setup:** Replace entity IDs with your sensors, configure alarm system condition, and set up notification service. See `automations/motion_sensors/README.md` for detailed instructions.

**Compatible with:** All motion sensor types, camera motion detection, Aqara occupancy sensors, any alarm system integration.

## Features

- **Security Automations**: Motion detection and alert systems for home security
- **Custom Dashboard Scripts**: Enhanced UI components for motion sensor monitoring
- **Template-Ready**: All automations sanitized and ready for public use

## Contributing

This repository primarily contains AI-generated content. When contributing:
- Test all automations thoroughly before submitting
- Document any entity dependencies
- Include comments explaining complex logic
- Follow Home Assistant best practices

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

These scripts are AI-generated and should be thoroughly tested in your environment before production use. Always backup your Home Assistant configuration before implementing new automations.