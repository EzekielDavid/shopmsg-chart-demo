import React from 'react';


const DashboardContext = React.createContext({});

export const DashboardProvider = DashboardContext.Provider;
export const DashboardContextConsumer = DashboardContext.Consumer;

export default DashboardContext;
