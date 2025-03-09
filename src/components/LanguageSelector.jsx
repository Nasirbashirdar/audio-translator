import React from "react";

const LanguageSelector = ({ selectedLanguage, onChange, label, languages }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
        {label}
      </label>
      <select
        value={selectedLanguage}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:text-gray-200"
      >
        {Object.entries(languages).map(([code, name]) => (
          <option
            key={code}
            value={code}
            className="text-gray-900 dark:text-gray-300"
          >
            {name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;
