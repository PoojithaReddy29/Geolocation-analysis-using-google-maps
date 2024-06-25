package com.googlemap.service;

import com.googlemap.entities.Location;

import java.util.List;

public interface LocationService {
    List<Location> getAllLocations();

    void addLocation(Location location);

}
