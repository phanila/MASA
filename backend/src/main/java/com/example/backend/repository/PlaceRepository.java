package com.example.backend.repository;


import com.example.backend.model.Place;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PlaceRepository extends JpaRepository<Place, Long> {
    Optional<Place> findByName(String name);
}
