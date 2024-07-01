"use client";

import { useCallback, useState } from "react";

import "@adaptabletools/adaptable-infinite-react/index.css";

import {
  Adaptable,
  AdaptableApi,
  AdaptableUserState,
  components,
} from "@adaptabletools/adaptable-infinite-react";

import { AccentColorPicker } from "./components/AccentColorPicker";
import { Settings } from "./components/Settings";
import { ADAPTABLE_ID } from "./adaptableId";
import tableView from "./views/tableView";
import addressView from "./views/addressView";
import groupedView from "./views/groupedView";
import pivotView from "./views/pivotView";
import { ViewPicker } from "./components/ViewPicker";
import { type Developer, availableColumns } from "./data/columns";
import { AppContext, defaultAppContextValue } from "./appContext";

const licenseKey = import.meta.env.VITE_ADAPTABLE_INFINITE_LICENSE_KEY;

const API_URL = "https://infinite-table.com/.netlify/functions/json-server";
const DATA_SOURCE_SIZE = "1k";

const { Button, Layout } = components;

const defaultState: AdaptableUserState = {
  globalEntities: {
    columnDefaults: {
      editable: true,
      width: 150,
    },
    columnTypeDefaults: {
      money: {},
    },
    fields: {
      currency: {
        dataType: "text",
        label: "Currency",
      },
      country: {
        dataType: "text",
        label: "Country",
      },
      city: {
        dataType: "text",
        label: "City",
      },
    },
    availableColumns,
  },
  grid: {
    zebraStripes: true,
    rowHeight: 40,
  },
  theme: {
    currentTheme: "dark",
  },

  dashboard: {
    top: {
      widgets: [
        {
          id: "settingsPanel",
          type: "settingsPanel",
        },
        {
          id: "views",
          type: "view",
        },

        {
          id: "cc",
          type: "calculatedColumn",
        },
        // {
        //   id: "filter",
        //   type: "grid-filter",
        // },
        // {
        //   id: "qs",
        //   type: "quickSearch",
        //   align: "end",
        // },
        {
          id: "export",
          type: "export",
          value: "Current Data",
          align: "end",
        },
      ],
    },
    bottom: {
      widgets: [
        {
          id: "row-count",
          type: "row-count",
        },
        {
          id: "appliction-nme",
          type: "application-name",
          align: "end",
        },
      ],
    },
  },
  styledCell: {
    productive: {
      label: "Productive developer",
      condition: {
        type: "booleanExpression",
        expression: "[reposCount] > 10",
      },
      scope: {
        columns: ["reposCount"],
      },
      style: {
        fontWeight: "bold",
        color: "var(--adaptable-color-warn)",
        background: "#5b5b5b",
      },
    },
    highSalary: {
      label: "High Salary",
      condition: {
        type: "booleanExpression",
        expression: '[salaryLevel] = "High"',
      },
      style: {
        fontWeight: "bold",

        color: "#29a3ff",
      },
    },
    moneyStyle: {
      label: "Money Style",

      format: {
        cellFormatType: "number",
        prefix: "$",
      },
      scope: {
        columnTypes: ["money"],
      },
    },
    positiveChange: {
      label: "Positive Change",
      condition: {
        type: "booleanExpression",
        expression: "[weeklyRepoChange] > 0",
      },
      scope: {
        columns: ["weeklyRepoChange"],
      },
      style: {
        color: "green",
      },
    },
    negativeChange: {
      label: "Negative Change",
      condition: {
        type: "booleanExpression",
        expression: "[weeklyRepoChange] < 0",
      },
      format: {
        cellFormatType: "number",
      },
      scope: {
        columns: ["weeklyRepoChange"],
      },
      style: {
        color: "red",
      },
    },
  },
  view: {
    currentViewId: "table-view",
    views: [
      {
        ...tableView,
        styledCells: [
          "positiveChange",
          "negativeChange",
          "productive",
          "highSalary",
          "moneyStyle",
        ],
      },
      addressView,
      {
        ...groupedView,
        styledCells: ["moneyStyle"],
      },
      pivotView,
    ],
  },
};

