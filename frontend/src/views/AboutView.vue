<template>
  <div class="wrapper">
    <main>
      <l-map class="map" ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">
        <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      layer-type="base"
                      name="Stadia Maps Basemap"></l-tile-layer>
      </l-map>
    </main>
  </div>
</template>

<script lang="ts" setup>
import "leaflet/dist/leaflet.css"
import { LMap, LTileLayer } from "@vue-leaflet/vue-leaflet"
import { ref } from 'vue'

const zoom = ref(6)
const center = ref([38, 139.69])
</script>

<style scoped>
main{
  height: 100%;
  width: 100%;
}

.wrapper{
  height: 300px;
  width: 300px;
}

</style>
