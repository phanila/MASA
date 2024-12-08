<template>

  <div class="map-container">
    <l-map class="map" ref="map" v-model:zoom="zoom" v-model:center="center" :useGlobalLeaflet="false">
      <l-tile-layer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        layer-type="base"
        name="Stadia Maps Basemap"
      ></l-tile-layer>
      <!-- Dynamiczne markery na mapie -->
      <l-marker
          v-for="meeting in meetings"
          :key="meeting.id"
          :lat-lng="[meeting.place.longitude, meeting.place.latitude]"
      >
        <template #tooltip>
          <span>miejsce: {{meeting.place}}</span>
          <span>data: {{meeting.date}}</span>
        </template>
        <template #popup>
          <div>
            <h3>{{ meeting.place }}</h3>
            <p><strong>kiedy? {{meeting.date }}}</strong>></p>
            <p>zainteresowani: {{meeting.interestedCount}}</p>
            <p>sprzęt: {{meeting.equipment}}</p>
            <p>warunki do obserwacji: {{meeting.ratingOfWeather}}</p>
          </div>
        </template>
      </l-marker>
    </l-map>
  </div>

  <div class="dropdown-container">
    <v-autocomplete
      v-model="selectedLocation"
      :items="locations"
      label="Search location"
      placeholder="Enter your city"
      outlined
      dense
      clearable
      @update:model-value="updateMapCenter"
    ></v-autocomplete>
  </div>

</template>

<script lang="ts" setup>
import "leaflet/dist/leaflet.css"
import {LMap, LMarker, LTileLayer} from "@vue-leaflet/vue-leaflet"
import {onMounted, ref} from 'vue'
import {apiCall} from "@/api.ts";
import {GetMeetingsRoute} from "@/apiRoutes.ts";
import type {Meeting} from "@/apiRoutes.ts";

const zoom = ref(6)
const center = ref([52.2298, 21.0118])
const meetings = ref<Meeting[]>([]);

// Funkcja do pobrania danych spotkań
const fetchMeetings = async () => {
  try {
    const route = new GetMeetingsRoute(); // Tworzymy obiekt klasy Route
    const response = await apiCall(route, {}); // Wywołujemy apiCall
    console.log(response.meetings)
    meetings.value = response.meetings; // Zapisujemy odpowiedź do stanu
    console.log('Meetings data:', meetings.value);
  } catch (error) {
    console.error('Błąd pobierania spotkań:', error);
  }
};

// Pobierz dane przy montowaniu komponentu
onMounted(() => {
  fetchMeetings();
});

// Lista lokalizacji
const locations = [
  { title: "Warszawa", coords: [52.2298, 21.0118] },
  { title: "Kraków", coords: [50.0647, 19.945] },
  { title: "Wrocław", coords: [51.1079, 17.0385] },
  { title: "Gdańsk", coords: [54.352, 18.6466] },
  { title: "Poznań", coords: [52.4064, 16.9252] },
];

const selectedLocation = ref(null);
// Aktualizacja mapy
const updateMapCenter = (newValue: any) => {
  const location = locations.find((loc) => loc.title === newValue);
  if (location) {
    center.value = location.coords;
    zoom.value*=2;
  }
  else {
    zoom.value = 6;
    center.value = [52.2298, 21.0118];
  }

};

</script>

<style scoped>
.dropdown-container{
  width: 25%;
  padding: 1rem;
  background-color: #f9f9f9;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
}

.map-container{
  height: 100%;
  width: 50%;
  position: absolute;
  right: 0;
}

.leaflet-tooltip {
  background-color: #000;
  color: #fff;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
}

.leaflet-popup-content {
  font-family: Arial, sans-serif;
  font-size: 14px;
}


</style>
