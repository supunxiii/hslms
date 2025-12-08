import React, { createContext, useState } from "react";

export const addData = createContext();
export const updateData = createContext();
export const dltdata = createContext();

const ContextProvider = ({ children }) => {
  const [useradd, setUseradd] = useState(""); // Manage adding new users
  const [update, setUpdate] = useState(""); // Manage updating users
  const [deletedata, setDLtdata] = useState(""); // Manage deleted users

  return (
    <addData.Provider value={{ useradd, setUseradd }}>
      <updateData.Provider value={{ update, setUpdate }}>
        <dltdata.Provider value={{ deletedata, setDLtdata }}>
          {children}
        </dltdata.Provider>
      </updateData.Provider>
    </addData.Provider>
  );
};

export default ContextProvider;
