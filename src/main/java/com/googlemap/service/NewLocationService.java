package com.googlemap.service;

import com.googlemap.entities.NewLocation;

import java.util.List;

public interface NewLocationService {
    List<NewLocation> getAllNewLocations();

    void addNewLocation(NewLocation newLocation);
}
