package com.converter.service;

import java.io.File;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class FileCleanupService {
    @Scheduled( fixedRate=3600000 )
    public void deleteOldFiles() {
        File downloadDir = new File("downloads");
        File[] files = downloadDir.listFiles();

        if (files != null) {
            long oneHourAgo = System.currentTimeMillis() - 3600000;

            for(File file: files) {
                if (file.lastModified() < oneHourAgo) {
                    file.delete();
                }
            }
        }
    }
}