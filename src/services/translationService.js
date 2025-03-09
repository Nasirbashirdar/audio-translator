import axios from "axios";

export const translateText = async (text, sourceLang, targetLang) => {
  if (!text.trim()) return "";

  try {
    const response = await axios.get(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
        text
      )}&langpair=${sourceLang}|${targetLang}`
    );

    console.log("MyMemory API Response:", response.data);
    return response.data.responseData.translatedText || "";
  } catch (error) {
    console.error("Translation API Error:", error.response?.data || error);
    return "";
  }
};

export const speakText = (text, language) => {
  if (!text) return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = language;
  utterance.rate = 1; // Normal speed
  utterance.pitch = 1; // Normal pitch

  utterance.onstart = () => console.log("Speaking started...");
  utterance.onend = () => console.log("Speaking finished.");

  speechSynthesis.speak(utterance);
};
