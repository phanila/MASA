package com.example.backend.model;

public class Place {
    private String name;
    private float rating;
    private Double latitude;
    private Double longitude;

    public String getName() {
        return name;
    }

    public float getRating() {
        return rating;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public Place getPlaces() {
        return this;
    }

    private boolean calculateDistance(Place other, int deseiredDistance) {
        final int R = 6371; // Radius of the Earth in km

        // Convert degrees to radians
        double lat1Rad = Math.toRadians(latitude);
        double lon1Rad = Math.toRadians(longitude);
        double lat2Rad = Math.toRadians(other.getLatitude());
        double lon2Rad = Math.toRadians(other.getLongitude());

        // Difference in coordinates
        double deltaLat = lat2Rad - lat1Rad;
        double deltaLon = lon2Rad - lon1Rad;

        // Haversine formula
        double a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                Math.cos(lat1Rad) * Math.cos(lat2Rad) *
                        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Distance in km
        return R * c < deseiredDistance;

    }
}


