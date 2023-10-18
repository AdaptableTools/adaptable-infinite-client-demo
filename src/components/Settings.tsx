import {
  AdaptableApi,
  components,
  useAdaptableState,
} from "@adaptabletools/adaptable-infinite-react";
import { useEffect, useState } from "react";

const { Button, Tabs, Select, Checkbox } = components;
type SettingsProps = {
  onClose: () => void;
  adaptableApi: AdaptableApi;
};

const clsForSettingsLabel =
  "text-md whitespace-nowrap flex flex-row items-center";
export function Settings(props: SettingsProps) {
  const gridState = useAdaptableState((state) => state.grid);
  const initialRowHeight = gridState.rowHeight;
  const initialZebraStripes = gridState.zebraStripes ?? true;

  const [rowHeight, setRowHeight] = useState(
    initialRowHeight ? `${initialRowHeight}px` : "40px"
  );
  const [zebraStripes, setZebrastripes] = useState(initialZebraStripes);

  const [defaultTab] = useState(() => {
    return localStorage.getItem("activeSettingsTab") === "docs"
      ? "docs"
      : "settings";
  });

  useEffect(() => {
    document.documentElement.style.setProperty("--row-height", rowHeight);
  }, [rowHeight]);
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
            <div className="grid gap-3 grid-cols-[1fr_10fr] overflow-auto">
              <span className={clsForSettingsLabel}>Theme</span>
              <div>
                <Button
                  size="small"
                  variant="text"
                  onClick={() => {
                    props.adaptableApi.themeApi.setTheme("light");
                  }}
                >
                  light
                </Button>
                <Button
                  variant="text"
                  size="small"
                  ml={3}
                  onClick={() => {
                    props.adaptableApi.themeApi.setTheme("dark");
                  }}
                >
                  dark
                </Button>
              </div>

              <span className={clsForSettingsLabel}>Row Height</span>
              <Select
                onChange={(value) => {
                  setRowHeight(value);
                  props.adaptableApi.gridApi.setRowHeight(parseInt(value));
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
                value={rowHeight}
              />

              <span className={clsForSettingsLabel}>Zebra stripes</span>
              <Checkbox
                checked={zebraStripes}
                onChange={(value) => {
                  setZebrastripes(value);
                  props.adaptableApi.gridApi.setZebraStripes(value);
                }}
              />
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
            </div>
          </Tabs.Content>
          <Tabs.Content name="docs">
            <>
              <div>
                <p>
                  This is a small demo app that shows some of the capabilities
                  of the AdapTable for Infinite Table.
                </p>
                <p className="mt-5">
                  The App includes:
                  <ul className="list-disc list-inside">
                    <li>
                      <b>3 Views</b> - which allow you to provide different
                      column configurations:
                      <ul className="list-disc list-inside ml-10">
                        <li>Table View - a standard grid view</li>
                        <li>
                          Grouped View - 2 Row Groups (Language & Licence) and
                          Aggregations for Stars & Watchers
                        </li>
                        <li>Pivot View - Grid pivoted on Language Columns</li>
                      </ul>
                    </li>
                    <li>
                      <b>A dashboard with multiple widgets</b>:
                      <ul className="list-disc list-inside ml-10">
                        <li>View selector</li>
                        <li>Export data widget</li>
                      </ul>
                    </li>
                  </ul>
                </p>

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
