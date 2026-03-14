import { useState } from "react";
import {
  YoutubeIcon,
  Loader,
  Download,
  AlertCircle,
  CheckCircle,
  Music,
  ArrowRight,
  Sparkles,
  Copy,
  ExternalLink,
} from "lucide-react";

function Converter() {
  const [url, setURL] = useState("");
  const [isConverting, setIsConverting] = useState(false);
  const [conversionDone, setConversionDone] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [error, setError] = useState("");

  const handleConvert = async (e) => {
    e.preventDefault();
    if (!url) return;

    setIsConverting(true);
    setConversionDone(false);
    setDownloadLink("");
    setError("");

    try {
      const response = await fetch("http://localhost:8080/api/convert", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (data.success) {
        setConversionDone(true);
        const downloadUrl = `http://localhost:8080${data.downloadUrl}`;
        setDownloadLink(downloadUrl);
      } else {
        setError(data.error || "Conversion failed");
      }
    } catch (err) {
      setError("Failed to connect to server.");
      console.error("Error: ", err);
    } finally {
      setIsConverting(false);
    }
  };

  const copyToClipboard = () => {
    if (downloadLink) {
      navigator.clipboard.writeText(downloadLink);
      // Optional: show a toast notification (simplified here)
      alert("Download link copied!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-red-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Card */}
      <div className="relative w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-6 md:p-10">
        {/* Header with icon */}
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-red-500 to-pink-500 p-4 rounded-full mb-4 shadow-lg">
            <YoutubeIcon size={48} className="text-white" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white text-center bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-pink-300">
            Y2MP3 Converter
          </h1>
          <p className="text-gray-300 text-center mt-2 max-w-md">
            Convert YouTube videos to MP3 instantly • Free • High Quality
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleConvert} className="space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-xl blur opacity-30 group-hover:opacity-70 transition duration-300"></div>
            <div className="relative flex items-center">
              <input
                type="url"
                value={url}
                onChange={(e) => setURL(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="w-full px-6 py-4 pr-32 bg-gray-900/80 text-white placeholder-gray-400 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition disabled:opacity-50"
                required
                disabled={isConverting}
              />
              <YoutubeIcon className="absolute right-4 text-gray-400 group-hover:text-red-400 transition" size={24} />
            </div>
          </div>

          {/* Convert Button */}
          <button
            type="submit"
            disabled={isConverting}
            className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-pink-600 p-[2px] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2E8F0_0%,#09090B_50%,#E2E8F0_100%)] group-hover:opacity-100 opacity-0 transition"></span>
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-slate-900/90 px-8 py-4 text-lg font-semibold text-white backdrop-blur-3xl gap-3">
              {isConverting ? (
                <>
                  <Loader className="animate-spin" size={24} />
                  Converting...
                </>
              ) : (
                <>
                  <Download size={24} />
                  Convert to MP3
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="mt-8 p-4 bg-red-900/50 border border-red-700 rounded-xl flex items-center gap-3 text-red-200 backdrop-blur-sm">
            <AlertCircle size={20} className="flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Section */}
        {conversionDone && (
          <div className="mt-8 p-6 bg-green-900/30 border border-green-700/50 rounded-xl backdrop-blur-sm animate-fade-in-up">
            <div className="flex items-center gap-3 text-green-300 mb-4">
              <CheckCircle size={24} />
              <span className="font-medium">Conversion completed successfully!</span>
              <Sparkles size={20} className="text-yellow-400 animate-pulse" />
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Download Button */}
              <a
                href={downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 shadow-lg"
              >
                <Download size={20} />
                Download MP3
              </a>

              {/* Copy Link Button */}
              <button
                onClick={copyToClipboard}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all hover:scale-105 border border-gray-600"
              >
                <Copy size={20} />
                Copy Download Link
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-400 flex items-center justify-center gap-1">
              <Music size={12} />
              Your file is ready • Click to download or copy link
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-2">
            <span>Free for everyone</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>No registration</span>
            <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
            <span>Fast conversion</span>
          </p>
        </div>
      </div>

      {/* Tailwind custom animations (add to global CSS) */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Converter;