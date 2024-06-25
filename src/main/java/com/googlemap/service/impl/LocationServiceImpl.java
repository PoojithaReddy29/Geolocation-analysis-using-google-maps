package com.googlemap.service.impl;

import com.googlemap.entities.Location;
import com.googlemap.repository.LocationRepository;
import com.googlemap.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocationServiceImpl implements LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Override
    public List<Location> getAllLocations() {
        return locationRepository.findAll();
    }

    @Override
    public void addLocation(Location location) {
        locationRepository.save(location);
    }

}
