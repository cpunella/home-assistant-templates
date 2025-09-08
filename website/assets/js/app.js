// Dashboard and Automation YAML configurations
const yamlConfigurations = {
    motion: `views:
  - title: Motion Sensors
    icon: mdi:motion-sensor
    panel: false
    cards:
      - type: horizontal-stack
        cards:
          - type: custom:mushroom-template-card
            primary: Motion Sensors
            secondary: >-
              {{ states.binary_sensor | selectattr('attributes.device_class',
              'eq', 'motion') | list | length }} Total
            icon: mdi:motion-sensor
            icon_color: blue
            card_mod:
              style: |
                ha-card {
                  --ha-card-background: rgba(var(--rgb-primary-color), 0.1);
                }
          - type: custom:mushroom-template-card
            primary: Active
            secondary: >-
              {{ states.binary_sensor | selectattr('attributes.device_class',
              'eq', 'motion') | selectattr('state', 'eq', 'on') | list | length
              }} Detecting
            icon: mdi:run
            icon_color: red
            card_mod:
              style: |
                ha-card {
                  --ha-card-background: rgba(var(--rgb-red), 0.1);
                }
      # Add your motion sensors here - customize entity IDs
      - type: custom:layout-card
        layout_type: masonry
        layout:
          width: 300
          max_cols: 4
        cards:
          - type: custom:button-card
            entity: binary_sensor.your_motion_sensor_1  # Replace with your entity
            name: Living Room Motion
            show_last_changed: true
            styles:
              card:
                - height: 120px
              icon:
                - color: |
                    [[[
                      return entity.state === 'on' ? '#ff5252' : '#44739e';
                    ]]]
                - animation: |
                    [[[
                      return entity.state === 'on' ? 'blink 1s ease infinite' : 'none';
                    ]]]
            state:
              - value: 'on'
                name: Motion Detected!
                icon: mdi:motion-sensor
              - value: 'off'
                name: No Motion
                icon: mdi:motion-sensor-off`,

    battery: `views:
  - title: Battery Status
    icon: mdi:battery
    panel: false
    cards:
      - type: horizontal-stack
        cards:
          - type: custom:mushroom-template-card
            primary: Battery Devices
            secondary: >-
              {{ states | selectattr('attributes.battery_level', 'defined') | list | length }} Total
            icon: mdi:battery
            icon_color: green
          - type: custom:mushroom-template-card
            primary: Low Battery
            secondary: >-
              {{ states | selectattr('attributes.battery_level', 'defined') 
                | selectattr('attributes.battery_level', 'lt', 20) | list | length }} Devices
            icon: mdi:battery-low
            icon_color: red
      - type: custom:auto-entities
        card:
          type: entities
          title: Battery Levels
        filter:
          include:
            - attributes:
                battery_level: ">= 0"
          exclude:
            - state: unavailable
            - attributes:
                battery_level: "> 100"
        sort:
          method: attribute
          attribute: battery_level
          numeric: true
        show_empty: false`,

    temperature: `views:
  - title: Temperature Sensors  
    icon: mdi:thermometer
    panel: false
    cards:
      - type: horizontal-stack
        cards:
          - type: custom:mushroom-template-card
            primary: Temperature Sensors
            secondary: >-
              {{ states.sensor | selectattr('attributes.device_class', 'eq', 'temperature') 
                | list | length }} Sensors
            icon: mdi:thermometer
            icon_color: blue
          - type: custom:mushroom-template-card
            primary: Average Temp
            secondary: >-
              {{ (states.sensor | selectattr('attributes.device_class', 'eq', 'temperature')
                | map(attribute='state') | map('float') | list | average | round(1)) }}°C
            icon: mdi:thermometer-lines
            icon_color: green
      - type: custom:mini-graph-card
        name: Temperature Trends (24h)
        hours_to_show: 24
        points_per_hour: 4
        line_width: 2
        entities:
          - entity: sensor.your_temp_sensor_1  # Replace with your entities
            name: Living Room
            color: '#44739e'
          - entity: sensor.your_temp_sensor_2
            name: Bedroom  
            color: '#f44336'
          - entity: sensor.your_temp_sensor_3
            name: Kitchen
            color: '#4caf50'`
};

