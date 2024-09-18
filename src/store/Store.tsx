import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for your data
interface Data {
  [key: string]: any; // You can adjust the value type as per your data structure
}

// Define the type for the context value
interface StoreContextType {
  data: Data;
  setData: React.Dispatch<React.SetStateAction<Data>>;
}

// Create a context with the context value type
export const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Custom hook to use the context
// export const useStore = () => {
//   const context = useContext(StoreContext);
//   if (!context) {
//     throw new Error("useStore must be used within a StoreProvider");
//   }
//   return context;
// };

// Create a provider component
interface StoreProviderProps {
  children: ReactNode; // Accept any children components
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [data, setData] = useState<Data>({});

  return (
    <StoreContext.Provider value={{ data, setData }}>
      {children}
    </StoreContext.Provider>
  );
};
