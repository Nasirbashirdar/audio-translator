import React, { useState, useEffect } from "react";
import AudioRecorder from "./components/AudioRecoder";
import TranslationDisplay from "./components/TranslationDisplay";
import LanguageSelector from "./components/LanguageSelector";
import useSpeechRecognition from "./hooks/useSpeechRecognition";
import { translateText, speakText } from "./services/translationService";
import LANGUAGES from "./constants/languages";

function App() {
  const [sourceLanguage, setSourceLanguage] = useState("en-US");
  const [targetLanguage, setTargetLanguage] = useState("es-ES");
  const [translatedText, setTranslatedText] = useState("");
  const [autoTranslate, setAutoTranslate] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [inputText, setInputText] = useState(""); // State for typed text

  const {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
    error: recognitionError,
  } = useSpeechRecognition(sourceLanguage);

  useEffect(() => {
    if (transcript && autoTranslate) {
      const translationTimeout = setTimeout(async () => {
        try {
          const translated = await translateText(
            transcript,
            sourceLanguage,
            targetLanguage
          );
          setTranslatedText(translated);
          speakText(translated, targetLanguage);
        } catch (error) {
          console.error("Translation error:", error);
        }
      }, 1000);
      return () => clearTimeout(translationTimeout);
    }
  }, [transcript, sourceLanguage, targetLanguage, autoTranslate]);

  const handleSourceLanguageChange = (language) => {
    setSourceLanguage(language);
    resetTranscript();
    setTranslatedText("");
    if (isListening) {
      stopListening();
      setTimeout(() => startListening(), 100);
    }
  };

  // Function to handle translation of typed text
  const handleTranslateTypedText = async () => {
    if (!inputText.trim()) return; // Don't translate empty text
    try {
      const translated = await translateText(
        inputText,
        sourceLanguage,
        targetLanguage
      );
      setTranslatedText(translated);
      speakText(translated, targetLanguage);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  return (
    <div
      className={`${
        darkMode ? "dark" : ""
      } min-h-screen bg-gray-100 dark:bg-gray-900`}
    >
      <div className="p-6 w-full h-full bg-white dark:bg-gray-900">
        {/* Dark Mode Toggle */}
        <div className="flex justify-end">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 rounded-md"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <header className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Audio Translation App
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Translate speech or text in real-time with subtitle display
          </p>
        </header>

        {/* Language Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <LanguageSelector
            label="Source Language"
            selectedLanguage={sourceLanguage}
            onChange={handleSourceLanguageChange}
            languages={LANGUAGES}
          />
          <LanguageSelector
            label="Target Language"
            selectedLanguage={targetLanguage}
            onChange={setTargetLanguage}
            languages={LANGUAGES}
          />
        </div>

        {/* Auto-translate Toggle */}
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="checkbox"
            checked={autoTranslate}
            onChange={() => setAutoTranslate(!autoTranslate)}
            className="w-4 h-4"
          />
          <span className="text-gray-700 dark:text-gray-300">
            Auto Translate
          </span>
        </div>

        {/* Speech Recognition Controls */}
        <div className="flex space-x-4 mb-4">
          <button
            onClick={isListening ? stopListening : startListening}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            {isListening ? "Stop Listening" : "Start Listening"}
          </button>
          <button
            onClick={resetTranscript}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-800"
          >
            Reset
          </button>
        </div>

        {recognitionError && <p className="text-red-500">{recognitionError}</p>}
        {isListening && <p className="text-green-500">Listening...</p>}

        {/* Text Input for Manual Translation */}
        <div className="mb-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type text to translate..."
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md dark:bg-gray-800 dark:text-gray-100"
            rows="3"
          />
          <button
            onClick={handleTranslateTypedText}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800"
          >
            Translate Text
          </button>
        </div>

        {/* Audio Recorder */}
        <AudioRecorder onAudioRecorded={console.log} />

        {/* Display Transcription & Translation */}
        <TranslationDisplay
          originalText={transcript}
          translatedText={translatedText}
          targetLanguage={targetLanguage}
        />
      </div>
    </div>
  );
}

export default App;
