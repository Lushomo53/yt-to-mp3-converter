package com.converter.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.UUID;

import org.springframework.stereotype.Service;

@Service
public class ConversionService {
    private static final String CPP_CONVERTER_PATH;
    private static final String DOWNLOAD_DIR = "downloads/";

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
            downloadDir.mkdirs();
        }

        String filename = UUID.randomUUID().toString() + ".mp3";
        String outputPath = DOWNLOAD_DIR + filename;

        ProcessBuilder processBuilder = new ProcessBuilder(
            CPP_CONVERTER_PATH,
            youtubeUrl,
            outputPath
        );

        System.out.println("Executing Process: " + String.join("", processBuilder.command()));

        Process process = processBuilder.start();

        BufferedReader outputReader = new BufferedReader(new InputStreamReader(process.getInputStream()));

        String line;
        while ((line = outputReader.readLine()) != null) {
            System.out.println("C++ Output: " + line);
        }

        BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));

        while ((line = errorReader.readLine()) != null) {
            System.out.println("C++ Error: " + line);
        }

        int exitCode = process.waitFor();
        System.out.println("Converter ended with code: " + exitCode);

        if (exitCode != 0) {
            throw new Exception("C++ converter ended with code: " + exitCode);
        }

        File outputFile = new File(outputPath);
        if (!outputFile.exists()) {
            throw new Exception("Output file not created");
        }

        System.out.println("Conversion successful: " + filename);
        return filename;
    }
}
