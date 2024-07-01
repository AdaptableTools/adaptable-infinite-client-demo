import {
  AdaptableApi,
  AdaptableUserState,
  components,
  useAdaptableApi,
  useAdaptableState,
} from "@adaptabletools/adaptable-infinite-react";
import { useState } from "react";
import { useAppContext } from "../appContext";

const { Button, Tabs, Select, Checkbox } = components;
type SettingsProps = {
  onClose: () => void;
  onStateChange: (state: AdaptableUserState) => void;
  adaptableApi: AdaptableApi;
};

const clsForSettingsLabel =
  "text-md whitespace-nowrap flex flex-row items-center";

export function Settings(props: SettingsProps) {
  const adaptableState = useAdaptableState();
  const api = useAdaptableApi();
  const currentViewId = useAdaptableState((state) => state.view.currentViewId);

  const [defaultTab] = useState(() => {
    return localStorage.getItem("activeSettingsTab") === "docs"
      ? "docs"
      : "settings";
  });

  const editable =
    adaptableState.globalEntities?.columnDefaults?.editable ?? true;

  const updateState = (
    updater: (state: AdaptableUserState) => AdaptableUserState
  ) => {
    props.onStateChange(updater(adaptableState));
  };

  const appContext = useAppContext();
  return (
    <div className="AppSettings flex flex-row   dark:text-zinc-50 text-zinc-700">
      <div className=" flex flex-col  overflow-hidden w-[30vw] ml-2   ">
        <Tabs
          defaultValue={defaultTab}
          onValueChange={(value) => {
            localStorage.setItem("activeSettingsTab", value);
          }}
        >
          <Tabs.List>
            <Tabs.Trigger name="settings">Settings</Tabs.Trigger>

            <Tabs.Trigger name="docs">Docs</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content name="settings">
            <div className="my-7 text-lg font-bold">
              This panel is custom-built - and not part of Adaptable itself.
              <br />
              However, it's using the Adaptable State to have full control over
              the component.
            </div>
            <div className="grid gap-3 grid-cols-[1fr_10fr] overflow-auto">
              <span className={clsForSettingsLabel}>Theme</span>
              <div>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => {
                    updateState((state) => ({
                      ...state,
                      theme: {
                        ...state.theme,
                        currentTheme: "light",
                      },
                    }));
                  }}
                >
                  light
                </Button>
                <Button
                  variant="text"
                  size="small"
                  ml={3}
                  onClick={() => {
                    updateState((state) => ({
                      ...state,
                      theme: {
                        ...state.theme,
                        currentTheme: "dark",
                      },
                    }));
                  }}
                >
                  dark
                </Button>
              </div>

              <span className={clsForSettingsLabel}>Row Height</span>
              <Select
                onChange={(value) => {
                  updateState((state) => ({
                    ...state,
                    grid: {
                      ...state.grid,
                      rowHeight: parseInt(value),
                    },
                  }));
                }}
                options={[
                  {
                    label: "Small",
                    value: "30px",
                  },
                  {
                    label: "Medium",
                    value: "40px",
                  },
                  {
                    label: "Large",
                    value: "50px",
                  },
                ]}
                value={`${adaptableState.grid.rowHeight}px`}
              />

              <span className={clsForSettingsLabel}>Zebra stripes</span>
              <Checkbox
                checked={adaptableState.grid.zebraStripes ?? true}
                onChange={(zebraStripes) => {
                  updateState((state) => ({
                    ...state,
                    grid: {
                      ...state.grid,
                      zebraStripes,
                    },
                  }));
                }}
              />

              <span className={clsForSettingsLabel}>Allow Editing</span>
              <div style={{ display: "flex", flexFlow: "row" }}>
                <Checkbox
                  checked={editable}
                  onChange={(editable) => {
                    updateState((state) => ({
                      ...state,
                      globalEntities: {
                        ...state.globalEntities,
                        columnDefaults: {
                          ...state.globalEntities?.columnDefaults,
                          editable,
                        },
                      },
                      view: {
                        ...state.view,
                        views: state.view.views?.map((view) => {
                          if (view.pivotColumns) {
                            return view;
                          }
                          return {
                            ...view,
                            columns: view.columns?.map((column) => {
                              return {
                                ...column,
                                editable,
                              };
                            }),
                          };
                        }),
                      },
                    }));
                  }}
                ></Checkbox>
              </div>

              <span className={clsForSettingsLabel}>Clear state</span>
              <div>
                <Button
                  onClick={() => {
                    localStorage.clear();
                    window.location.reload();
                  }}
                >
                  Clear & reload
                </Button>
              </div>

              <span className={clsForSettingsLabel}>Current view</span>
              <div>
                <Select
                  value={currentViewId}
                  onChange={(value) => {
                    // we can use the api to change the view
                    // or we could use the updateState function
                    api.viewApi.setActiveView(value);
                  }}
                  options={adaptableState.view.views.map((view) => {
                    return {
                      label: view.label,
                      value: view.id,
                    };
                  })}
                />
              </div>
              {currentViewId === "address-view" ? (
                <>
                  <span className={clsForSettingsLabel}>
                    Fields available in
                    <br />
                    Expression Editor
                  </span>
                  <ul
                    style={{
                      listStyleType: "none",
                    }}
                  >
                    {appContext.value.fields.map((field) => {
                      return (
                        <li key={field.name}>
                          <Checkbox
                            checked={field.enabled}
                            onChange={(enabled) => {
                              const newFields = appContext.value.fields.map(
                                (f) => {
                                  if (f.name === field.name) {
                                    return {
                                      ...f,
                                      enabled,
                                    };
                                  }
                                  return f;
                                }
                              );
                              appContext.setFields(newFields);
                            }}
                          >
                            {field.label}
                          </Checkbox>
                        </li>
                      );
                    })}
                  </ul>
                  <span className={clsForSettingsLabel}>Change DataSource</span>
                  <div>
                    <Checkbox
                      checked={appContext.value.fullDataSource}
                      onChange={() => {
                        appContext.setAppContext({
                          ...appContext.value,
                          fullDataSource: !appContext.value.fullDataSource,
                        });
                      }}
                    >
                      (using{" "}
                      {appContext.value.fullDataSource ? "full" : "reduced"}{" "}
                      data source)
                    </Checkbox>
                  </div>
                </>
              ) : null}
            </div>
          </Tabs.Content>
          <Tabs.Content name="docs">
            <>
              <div>
                <p>
                  This is a small demo app that shows some of the capabilities
                  of the AdapTable for Infinite Table.
                </p>
                <div className="mt-5">
                  The App includes:
                  <ul className="list-disc list-inside">
                    <li>
                      <b>3 Views</b> - which allow you to provide different
                      column configurations:
                      <ul className="list-disc list-inside ml-10">
                        <li>Table View - a standard grid view</li>
                        <li>
                          Grouped View - 2 Row Groups (Stack & Preferred
                          Language) and Aggregations for reposCount and salary
                        </li>
                        <li>Pivot View - Grid pivoted on Stack Column</li>
                      </ul>
                    </li>
                    <li>
                      <b>A dashboard with multiple widgets</b>:
                      <ul className="list-disc list-inside ml-10">
                        <li>View selector</li>
                        <li>Grid filter</li>
                        <li>Quick search</li>
                        <li>Export data widget</li>
                      </ul>
                    </li>
                  </ul>
                </div>

                <p className="mt-5">
                  You can right-click to see the context menu and also export
                  data.
                </p>
              </div>
            </>
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
}
