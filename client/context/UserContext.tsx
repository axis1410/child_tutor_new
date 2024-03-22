import { ReactNode, createContext, useContext, useState } from "react";

type UserContextType = {
  id: string | null;
  setId: (id: string) => void;
  email: string | null;
  setEmail: (email: string) => void;
  fullName: string | null;
  setFullName: (fullName: string) => void;
  isVerified: boolean;
  setIsVerified: (value: boolean) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [id, setId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);

  return (
    <UserContext.Provider
      value={{ id, setId, email, setEmail, fullName, setFullName, isVerified, setIsVerified }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return context;
}
