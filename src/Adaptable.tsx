"use client";
import { allColumns, data } from "./data/frameworks";

import "@adaptabletools/adaptable-infinite-react/index.css";

import {
  AdaptableApi,
  AdaptableInfinite,
  components,
} from "@adaptabletools/adaptable-infinite-react";
import { useState } from "react";
import { AccentColorPicker } from "./components/AccentColorPicker";
import { Settings } from "./components/Settings";

const licenseKey = import.meta.env.VITE_ADAPTABLE_INFINITE_LICENSE_KEY;

const { Button, Layout } = components;
export default function App() {
  const [adaptableApi, setAdaptableApi] = useState<AdaptableApi | undefined>(
    undefined
  );

  const [settingsVisible, setSettingsVisible] = useState(false);
  return (
    <>
      <h2 className="font-bold p-2 flex flex-row items-center">
        <div className="text-2xl flex flex-row items-center dark:text-zinc-50 text-zinc-700">
          <img
            alt="Adaptable Logo"
            className="AdaptableLogo h-8 inline-block mr-2"
          />{" "}
          AdapTable for Infinite Table for React Demo
        </div>
        <div className=" grow text-end flex flex-row justify-end items-center">
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
        <div className=" flex flex-row  grow">
          <div className="border-2 flex flex-row border-zinc-400 grow">
            <AdaptableInfinite
              licenseKey={licenseKey}
              adaptableId="my-adaptable-infinite"
              data={data}
              onReady={(params) => {
                setAdaptableApi(params.adaptableApi);
              }}
              defaultState={{
                globalEntities: {
                  availableColumns: allColumns,
                },
                theme: "dark",
                primaryKey: "id",
                dashboard: {
                  top: {
                    widgets: [
                      {
                        id: "views",
                        type: "view",
                      },
                      {
                        id: "qs",
                        type: "quickSearch",
                        align: "end",
                      },
                    ],
                  },
                },
                view: {
                  currentViewId: "my-view",
                  views: [
                    {
                      id: "my-view",
                      label: "My View",
                      columns: [
                        {
                          id: "Language",
                          groupBy: ["language"],
                        },
                        {
                          id: "name",
                          editable: true,
                        },
                        {
                          id: "github_stars",
                        },
                        {
                          id: "language",
                        },
                        {
                          id: "test",
                        },
                        {
                          id: "github_watchers",
                        },
                        {
                          id: "description",
                        },
                      ],
                    },
                  ],
                },
              }}
            />
          </div>
          {settingsVisible && adaptableApi && (
            <Settings
              adaptableApi={adaptableApi}
              onClose={() => {
                setSettingsVisible(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}
