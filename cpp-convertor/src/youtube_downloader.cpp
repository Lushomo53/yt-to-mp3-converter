//implementation of youtube downloader

#include "../include/youtube_downloader.h"
#include <iostream>
#include <string>
#include <fstream>
#include <cstdlib>
#include <cstdio>


YouTubeDownloader::YouTubeDownloader() {}

YouTubeDownloader::~YouTubeDownloader() {}

bool YouTubeDownloader::fetchVideo(const std::string& youtubeURL, const std::string& outputFile) {
    std::string command = "yt-dlp --quiet -o \"" + outputFile + "\" --extract-audio --audio-format mp3 " + youtubeURL;
    int result = system(command.c_str());
    
    if (result == 0) {
        std::cout << "Mp3 download complete" << std::endl;
        return true;
    } else {
        lastError = "yt-dlp failed with code: " + std::to_string(result);
        std::cout << "Error: " << lastError << std::endl;
        return false;
    }
}

std::string YouTubeDownloader::findVideoUrlInHtml(const std::string& html) {
    std::cout << "Searching for video url in html of length" << html.length() << std::endl;
    return "";
}

bool YouTubeDownloader::downloadFile(const std::string& url, const std::string& outputFile) {
    std::cout << "Downloading from url: " << url << std::endl;
    std::cout << "Writing to output file: " << url << std::endl;
    return false;
}

std::string YouTubeDownloader::getLastError() const { return lastError; }