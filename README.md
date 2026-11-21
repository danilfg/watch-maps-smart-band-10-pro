# WristRoute · Xiaomi Smart Band 10 Pro Ceramic

**State: working PWA prototype; no working RPK or Bluetooth transfer yet.**

Expected site after Pages activation: https://danilfg.github.io/watch-maps-smart-band-10-pro/

## What is implemented
- Russian-language responsive PWA with OpenStreetMap/Leaflet centered on Moscow.
- Select start/end on the map or use the phone's GPS.
- Open *official* Yandex Maps in a new tab, preserving your logged-in Yandex session there.
- Paste a full Yandex Maps route share URL with 'rtext=LAT,LON~LAT,LON'; parse endpoints **only**.
- Walking/cycling routing using an independently operated Valhalla endpoint, defaulting to the FOSSGIS public demo for **testing only**.
- Show route geometry, distance, estimated duration, maneuvers supplied by Valhalla.
- Import GPX, export GPX or versioned 'wrist-route/1' JSON for eventual wearable use.
- Unit-test/deploy GitHub Actions workflow, PWA manifest and offline app shell cache.

## Limitations (important)
1. A full signed-in Yandex Maps web app cannot be read as an iframe from a GitHub Pages origin. The official site remains in its own tab; no credentials are requested or handled.
2. Yandex share URLs do *not* contain a guaranteed line or turn instructions. Their points are used only as input to a **separate** OSM/Valhalla route. Short links and address-only share URLs aren't supported without further integration.
3. Ordinary Yandex Maps API licenses restrict route-data storage, modification, and use in third-party navigation. This prototype **does not export Yandex API-derived geometry**.
4. Static GitHub Pages cannot directly send routes to a band over its proprietary Bluetooth/Interconnect protocol. Safari iOS has no built-in Web Bluetooth. Automatic data transfer, an RPK, watch GPS and live turn prompts are NOT implemented.
5. Valhalla public endpoint can fail, throttle or reject cross-origin queries. Use a self-hosted instance for reliable use; check [Valhalla demo use guidance](https://valhalla.github.io/valhalla/start/introduction/). OSM tiles are for interactive browsing and cannot be bulk downloaded for offline map packs.
6. GPX import brings route points only, not verified instructions or stair alerts. **Do not use for safety-critical navigation.**

## Enable GitHub Pages
1. GitHub repo -> **Settings → Pages** -> **Source: GitHub Actions**.
2. Go to **Actions → Deploy WristRoute** and run **Run workflow** if needed.
3. Check actual deploy status, then open https://danilfg.github.io/watch-maps-smart-band-10-pro/ on your phone. The URL above is a candidate until deployment succeeds.

## Running locally
Use any local static server: 'python3 -m http.server 8000 -d docs'. Open http://localhost:8000.
The app shell can be cached by service worker, but actual map tiles and online routing need internet.

## Planned
- GNSS and persistent-storage test RPK for the Chinese Ceramic Edition.
- Offline route viewer on Vela JS, native fallback only if necessary.
- Reliable phone-to-band bridge while Mi Fitness stays paired: Android Interconnect first, iOS feasibility independently tested.
- Chunked, checksummed JSON protocol and explicit privacy controls.
- Optional own Valhalla backend and alternative routes avoiding stairs based on OSM tags.

## Sources
- [Yandex route sharing](https://yandex.com/support/m-maps/en/route-share)
- [Yandex API conditions](https://yandex.ru/legal/maps_api/ru/)
- [Valhalla](https://valhalla.github.io/valhalla/)
- [OSM Copyright](https://www.openstreetmap.org/copyright)
- [Web Bluetooth support](https://caniuse.com/web-bluetooth)
