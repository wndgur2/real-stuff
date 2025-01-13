<script setup>
  const script = document.createElement('script')
  script.onload = initMap
  script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${
    import.meta.env.VITE_API_NAVERMAP_KEY
  }`
  document.head.appendChild(script)

  function initMap() {
    /* global naver */
    var mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    }

    var map = new naver.maps.Map('map', mapOptions)
  }
</script>

<template>
  <div id="map" />
</template>

<style scoped>
  #map {
    width: 100%;
    height: 100%;
  }
</style>
