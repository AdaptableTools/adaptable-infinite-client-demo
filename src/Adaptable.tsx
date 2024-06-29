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
import groupedView from "./views/groupedView";
import pivotView from "./views/pivotView";
import { ViewPicker } from "./components/ViewPicker";
import { type Developer, availableColumns } from "./data/columns";

const licenseKey = import.meta.env.VITE_ADAPTABLE_INFINITE_LICENSE_KEY;

const API_URL = "https://infinite-table.com/.netlify/functions/json-server";
const DATA_SOURCE_SIZE = "1k";

const { Button, Layout } = components;

const dataSource = () => {
  return fetch(`${API_URL}/developers${DATA_SOURCE_SIZE}`)
    .then((response) => response.json())
    .then((data) => {
      return data as Developer[];
    });
};

const defaultState: AdaptableUserState = {
  globalEntities: {
    columnDefaults: {
      editable: true,
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
          id: "filter",
          type: "grid-filter",
        },
        {
          id: "qs",
          type: "quickSearch",
          align: "end",
        },
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
        color: "var(--adaptable-color-accent)",
        background: "var(--adaptable-text-color-0)",
      },
    },
  },
  view: {
    currentViewId: "table-view",
    views: [
      {
        ...tableView,
        styledCells: ["productive"],
      },
      groupedView,
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

  const [state, setState] = useState<AdaptableUserState>(defaultState);
  return (
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
  );
}
