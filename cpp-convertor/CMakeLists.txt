cmake_minimum_required(VERSION 3.10)
project(YouTubeConverter)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include_directories(include)

add_executable(converter
    src/main.cpp
    src/youtube_downloader.cpp
)

target_link_libraries(converter ${CURL_LIBRARY})