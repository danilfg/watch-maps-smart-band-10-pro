# WristRoute · Xiaomi Smart Band 10 Pro Ceramic

**State: PWA prototype + offline watch UI demo. No live GPS or Bluetooth transfer yet.**

Expected site after Pages activation: https://danilfg.github.io/watch-maps-smart-band-10-pro/

## What is implemented
- Russian-language responsive PWA with OpenStreetMap/Leaflet centered on Moscow.
- Select start/end on the map or use the phone's GPS.
- Open *official* Yandex Maps in a new tab, preserving your logged-in Yandex session there.
- Paste a full Yandex Maps route share URL with 'rtext=LAT,LON~LAT,LON'; parse endpoints **only**.
- On supported Android Chrome installs, WristRoute registers as a Web Share Target for links from Yandex Maps. iOS Safari PWA users should paste a link manually.
- Walking/cycling routing using an independently operated Valhalla endpoint, defaulting to the FOSSGIS public demo for **testing only**.
- Show route geometry, distance, estimated duration, maneuvers supplied by Valhalla.
- Import GPX, export GPX or versioned 'wrist-route/1' JSON for eventual wearable use.
- Unit-test/deploy GitHub Actions workflow, PWA manifest and offline app shell cache.
- Experimental Vela JS offline UI mock in 'watch/', with its own RPK build workflow.

## Limitations (important)
1. A full signed-in Yandex Maps web app cannot be read as an iframe from a GitHub Pages origin. The official site remains in its own tab; no credentials are requested or handled.
2. Yandex share URLs do *not* contain a guaranteed line or turn instructions. Their points are used only as input to a **separate** OSM/Valhalla route. Short links and address-only share URLs aren't supported without further integration.
3. Ordinary Yandex Maps API licenses restrict route-data storage, modification, and use in third-party navigation. This prototype **does not export Yandex API-derived geometry**.
4. Static GitHub Pages cannot directly send routes to a band over its proprietary Bluetooth/Interconnect protocol. Safari iOS has no built-in Web Bluetooth. Automatic data transfer, watch GPS and live turn prompts are NOT implemented. The RPK is only a demo screen with built-in fake turns.
5. Valhalla public endpoint can fail, throttle or reject cross-origin queries. Use a self-hosted instance for reliable use; check [Valhalla demo use guidance](https://valhalla.github.io/valhalla/start/introduction/). OSM tiles are for interactive browsing and cannot be bulk downloaded for offline map packs.
6. GPX import brings route points only, not verified instructions or stair alerts. **Do not use for safety-critical navigation.**

## Enable GitHub Pages
1. GitHub repo -> **Settings → Pages** -> **Source: GitHub Actions**.
2. Go to **Actions → Deploy WristRoute** and run **Run workflow** if needed.
3. Check actual deploy status, then open https://danilfg.github.io/watch-maps-smart-band-10-pro/ on your phone. The URL above is a candidate until deployment succeeds.

## Running locally
Use any local static server: 'python3 -m http.server 8000 -d docs'. Open http://localhost:8000.
The app shell can be cached by service worker, but actual map tiles and online routing need internet.

## RPK demo

Use [GitHub Actions — Build WristRoute RPK](https://github.com/danilfg/watch-maps-smart-band-10-pro/actions/workflows/watch.yml) to download an experimental '.rpk' **only if the build succeeds**. It is NOT yet a live navigator. See 'watch/README.md'.

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

## Create a route-specific RPK for AstroBox (working source and build workflow; device test pending)

1. On [WristRoute Pages](https://danilfg.github.io/watch-maps-smart-band-10-pro/), build a route or import a GPX. Under the export area, click **Скопировать код**.
2. Open [Build WristRoute RPK](https://github.com/danilfg/watch-maps-smart-band-10-pro/actions/workflows/watch.yml), choose **Run workflow**, paste the code in **route_code**, and start.
3. Once the workflow run succeeds, open its **Artifacts**, download `WristRoute-Band10Pro-Demo-RPK`, extract `WristRoute-Band10Pro-Demo.rpk`, and install it via AstroBox → Quick Apps. Do **not** use firmware flashing.
4. The watch app contains up to 400 simplified route points and 60 turn instructions, with manual next/previous navigation and an EXIT button. **GPS position tracking, automatic maneuvers and live phone sync are not implemented.** The RPK build must pass and be tested on the actual watch.

AstroBox does not install a bare GPX/JSON as a watch application, so this route code is compiled into a normal Xiaomi Vela RPK by `aiot-toolkit`. No GitHub personal access token is embedded in Pages. Routes are **not** added to public Releases: personalized builds remain in workflow artifacts. However, this is a public repository and run data/artifacts must not be considered private — avoid private home/work addresses.

This is intentionally a manual path (copy → workflow → artifact → AstroBox), not a seamless one-click transfer on iPhone. The companion BLE/Interconnect feature needs separate compatibility testing.
