import { createContext, useContext } from "react";

export const defaultAppContextValue = {
  fullDataSource: true,
  fields: [
    {
      name: "currency",
      label: "Currency",
      dataType: "text",
      enabled: true,
    },
    {
      name: "country",
      label: "Country",
      dataType: "text",
      enabled: true,
    },
    {
      name: "city",
      label: "City",
      dataType: "text",
      enabled: true,
    },
    {
      name: "streetName",
      label: "Street Name",
      dataType: "text",
      enabled: false,
    },
    {
      name: "streetNo",
      label: "Street Number",
      dataType: "number",
      enabled: false,
    },
    {
      name: "streetPrefix",
      label: "Street Prefix",
      dataType: "text",
      enabled: false,
    },
  ],
};
export const AppContext = createContext<{
  value: typeof defaultAppContextValue;
  setAppContext: (value: typeof defaultAppContextValue) => void;
  setFields: (fields: (typeof defaultAppContextValue)["fields"]) => void;
}>({
  value: defaultAppContextValue,
  setAppContext: () => {},
  setFields: () => {},
});

export const useAppContext = () => {
  return useContext(AppContext);
};