export default function App() {
  const [adaptableApi, setAdaptableApi] = useState<AdaptableApi | undefined>(
    undefined
  );

  const [settingsVisible, doSetSettingsVisible] = useState(() => {
    // make it visible initially
    if (!localStorage.getItem("settingsVisible")) {
      localStorage.setItem("settingsVisible", "true");
      return true;
    }
    return localStorage.getItem("settingsVisible") === "true";
  });

  const setSettingsVisible = (visible: boolean) => {
    localStorage.setItem("settingsVisible", visible.toString());
    doSetSettingsVisible(visible);
  };

  const onReady = useCallback(
    ({ adaptableApi }: { adaptableApi: AdaptableApi }) => {
      setAdaptableApi(adaptableApi);
    },
    []
  );

  const [currentAppContext, setAppContext] = useState(defaultAppContextValue);
  const [state, setState] = useState<AdaptableUserState>(defaultState);
  const setFields = useCallback((fields: typeof currentAppContext.fields) => {
    setAppContext((prev) => {
      return { ...prev, fields };
    });

    setState((prev) => {
      return {
        ...prev,
        globalEntities: {
          ...prev.globalEntities,
          fields: fields.reduce((acc, field) => {
            return {
              ...acc,
              [field.name]: {
                label: field.label,
                dataType: field.dataType,
              },
            };
          }, {}),
        },
      };
    });
  }, []);

  const dataSource = useCallback(() => {
    return fetch(`${API_URL}/developers${DATA_SOURCE_SIZE}`)
      .then((response) => response.json())
      .then((data) => {
        return data.map((item: Developer) => {
          const developer = {
            ...item,
            currency:
              item.currency === "JPY"
                ? "USD"
                : item.currency === "AUD"
                ? "GBP"
                : item.currency === "CHF"
                ? "EUR"
                : item.currency,
          };

          if (!currentAppContext.fullDataSource) {
            //@ts-ignore ignore
            delete developer.streetNo;
            //@ts-ignore ignore
            delete developer.streetPrefix;
          }
          return developer;
        }) as Developer[];
      });
  }, [currentAppContext.fullDataSource]);

  return (
    <AppContext.Provider
      value={{
        setFields,
        value: currentAppContext,
        setAppContext,
      }}
    >
      <Adaptable.Provider
        licenseKey={licenseKey}
        primaryKey="id"
        adaptableId={ADAPTABLE_ID}
        data={dataSource}
        onReady={onReady}
        state={state}
        onStateChange={setState}
      >
        <h2 className="font-bold p-2 flex flex-row items-center">
          <div className="text-2xl flex flex-row items-center dark:text-zinc-50 text-zinc-700">
            <img
              alt="Adaptable Logo"
              className="AdaptableLogo h-8 inline-block mr-2"
            />
            Adaptable for Infinite Table Demo
          </div>
          <div className=" grow text-end flex flex-row justify-end items-center">
            <ViewPicker />
            <AccentColorPicker />

            <Layout mt={3} ml={5}>
              <Button
                variant="text"
                icon="settings"
                onClick={() => {
                  setSettingsVisible(!settingsVisible);
                }}
              ></Button>
            </Layout>
          </div>
        </h2>
        <div className="grow p-2 flex flex-col">
          <div className=" flex flex-row grow">
            <div className="border flex flex-col border-zinc-400 grow">
              <Adaptable.UI />
            </div>
            {settingsVisible && adaptableApi && (
              <Settings
                onStateChange={setState}
                adaptableApi={adaptableApi}
                onClose={() => {
                  setSettingsVisible(false);
                }}
              />
            )}
          </div>
        </div>
      </Adaptable.Provider>
    </AppContext.Provider>
  );
}
