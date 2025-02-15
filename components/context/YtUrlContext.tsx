'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface YtUrlContextType {
  ytUrl: string | null;
  setYtUrl: React.Dispatch<React.SetStateAction<string | null>>;
}

const YtUrlContext = createContext<YtUrlContextType | undefined>(undefined);

// Provider component
export const YtUrlProvider = ({ children }: { children: ReactNode }) => {
  const [ytUrl, setYtUrl] = useState<string | null>(null);

  return (
    <YtUrlContext.Provider value={{ ytUrl, setYtUrl }}>
      {children}
    </YtUrlContext.Provider>
  );
};

// Custom hook to use the context
export const useYtUrl = () => {
  const context = useContext(YtUrlContext);
  if (!context) {
    throw new Error('useYtUrl must be used within a YtUrlProvider');
  }
  return context;
};
