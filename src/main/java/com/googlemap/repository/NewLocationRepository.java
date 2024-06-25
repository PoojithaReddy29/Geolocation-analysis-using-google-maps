package com.googlemap.repository;

import com.googlemap.entities.NewLocation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewLocationRepository extends JpaRepository<NewLocation, Long> {

}
