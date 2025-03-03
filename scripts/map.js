((g) => {
  var h,
    a,
    k,
    p = "The Google Maps JavaScript API",
    c = "google",
    l = "importLibrary",
    q = "__ib__",
    m = document,
    b = window;
  b = b[c] || (b[c] = {});
  var d = b.maps || (b.maps = {}),
    r = new Set(),
    e = new URLSearchParams(),
    u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g)
          e.set(
            k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
            g[k]
          );
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.nonce || "";
        m.head.append(a);
      }));
  d[l]
    ? console.warn(p + " only loads once. Ignoring:", g)
    : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
})({ key: "AIzaSyDrQXaMFHXz1rOnonPunuAxjqgGqL0OtLg", v: "weekly" });

/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Initialize and add the map
let map;

const chicagoCoords = { lat: 41.9, lng: -87.65 };
const newYorkCoords = { lat: 40.75, lng: -74 };
const kansasCoords = { lat: 39.10, lng: -94.58 };

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    zoom: 5,
    center: chicagoCoords,
    mapId: "DEMO_MAP_ID",
  });
}

initMap();

async function initMarkers() {
  const { AdvancedMarkerElement  } = await google.maps.importLibrary("marker");

  new AdvancedMarkerElement({
    map,
    position: chicagoCoords,
  });

  new AdvancedMarkerElement({
    map,
    position: newYorkCoords,
  });

  new AdvancedMarkerElement({
    map,
    position: kansasCoords,
  });
}

initMarkers();

async function initLines() {
  const { Polyline } = await google.maps.importLibrary("maps");

  const flightPlanCoordinates = [
    chicagoCoords,
    newYorkCoords,
    kansasCoords,
    chicagoCoords,
  ];

  const flightPath = new Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: "#FF0000",
    strokeOpacity: 1.0,
    strokeWeight: 2,
  });

  flightPath.setMap(map);
}

initLines();

async function initTrafficLayer() {
  const { TrafficLayer } = await google.maps.importLibrary("maps");

  const trafficLayer = new TrafficLayer();

  trafficLayer.setMap(map);
}

initTrafficLayer();