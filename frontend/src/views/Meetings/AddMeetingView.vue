<template>
  <v-container class="v-container">
    <v-card>
      <v-card-title>Add Meeting</v-card-title>
      <div class="map-container">
        <l-map class="map" ref="map" v-model:zoom="zoom" v-model:center="center" @click="onClick" :options="{
          attributionControl: false,
        }" :useGlobalLeaflet="false">
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
          v-model="meeting.name"
          label="Name"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="meeting.description"
          label="Description"
          outlined
        ></v-text-field>
        <v-text-field
          type="datetime-local"
          v-model="meeting.date"
          label="Date"
          outlined
        ></v-text-field>
        <v-btn
          color="primary"
          @click="addMeeting"
        >
          Add Meeting
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { LMap, LTileLayer, LMarker } from '@vue-leaflet/vue-leaflet'
import { AddMeetingRoute, type Meeting } from '@/apiRoutes.ts'
import { apiCall } from '@/api.ts'

const meeting = ref<Meeting>({
  name: '',
  description: '',
  date: '',
  place: {
    lat: 0,
    lon: 0,
  },
})
const zoom = ref(6)
const center = ref([52.2298, 21.0118])
const marker = ref<[number, number] | null>(null)

const onClick = (evt) => {
  const { lat, lng } = evt.latlng
  marker.value = [lat, lng]
  console.log('Marker set at:', marker.value)
}

const addMeeting = async () => {
  meeting.value.place = {
    lat: marker.value[0],
    lon: marker.value[1],
  }
  try{
    await apiCall(new AddMeetingRoute(), { meeting: meeting.value });
  }catch (error){
    console.error('Error adding meeting:', error);
  }

}
</script>

<style scoped>
.map-container {
  height: 300px;
  width: 300px;
}
</style>
