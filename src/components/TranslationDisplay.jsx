import React from "react";

const TranslationDisplay = ({
  originalText,
  translatedText,
  targetLanguage,
}) => {
  const speakTranslation = () => {
    if (!translatedText) return;

    const speech = new SpeechSynthesisUtterance(translatedText);
    speech.lang = targetLanguage; // Use the target language code
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="mb-4">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Original Text:
        </h3>
        <div className="mt-1 p-3 bg-gray-100 dark:bg-gray-700 rounded-md min-h-16">
          {originalText || (
            <span className="text-gray-400 dark:text-gray-300 italic">
              No speech detected
            </span>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
          Translation:
        </h3>
        <div className="mt-1 p-3 bg-blue-50 dark:bg-blue-900 rounded-md min-h-16">
          {translatedText || (
            <span className="text-gray-400 dark:text-gray-300 italic">
              Translation will appear here
            </span>
          )}
        </div>
        {translatedText && (
          <button
            onClick={speakTranslation}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            <span className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217z"
                  clipRule="evenodd"
                />
                <path d="M14.293 5.293a1 1 0 011.414 0L17 6.586l1.293-1.293a1 1 0 111.414 1.414L18.414 8l1.293 1.293a1 1 0 01-1.414 1.414L17 9.414l-1.293 1.293a1 1 0 01-1.414-1.414L15.586 8l-1.293-1.293a1 1 0 010-1.414z" />
              </svg>
              Speak Translation
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TranslationDisplay;
