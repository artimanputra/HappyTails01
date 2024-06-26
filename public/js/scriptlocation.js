/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
async function initMap(lat,lng) {
    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const myLatlng = { lat:lat, lng: lng};
    const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: myLatlng,
      mapId: "DEMO_MAP_ID",
    });
    const marker = new google.maps.marker.AdvancedMarkerElement({
      position: myLatlng,
      map,
      title: "Click to zoom",
    });
  
    map.addListener("center_changed", () => {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      window.setTimeout(() => {
        map.panTo(marker.position);
      }, 3000);
    });
    marker.addListener("click", () => {
      map.setZoom(8);
      map.setCenter(marker.position);
    });
  }
  
  initMap(12.97,77.59);