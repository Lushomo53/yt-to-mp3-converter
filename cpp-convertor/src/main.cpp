#include <iostream>
#include "../include/youtube_downloader.h"

int main(int argc, char* argv[]) {
    if (argc != 3) {
        std::cout << "{\"sucess\":false,\"error\":\"Usage: converter <url> <output>\"}";
        return 1;
    }

    std::string url = argv[1];
    std::string output = argv[2];

    YouTubeDownloader downloader;
    bool success = downloader.fetchVideo(url, output);

    if (success) {
        std::cout << "{\"success\":true,\"file\":\"" << output << "\"}";
        return 0;
    } else {
        std::cout << "{\"sucess\":false,\"error\":\"" << downloader.getLastError() << "\"}";
        return 1;
    }
}
