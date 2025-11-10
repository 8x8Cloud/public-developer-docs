# MaestroSDK Demo - Minimal Integration

This directory contains the minimal files needed to integrate the MaestroSDK demo into a Docusaurus site or run as a standalone application.

## Files Included

### Essential Files (Minimal Required):
- **`demo.js`** - Core JavaScript functionality for MaestroSDK integration
- **`demo.css`** - Styles for the demo interface
- **`index.html`** - Standalone HTML page (for testing outside Docusaurus)

### Additional Files:
- **`package.json`** - Node.js package configuration for standalone mode
- **`README.md`** - This documentation file

## Integration Options

### 1. Standalone HTML Demo
For testing or external hosting, use the files in this directory:

```bash
# Run standalone demo
cd docusaurus/static/demos/maestro-sdk
npm run serve
# Open http://localhost:8080
```

## Key Features

### Interactive Elements
- **Phone Input**: Enter phone numbers for click-to-dial testing
- **Click2Dial Button**: Sends call events to MaestroSDK
- **Event Logs**: Real-time display of sent and received events
- **Clear Buttons**: Reset event histories

### Event Flow
1. **User Input**: Enter phone number and click "Click2Dial"
2. **Event Sent**: Message posted to MaestroSDK iframe
3. **Event Logged**: Sent event appears in left panel
4. **SDK Response**: MaestroSDK processes event and sends response
5. **Response Logged**: Received events appear in right panel

### Technical Implementation
- **postMessage API**: For secure iframe communication
- **Event Listeners**: For receiving messages from MaestroSDK
- **Origin Validation**: Ensures messages come from trusted 8x8 domain
- **Responsive Design**: Works on desktop and mobile devices

## Event Format

### Outbound Event (Click2Dial)
```json
{
  "eventName": "maEvent",
  "family": "external",
  "bus": "global",
  "content": {
    "eventName": "startCall",
    "method": "mapDirective",
    "phoneNumber": "+1234567890"
  }
}
```

### Inbound Events
The MaestroSDK returns various event types depending on call state:
- Voice phone events (offered, accepted, completed, terminated)
- Chat events (offered, accepted, completed, terminated)
- Email events (accepted, terminated)
- Voicemail events (offered, accepted, completed, terminated)

## Security Considerations

- Origin validation prevents unauthorized message handling
- No sensitive data is stored or transmitted
- All communication happens through secure postMessage API
- iframe sandbox restrictions apply

## Browser Support

- **Chrome**: ✅ Recommended
- **Firefox**: ✅ Supported
- **Safari**: ✅ Supported
- **Edge**: ✅ Supported

## Domain Whitelisting

For production use, your domain must be whitelisted by 8x8. Submit a request through the designated form mentioned in the main documentation.

## Troubleshooting

### Common Issues:
1. **No events received**: Check domain whitelisting status
2. **CORS errors**: Ensure proper origin validation
3. **iframe not loading**: Check network connectivity and firewall settings
4. **Events not sending**: Verify phone number format and iframe readiness

### Debug Tips:
- Open browser dev tools to monitor console messages
- Check network tab for iframe loading issues
- Verify postMessage events in console

## File Size Optimizations

This minimal integration includes:
- **demo.js**: ~3KB (optimized, no external dependencies)
- **demo.css**: ~4KB (responsive, minimal)
- **index.html**: ~1KB (semantic markup)

**Total footprint**: Less than 8KB for complete functionality.

## Development Notes

The original Node.js application dependencies and build system have been eliminated, providing:
- Zero npm dependencies for the demo itself
- No webpack or bundling required
- Direct browser compatibility
- Faster loading times
- Easier deployment and maintenance