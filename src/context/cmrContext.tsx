import React, { useState } from "react";

interface CmrContextProps {
  projectId: number | undefined;
  setProjectId: (id: number) => void;
  projectName: string | undefined;
  setProjectName: (val: string) => void;
}

export const CmrContext = React.createContext<CmrContextProps>({
  projectId: undefined,
  projectName: '',
  setProjectName: () => {},
  setProjectId: () => {},
});

export const CmrContextProvider = ({ children }: any) => {
  const [projectId, setProjectId] = useState<number | undefined>(undefined);
  const [projectName, setProjectName] = useState<string | undefined>(undefined);

  return (
    <CmrContext.Provider
      value={{
        projectName,
        setProjectName,
        projectId,
        setProjectId,
      }}
    >
      {children}
    </CmrContext.Provider>
  );
};
