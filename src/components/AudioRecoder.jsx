import React, { useEffect } from "react";
import useAudioRecorder from "../hooks/useAudioRecoder";

const AudioRecorder = ({ onAudioRecorded }) => {
  const { recording, audioBlob, startRecording, stopRecording, error } =
    useAudioRecorder();

  useEffect(() => {
    if (audioBlob && onAudioRecorded) {
      onAudioRecorded(audioBlob);
    }
  }, [audioBlob]); // Removed `onAudioRecorded` to avoid unnecessary re-renders

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md w-full max-w-md mx-auto text-center">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Audio Recorder
      </h2>

      {/* Start & Stop Buttons */}
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={startRecording}
          disabled={recording}
          className={`px-4 py-2 rounded-md text-white transition-colors duration-200 ${
            recording
              ? "bg-gray-400 dark:bg-gray-600"
              : "bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          }`}
        >
          🎤 Start Recording
        </button>
        <button
          onClick={stopRecording}
          disabled={!recording}
          className={`px-4 py-2 rounded-md text-white transition-colors duration-200 ${
            !recording
              ? "bg-gray-400 dark:bg-gray-600"
              : "bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800"
          }`}
        >
          ⏹ Stop Recording
        </button>
      </div>

      {/* Recording Indicator */}
      {recording && (
        <p className="text-red-500 dark:text-red-400 font-medium">
          Recording...
        </p>
      )}

      {/* Error Display */}
      {error && (
        <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
      )}

      {/* Audio Playback */}
      {audioBlob && !recording && (
        <audio controls className="w-full mt-4">
          <source src={URL.createObjectURL(audioBlob)} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default AudioRecorder;
