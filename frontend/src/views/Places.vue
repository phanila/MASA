<template>
  <v-container class="v-container">
    <v-card>
      <v-card-title>Add Place</v-card-title>
      <div class="map-container">
        <l-map
          class="map"
          ref="map"
          v-model:zoom="zoom"
          v-model:center="center"
          @click="onMapClick"
          :options="{
            attributionControl: false,
          }"
          :useGlobalLeaflet="false"
        >
          <l-tile-layer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            layer-type="base"
            name="OSM map"
          ></l-tile-layer>
          <l-marker v-if="marker" :lat-lng="marker"></l-marker>
        </l-map>
      </div>
      <v-card-text>
        <v-text-field
          v-model="place.name"
          label="Name"
          outlined
        ></v-text-field>
        <v-btn
          color="primary"
          @click="addPlace"
        >
          Add Place
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { AddPlaceRoute, type Place } from '@/apiRoutes.ts'
import { apiCall } from '@/api.ts'

const place = ref<Place>({
  name: '',
  localization: {
    lat: 0,
    lon: 0,
  },
})
const zoom = ref(6)
const center = ref([52.2298, 21.0118])
const marker = ref<[number, number] | null>(null)

const onMapClick = (evt) => {
  const { lat, lng } = evt.latlng
  marker.value = [lat, lng]
  console.log('Marker set at:', marker.value)
}

const addPlace = async () => {
  if (!marker.value) {
    console.error('Please select a location on the map')
    return
  }

  place.value.localization = {
    lat: marker.value[0],
    lon: marker.value[1],
  }

  try {
    await apiCall(new AddPlaceRoute(), { place: place.value })
    console.log('Place added successfully:', place.value)
  } catch (error) {
    console.error('Error adding place:', error)
  }
}
</script>

<style scoped>
.map-container {
  height: 300px;
  width: 300px;
}
</style>
