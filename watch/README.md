# WristRoute watch prototype (Vela JS)

This experimental RPK is an offline **UI demonstration**, using four built-in placeholder turns. It does NOT receive the PWA's JSON, use GNSS, navigate live, or connect to any app.

- Swipe left/up, or tap NEXT: next demonstration turn
- Swipe down, or tap BACK: previous turn
- Swipe right, or tap EXIT: **close the app** using '@system.app.terminate()'
- Uses 336 x 480 layout matching the user's Chinese Smart Band 10 Pro Ceramic.

Build using 'npm install && npm run build' in this folder. The 'Build WristRoute RPK' GitHub Actions workflow packages a debug RPK from 'dist/' and publishes an artifact/Release only on successful build. Debug signature may require AstroBox support; hardware compatibility not yet validated.

**Never flash watch firmware, reset or unpair Mi Fitness to test this screen.** Do not treat the demonstrated maneuvers as real navigation.

Next steps: test Vela geolocation, offline storage and a real data-transfer transport between phone and band without disturbing Mi Fitness.

## Personalized offline route

GitHub Actions `workflow_dispatch` accepts `route_code` from the Pages export panel. The script `watch/scripts/embed-route.cjs` validates the compact base64url payload, writes `src/common/route-data.js` inside the CI workspace, and compiles a route-specific RPK. The app displays turn text and distances measured **from the start** and supports manual swipes and exit. Routes are uploaded as workflow artifacts but never publicly released. Run `node --test watch/tests/*.test.cjs` to validate the protocol.

This is not GPS-guided navigation and must not be relied on for real-time directions. Never reset your watch or replace firmware for this test.
