package com.googlemap.controllers;

import com.googlemap.entities.NewLocation;
import com.googlemap.service.NewLocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/google-map")
@CrossOrigin("*")
public class NewLocationController {
    @Autowired
    private NewLocationService newLocationService;

    @GetMapping(value = "/tests")
    public String testApi() {
        return "new location API is working";
    }

    @PostMapping(value = "/new-location")
    public void addNewLocation(@RequestBody NewLocation newLocation) throws IOException {
        newLocationService.addNewLocation(newLocation);
    }

    @GetMapping(value = "/new-locations")
    public List<NewLocation> getAllNewLocations() throws IOException {
        return newLocationService.getAllNewLocations();
    }
}
