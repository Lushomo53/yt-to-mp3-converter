import { useState } from "react";
import { YoutubeIcon, Loader, Download } from "lucide-react";

function Converter() {
    const [url, setURL] = useState('');
    const [isConverting, setIsConverting] = useState(false);
    const [conversionDone, setConversionDone] = useState(false);
    const [downloadLink, setDownloadLink] = useState('');

    const handleConvert = async (e) => {
        e.preventDefault();
        if (!url) return;

        setIsConverting(true);
        setConversionDone(false);
        setDownloadLink('');

        setTimeout(() => {
            setIsConverting(false);
            setConversionDone(true);
            setDownloadLink('/downloads/song.mp3');
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Banner Header */} 
            <header className="bg-red-600 text-white py-6 shadow-lg">
                <div className="container mx-auto px-4 flex items-center justify-center gap-3">
                    <YoutubeIcon size={36} />
                    <h1 className="text-4xl font-bold">Y2MP3 Converter</h1>
                </div>
            </header>

            {/* Main Content */}
            <main className="contain mx-auto px-4 py-12 max-w-2xl">
                <form onSubmit={handleConvert} className="space-y-6">
                    <div className="relative">
                    <input 
                    type = "url"
                    value = {url}
                    onChange={(e) => setURL(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full p-4 pr-12 border-2 border-gray-200 rounded-lg focus:border-red-400 focus:outline-none transition"
                    required />
                    <YoutubeIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                </div>

                <button
                type="submit"
                disabled={isConverting}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:bg-red-300 disabled:cursor-not-allowed"
                >
                    {isConverting ? (
                        <>
                        <Loader className="animate-spin" size={20} />
                        </>
                    ) : (
                        <>
                        <Download size={20} />
                        Convert to MP3
                        </>
                    )}
                </button>
                </form>

                {/** Success Message and Download Button */} 
                {conversionDone && (
                    <div className="mt-8 p-6 bg-green-50 border-green-200 rounded-lg text-center animate-fade-in">
                        <p className="text-green-700 font-medium mb-4">
                            Conversion completed successsfully
                        </p>
                        <a
                        href={downloadLink}
                        download
                        className="inline-flex items-center gap-2 bg-green-600 hover:green-700 text-white font-semibold py-3 rounded-lg transition"
                        >
                            <Download size={20} />
                            Download MP3
                        </a>
                    </div>
                )}  
            </main>
        </div>
    );
}

export default Converter;