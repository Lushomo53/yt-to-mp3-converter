/**
 * Controller that handles requests from front end, mainly conversion and download
 * works with springboot to handle REST API calls (JSON)
 * through the conversion service it handles conversions of yt urls to mp3 files
 */

package com.converter.controller;

import java.io.File;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.converter.service.ConversionService;

@RestController
@RequestMapping("/api") //root 
@CrossOrigin(origins = "http://localhost:5173") //connection to react port
public class ConversionController {
    @Autowired
    private ConversionService service;

    @PostMapping("/convert")
    public ResponseEntity<?> convert(@RequestBody Map<String, String> request) {
        String url = request.get("url"); //parse json and retrieve url string
        System.out.println("URL Recieved URL: " + url);

        if (url == null || url.trim().isEmpty()) { //ensure thr url is not an empty string
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "error", "URL required"
            ));
        }

        try {
            //handle url conversion
            String filename = service.convertVideo(url);

            //return sucess status to frontend
            return ResponseEntity.ok(Map.of(
                "success", true,
                "filename", filename,
                "downloadUrl", "/api/downloads/" + filename
            ));
        } catch (Exception e) {
            //report error
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "error", e.getMessage()
            ));
        }
    }

    //downloads mp3 file to local storage
    @GetMapping("/downloads/{filename}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {
        try {
            //fetch mp3 file from downloads cache
            File file = new File("downloads/" + filename);

            System.out.println("Requested file: " + filename);
            System.out.println("File exists?: " + file.exists());
            System.out.println("Absolute Path: " + file.getAbsolutePath());

            if (!file.exists()) {
                return ResponseEntity.notFound().build();
            }

            //execute download
            Resource resource = new FileSystemResource(file);

            HttpHeaders headers = new HttpHeaders();

            headers.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"");

            return ResponseEntity.ok()
                    .headers(headers)
                    .contentLength(file.length())
                    .contentType(MediaType.APPLICATION_OCTET_STREAM)
                    .body(resource);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }
}
