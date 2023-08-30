import React, { useState } from "react";

interface CmrContextProps {
  projectId: number | undefined;
  setProjectId: (id: number) => void;
}

export const CmrContext = React.createContext<CmrContextProps>({
  projectId: undefined,
  setProjectId: () => {},
});

export const CmrContextProvider = ({ children }: any) => {
  const [projectId, setProjectId] = useState<number | undefined>(undefined);

  return (
    <CmrContext.Provider
      value={{
        projectId,
        setProjectId,
      }}
    >
      {children}
    </CmrContext.Provider>
  );
};
