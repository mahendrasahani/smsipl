import React, { createContext, useState, useContext } from 'react';
import config from '../../config.json';

const ApiUrlContext = createContext();

export const ApiUrlProvider = ({ children }) => {
  // config.apiUrl
  const [apiUrl, setApiUrl] = useState(config.apiUrl);

  return (
    <ApiUrlContext.Provider value={{ apiUrl, setApiUrl }}>
      {children}
    </ApiUrlContext.Provider>
  );
};

export const useApiUrl = () => {
  return useContext(ApiUrlContext);
};
