# YouTube to MP3 Converter

A full-stack application that converts YouTube videos to MP3 files. Built as a multi-language integration project using React, Java Spring Boot, and C++.

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React + Vite + Tailwind CSS + Lucide React |
| Backend | Java 17 + Spring Boot + Gradle |
| Converter | C++ (libcurl + yt-dlp) |
| Build Tools | Gradle (backend), Vite (frontend) |
| Platform | Windows (MSYS2/MinGW) |

---

## Features

- Convert YouTube URLs to downloadable MP3 files
- Responsive UI with real-time conversion status
- REST API backend that invokes a compiled C++ executable
- Clean separation of concerns across frontend, backend, and converter layers

---

## Project Structure

```
youtube-mp3-converter/
├── frontend/                   # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   └── Converter.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/                    # Java Spring Boot
│   ├── src/main/java/com/converter/
│   │   ├── controller/
│   │   ├── service/
│   │   └── Application.java
│   ├── build.gradle
│   └── gradlew
│
└── cpp-convertor/              # C++ converter
    ├── src/
    │   ├── main.cpp
    │   ├── youtube_downloader.cpp
    │   └── converter.cpp
    ├── include/
    ├── CMakeLists.txt
    └── build/
```

---

## Prerequisites

- **Node.js** v16+
- **Java** 17+
- **Gradle** (or use the included wrapper)
- **MSYS2** with MinGW (for C++ compilation)
- **CMake**

### MSYS2 Setup (Windows)

1. Install [MSYS2](https://www.msys2.org/)
2. Open the UCRT64 terminal and run:

```bash
pacman -Syu
pacman -S mingw-w64-ucrt-x86_64-gcc \
          mingw-w64-ucrt-x86_64-curl \
          mingw-w64-ucrt-x86_64-make \
          mingw-w64-ucrt-x86_64-cmake \
          mingw-w64-ucrt-x86_64-yt-dlp \
          mingw-w64-ucrt-x86_64-ffmpeg
```

3. Add `C:\msys64\ucrt64\bin` to your system `PATH`.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Lushomo53/youtube-mp3-converter.git
cd youtube-mp3-converter
```

### 2. Build the C++ Converter

```bash
cd cpp-convertor
mkdir build && cd build
cmake .. -G "MinGW Makefiles"
mingw32-make
```

This produces `converter.exe` inside the `build/` directory.

### 3. Build the Backend

```bash
cd ../../backend
./gradlew build
```

> If needed, update the path to `converter.exe` in `ConversionService.java`.

### 4. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

### 5. Run the Application

**Backend** (Terminal 1):

```bash
cd backend
./gradlew bootRun
```

The API will be available at `http://localhost:8080`.

**Frontend** (Terminal 2):

```bash
cd frontend
npm run dev
```

The UI will be available at `http://localhost:5173`.

---

## Usage

1. Open `http://localhost:5173` in your browser.
2. Paste a YouTube URL into the input field.
3. Click **Convert** and wait for the conversion to complete.
4. Download the resulting MP3 file.

---

## Dependencies & Acknowledgements

- [yt-dlp](https://github.com/yt-dlp/yt-dlp) — YouTube media extraction
- [FFmpeg](https://ffmpeg.org/) — Audio conversion
- [Tailwind CSS](https://tailwindcss.com/) — UI styling
- [Lucide Icons](https://lucide.dev/) — Icon library
- [React](https://react.dev/) + [Vite](https://vitejs.dev/) — Frontend framework and build tool
- [Spring Boot](https://spring.io/projects/spring-boot) — Backend framework

---

## License

This project is licensed under the [MIT License](LICENSE).
