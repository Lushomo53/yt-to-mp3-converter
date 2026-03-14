/**
 * Conversion service that makes call to cpp-converter to extract audio from a yt url
 * Collects url and the output path im which the audio is written to by the converter
 * Logs process progress or error reports in terminal
 */

package com.converter.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service //annotation for springboot service recognition
public class ConversionService {
    private static final String CPP_CONVERTER_PATH; //path to the converter executable
    private static final String DOWNLOAD_DIR = "downloads/"; //directory to cache download files

    static {
        try {
            // Get backend root absolute path
            String backendRoot = new File("..").getCanonicalPath();
            // Construct absolute path to converter.exe
            CPP_CONVERTER_PATH = new File(backendRoot, "../cpp-convertor/build/converter.exe").getCanonicalPath();
        } catch (IOException e) {
            throw new RuntimeException("Failed to resolve converter path", e);
        }
    }

    public String convertVideo(String youtubeUrl) throws Exception {
        File downloadDir = new File(DOWNLOAD_DIR);
        if (!downloadDir.exists()) {
            downloadDir.mkdirs(); //make download directory if not found
        }

        String filename = UUID.randomUUID().toString() + ".mp3"; //generate random filename (mp3)
        String outputPath = DOWNLOAD_DIR + filename; //construct full path for download

        ProcessBuilder processBuilder = new ProcessBuilder(
            CPP_CONVERTER_PATH,
            youtubeUrl,
            outputPath
        ); //configure converter process with necessary args

        System.out.println("Executing Process: " + String.join("", processBuilder.command()));

        Process process = processBuilder.start();  //start process

        //log progress output from yt-dlp
        BufferedReader outputReader = new BufferedReader(new InputStreamReader(process.getInputStream()));

        String line;
        while ((line = outputReader.readLine()) != null) {
            System.out.println("C++ Output: " + line); //print log to terminal
        }

        //log any errors occured during the conversion process
        BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));

        while ((line = errorReader.readLine()) != null) {
            System.out.println("C++ Error: " + line);
        }

        int exitCode = process.waitFor();
        System.out.println("Converter ended with code: " + exitCode);

        if (exitCode != 0) {  //throw exception in case of error code returned
            throw new Exception("C++ converter ended with code: " + exitCode);
        }

        //open output file to be written to and check for successful file creation in download cache
        File outputFile = new File(outputPath);
        if (!outputFile.exists()) {
            throw new Exception("Output file not created");
        }

        System.out.println("Conversion successful: " + filename);
        return filename;
    }
}
