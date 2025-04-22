// AppContext.js
import React, { createContext, useState } from 'react';

// Create a context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
  const [state, setState] = useState({
    user: null,
    ATMList: null,
    ATMs:null,
    error: null,
    Jobs:null,
    BioStatus:null,
    LocationFilter:null,
    IncidentDetails:null,
    JobResults:null,
    Notifications:null,
  });

  const setUser = (user) => {
    setState((prevState) => ({ ...prevState, user }));
  };

  const setATMList = (ATMList) => {
    setState((prevState) => ({ ...prevState, ATMList }));
  };
  const setATMs = (ATMs) => {
    setState((prevState) => ({ ...prevState, ATMs }));
  };
  const setJobs = (Jobs) => {
    setState((prevState) => ({ ...prevState, Jobs }));
  };

  const setError = (error) => {
    setState((prevState) => ({ ...prevState, error }));
  };
  const setBioStatus = (BioStatus) => {
    setState((prevState) => ({ ...prevState, BioStatus }));
  };

  const setLocationFilter = (LocationFilter) => {
    setState((prevState) => ({ ...prevState, LocationFilter }));
  };
  const setIncidentDetails = (IncidentDetails) => {
    setState((prevState) => ({ ...prevState, IncidentDetails }));
  };
  const setJobResults = (JobResults) => {
    setState((prevState) => ({ ...prevState, JobResults }));
  };
  const setNotifications = (Notifications) => {
    setState((prevState) => ({ ...prevState, Notifications }));
  };
  return (
    <AppContext.Provider value={{ state, setUser, setATMList,setATMs, setError,setJobs,setBioStatus,setLocationFilter,setIncidentDetails,setJobResults,setNotifications}}>
      {children}
    </AppContext.Provider>
  );
};