const automationConfigurations = {
    motion: `id: motion_detection_when_away
description: "Send notification when motion is detected and alarm is set to away mode"

trigger:
  # Replace these entity IDs with your actual motion sensors
  - platform: state
    entity_id: binary_sensor.your_camera_motion
    to: 'on'
    id: "camera_motion"
  - platform: state
    entity_id: binary_sensor.your_hallway_motion
    to: 'on'
    id: "hallway_motion"
  - platform: state
    entity_id: binary_sensor.your_living_room_motion
    to: 'on'
    id: "living_room_motion"
    
condition:
  # Replace with your actual alarm system entity
  - condition: state
    entity_id: alarm_control_panel.your_alarm_system
    state: 'armed_away'

action:
  - service: notify.notify  # Replace with your notification service
    data:
      title: "🚨 Motion Detected While Away!"
      message: >
        Motion detected by {{ trigger.id | replace('_', ' ') | title }} 
        at {{ now().strftime('%H:%M:%S') }}.
        Location: {{ state_attr(trigger.entity_id, 'friendly_name') or trigger.entity_id }}
      tag: "motion_alert"
      group: "security"
      priority: "high"
      
  # Optional: Turn on security lights
  - service: light.turn_on
    target:
      area_id: 
        - hallway
        - living_room
    data:
      brightness: 255
      color_name: "red"
      
mode: parallel
max: 10`,

    battery: `id: battery_low_notification
description: "Notify when device battery is low"

trigger:
  - platform: numeric_state
    entity_id:
      # Add your battery-powered device entities here
      - sensor.your_door_sensor_battery
      - sensor.your_motion_sensor_battery  
      - sensor.your_window_sensor_battery
      - sensor.your_temp_sensor_battery
    below: 20  # Trigger when battery below 20%
    for:
      minutes: 5  # Wait 5 minutes to avoid false alarms

condition:
  # Only notify during reasonable hours
  - condition: time
    after: '08:00:00'
    before: '22:00:00'
    
  # Don't spam - only notify once per day per device
  - condition: template
    value_template: >
      {{ (now() - states.automation.battery_low_notification.attributes.last_triggered).days >= 1 
         if states.automation.battery_low_notification.attributes.last_triggered 
         else true }}

action:
  - service: notify.notify  # Replace with your notification service
    data:
      title: "🔋 Low Battery Alert"
      message: >
        {{ trigger.to_state.attributes.friendly_name or trigger.entity_id }} 
        battery is at {{ trigger.to_state.state }}%. 
        Please replace the battery soon.
      tag: "battery_alert"
      priority: "normal"
      
  # Optional: Create a persistent notification
  - service: persistent_notification.create
    data:
      title: "Low Battery"
      message: >
        {{ trigger.to_state.attributes.friendly_name }} needs battery replacement ({{ trigger.to_state.state }}%)
      notification_id: "battery_{{ trigger.entity_id | replace('.', '_') }}"
      
mode: parallel
max: 10`
};

// Modal functionality
function showYaml(type) {
    const modal = document.getElementById('yaml-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('yaml-content');
    
    title.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Dashboard Configuration`;
    content.textContent = yamlConfigurations[type];
    
    modal.style.display = 'block';
    
    // Analytics: Track template views
    if (window.va) {
        window.va('track', 'Template Viewed', { template: type, type: 'dashboard' });
    }
}

function showAutomationYaml(type) {
    const modal = document.getElementById('yaml-modal');
    const title = document.getElementById('modal-title');
    const content = document.getElementById('yaml-content');
    
    title.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Automation Configuration`;
    content.textContent = automationConfigurations[type];
    
    modal.style.display = 'block';
    
    // Analytics: Track automation views
    if (window.va) {
        window.va('track', 'Template Viewed', { template: type, type: 'automation' });
    }
}

function showFlow(type) {
    // For now, show the YAML configuration
    // In a future version, this could show a visual flow diagram
    showAutomationYaml(type);
}

function closeModal() {
    const modal = document.getElementById('yaml-modal');
    modal.style.display = 'none';
}

function copyToClipboard() {
    const content = document.getElementById('yaml-content');
    const text = content.textContent;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess();
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function copyConfig(type) {
    const text = yamlConfigurations[type];
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess();
            // Analytics: Track template copies
            if (window.va) {
                window.va('track', 'Template Copied', { template: type, type: 'dashboard' });
            }
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
        } else {
            showCopyError();
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showCopyError();
    }
    
    document.body.removeChild(textArea);
}

function showCopySuccess() {
    // Create and show a temporary success message
    const message = document.createElement('div');
    message.textContent = 'Configuration copied to clipboard!';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #22c55e;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        z-index: 1001;
        font-weight: 500;
        box-shadow: 0 10px 25px -3px rgb(0 0 0 / 0.1);
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
    }, 3000);
}

