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
  const initialZebraStripes = gridState.zebraStripes;

  const [rowHeight, setRowHeight] = useState(
    initialRowHeight ? `${initialRowHeight}px` : "40px"
  );
  const [zebraStripes, setZebrastripes] = useState(initialZebraStripes);

  useEffect(() => {
    document.documentElement.style.setProperty("--row-height", rowHeight);
  }, [rowHeight]);
  return (
    <div className="AppSettings flex flex-row border-zinc-400 dark:text-zinc-50 text-zinc-700">
      <div className=" flex flex-col overflow-hidden w-[30vw] ml-2 ">
        <Tabs defaultValue={"settings"}>
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
            <div>
              <p>
                This is a small demo app that shows some of the capabilities of
                the AdapTable for Infinite Table. The App includes:
                <ul>
                  <li>
                    3 Views - which allow you to provide different column
                    configurations:
                    <ul>
                      <li>Table View - a standard grid view</li>
                      <li>
                        Grouped View - 2 Row Groups (Language & Licence) and
                        Aggregations for Stars & Watchers
                      </li>
                      <li>Pivot View - Grid pivoted on Language Columns</li>
                    </ul>{" "}
                    Table, Pivot and Grouped{" "}
                  </li>{" "}
                </ul>
              </p>
            </div>
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
}
