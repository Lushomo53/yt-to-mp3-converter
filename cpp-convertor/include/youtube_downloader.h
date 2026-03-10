/*
* YouTube downloader class that downloads web page and then finds url of youtube video
* Once url is found and captured, using curl, the downloader downloads
* the required file by writing the data captured to an output file
*/

#pragma once

#include <string>

class YouTubeDownloader {
    private:
    std::string lastError; //logs errors
    void *curl; //curl handler

    //internal processes that download the youtube video
    std::string findVideoUrlInHtml(const std::string& html);
    bool downloadFile(const std::string& url, const std::string& outputFile);

    public:
    YouTubeDownloader();
    ~YouTubeDownloader();
    
    bool fetchVideo(const std::string& youtubeUrl, const std::string& outputFile);
    std::string getLastError() const;
};