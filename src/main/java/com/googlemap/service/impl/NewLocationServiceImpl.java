package com.googlemap.service.impl;

import com.googlemap.entities.NewLocation;
import com.googlemap.repository.NewLocationRepository;
import com.googlemap.service.NewLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NewLocationServiceImpl implements NewLocationService {

    @Autowired
    private NewLocationRepository newLocationRepository;

    @Override
    public List<NewLocation> getAllNewLocations() {
        return newLocationRepository.findAll();
    }

    @Override
    public void addNewLocation(NewLocation newLocation) {
        newLocationRepository.save(newLocation);
    }
}