function showCopyError() {
    const message = document.createElement('div');
    message.textContent = 'Failed to copy. Please select and copy manually.';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #ef4444;
        color: white;
        padding: 1rem 2rem;
        border-radius: 0.5rem;
        z-index: 1001;
        font-weight: 500;
        box-shadow: 0 10px 25px -3px rgb(0 0 0 / 0.1);
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
    }, 5000);
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('yaml-modal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
});

// Add some interactive animations
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Observe all cards for scroll animations
    document.querySelectorAll('.feature-card, .dashboard-card, .automation-card, .step-card').forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Search and Filter Functionality
function initializeSearch() {
    const searchInput = document.getElementById('template-search');
    const filterTabs = document.querySelectorAll('.filter-tab');
    const categoryBtns = document.querySelectorAll('.category-btn');
    const tiles = document.querySelectorAll('.template-tile');
    const emptyState = document.getElementById('empty-state');
    const templateCount = document.getElementById('template-count');

    let currentTypeFilter = 'all';
    let currentCategoryFilter = 'all';
    let currentSearchTerm = '';

    // Search input handler
    searchInput.addEventListener('input', (e) => {
        currentSearchTerm = e.target.value.toLowerCase();
        filterTemplates();
        
        // Analytics: Track searches (debounced)
        if (window.va && currentSearchTerm.length > 2) {
            if (window.searchTimeoutId) {
                clearTimeout(window.searchTimeoutId);
            }
            window.searchTimeoutId = setTimeout(() => {
                window.va('track', 'Search', { query: currentSearchTerm });
            }, 1000);
        }
    });

    // Type filter handlers
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            currentTypeFilter = tab.dataset.filter;
            filterTemplates();
        });
    });

    // Category filter handlers
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active category
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentCategoryFilter = btn.dataset.category;
            filterTemplates();
        });
    });

    function filterTemplates() {
        let visibleCount = 0;

        tiles.forEach(tile => {
            const name = tile.dataset.name.toLowerCase();
            const categories = tile.dataset.category.split(',');
            const type = tile.classList.contains('dashboard') ? 'dashboard' : 'automation';
            
            // Check search term
            const matchesSearch = currentSearchTerm === '' || 
                name.includes(currentSearchTerm) ||
                tile.querySelector('h3').textContent.toLowerCase().includes(currentSearchTerm) ||
                tile.querySelector('p').textContent.toLowerCase().includes(currentSearchTerm);
            
            // Check type filter
            const matchesType = currentTypeFilter === 'all' || currentTypeFilter === type;
            
            // Check category filter
            const matchesCategory = currentCategoryFilter === 'all' || 
                categories.includes(currentCategoryFilter);
            
            // Show/hide tile
            const shouldShow = matchesSearch && matchesType && matchesCategory;
            
            if (shouldShow) {
                tile.style.display = 'flex';
                visibleCount++;
            } else {
                tile.style.display = 'none';
            }
        });

        // Update count and empty state
        updateCountAndEmptyState(visibleCount);
    }

    function updateCountAndEmptyState(count) {
        templateCount.textContent = `${count} template${count !== 1 ? 's' : ''} ${count > 0 ? 'available' : 'found'}`;
        
        if (count === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }
    }

    // Initialize with all components visible
    updateCountAndEmptyState(tiles.length);
}

// Add copy function for automation configs
function copyAutomationConfig(type) {
    const text = automationConfigurations[type];
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess();
            // Analytics: Track automation copies
            if (window.va) {
                window.va('track', 'Template Copied', { template: type, type: 'automation' });
            }
        }).catch(() => {
            fallbackCopyTextToClipboard(text);
        });
    } else {
        fallbackCopyTextToClipboard(text);
    }
}

// Enhanced scroll animations for tiles
function addScrollAnimationsTiles() {
    let tileIndex = 0;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Add a slight delay for each tile for a staggered effect
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, tileIndex * 50);
                tileIndex++;
            }
        });
    });
    
    // Observe tiles for scroll animations
    document.querySelectorAll('.template-tile').forEach((tile) => {
        tile.style.opacity = '0';
        tile.style.transform = 'translateY(20px)';
        tile.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(tile);
    });

    // Observe other cards too
    document.querySelectorAll('.feature-card, .step-card').forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('yaml-modal');
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // Initialize search and filtering
    initializeSearch();
    
    // Initialize scroll animations
    addScrollAnimationsTiles();
});