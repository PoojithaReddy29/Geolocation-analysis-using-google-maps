package com.googlemap.controllers;

import com.googlemap.entities.Location;
import com.googlemap.service.LocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/google-map")
@CrossOrigin("*")
public class LocationController {
    @Autowired
    private LocationService locationService;

    @GetMapping(value = "/test")
    public String testApi() {
        return "API is working";
    }

    @PostMapping(value = "/location")
    public void addLocation(@RequestBody Location location) throws IOException {
        locationService.addLocation(location);
    }
    @GetMapping(value = "/locations")
    public List<Location> getAllLocations() throws IOException {
        return locationService.getAllLocations();
    }

}
