/**
 * Amplitude Analytics Client Module
 *
 * This module runs in the browser and tracks page views using Amplitude.
 * It implements Docusaurus lifecycle hooks to capture navigation events.
 *
 * Graceful degradation: If AMPLITUDE_API_KEY is not set, this module
 * does nothing and throws no errors.
 */

// Track initialization state
let amplitudeInitialized = false;

/**
 * Initialize Amplitude SDK
 * Only runs in production when API key is available
 */
function initializeAmplitude() {
  // Check if we're in production
  const isProd = process.env.NODE_ENV === 'production';

  // Get API key from environment
  const apiKey = process.env.AMPLITUDE_API_KEY;

  // Gracefully skip if no API key or not production
  if (!isProd || !apiKey) {
    if (typeof window !== 'undefined' && !isProd) {
      console.info('[Amplitude Analytics] Disabled in development mode');
    }
    return;
  }

  // Check if Amplitude SDK is loaded
  if (typeof window === 'undefined' || !window.amplitude) {
    console.warn('[Amplitude Analytics] SDK not loaded');
    return;
  }

  try {
    // Initialize Amplitude using the global amplitude object
    window.amplitude.init(apiKey, {
      // Configuration options
      defaultTracking: false, // We'll manually track page views
    });

    amplitudeInitialized = true;
    console.info('[Amplitude Analytics] Initialized successfully');
  } catch (error) {
    console.error('[Amplitude Analytics] Initialization failed:', error);
  }
}

/**
 * Extract document section from pathname
 * e.g., "/analytics/guides/overview" -> "analytics"
 */
function getDocumentSection(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  return parts[0] || 'home';
}

/**
 * Get user properties to send with events
 */
function getUserProperties() {
  if (typeof window === 'undefined') {
    return {};
  }

  return {
    viewport_width: window.innerWidth,
    viewport_height: window.innerHeight,
    screen_width: window.screen.width,
    screen_height: window.screen.height,
    user_agent: navigator.userAgent,
    language: navigator.language,
  };
}

/**
 * Track a page view event
 */
function trackPageView(location, previousLocation) {
  // Skip if not initialized
  if (!amplitudeInitialized || typeof window === 'undefined' || !window.amplitude) {
    return;
  }

  try {
    const eventProperties = {
      page_url: location.pathname + location.search + location.hash,
      page_title: document.title,
      page_section: getDocumentSection(location.pathname),
      referrer: document.referrer,
      previous_page: previousLocation ? previousLocation.pathname : null,
    };

    // Track page view event
    window.amplitude.track('Page Viewed', eventProperties);

    // Set user properties using the Identify API
    const userProperties = getUserProperties();
    const identifyEvent = new window.amplitude.Identify();

    // Set each user property
    Object.keys(userProperties).forEach((key) => {
      identifyEvent.set(key, userProperties[key]);
    });

    // Send the identify event
    window.amplitude.identify(identifyEvent);
  } catch (error) {
    console.error('[Amplitude Analytics] Failed to track page view:', error);
  }
}

/**
 * Docusaurus lifecycle hook: Called when route updates
 * Fires on both initial page load and client-side navigation
 */
export function onRouteDidUpdate({ location, previousLocation }) {
  // Initialize on first call
  if (!amplitudeInitialized && typeof window !== 'undefined') {
    initializeAmplitude();
  }

  // Track page view if initialized
  if (amplitudeInitialized) {
    trackPageView(location, previousLocation);
  }
}
