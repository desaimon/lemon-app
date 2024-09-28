import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserContextProps {
  profileImageUri: string | null;
  setProfileImageUri: (uri: string | null) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profileImageUri, setProfileImageUri] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ profileImageUri, setProfileImageUri }}>
      {children}
    </UserContext.Provider>
  );
};