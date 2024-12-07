package com.example.backend.model;

public class User {

    private String login;
    private String password;
    private String email;

    private float rating;
    private String equipment;

    public String getLogin() {
        return login;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public float getRating() {
        return rating;
    }

    public String getEquipment() {
        return equipment;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public void setEquipment(String equipment) {
        this.equipment = equipment;
    }
}
