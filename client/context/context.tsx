import React from 'react';

type ContextProps = { 
    value: any;
    setValue: any;
  };
  
const DashboardContext = React.createContext<Partial<ContextProps>>({});

export const DashboardProvider = DashboardContext.Provider;
export const DashboardContextConsumer = DashboardContext.Consumer;

export default DashboardContext;
