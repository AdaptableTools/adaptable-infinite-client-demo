import {
  AdaptableApi,
  components,
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
  const [rowHeight, setRowHeight] = useState("40px");
  const [zebraStripes, setZebrastripes] = useState(true);

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
            </div>
          </Tabs.Content>
          <Tabs.Content name="docs">
            Cupidatat nisi ullamco sunt ipsum anim consectetur incididunt anim
            dolore consectetur. Sunt consequat quis nisi eiusmod non mollit elit
            commodo. Culpa reprehenderit minim adipisicing amet incididunt esse
            deserunt. Voluptate laboris ullamco sunt sint. Magna dolore id anim
            cupidatat sit. Aliquip minim sunt incididunt nostrud in adipisicing
            deserunt velit excepteur in. Pariatur sint ea veniam Lorem. Aute do
            est in voluptate culpa nisi culpa. Veniam occaecat eiusmod tempor do
            aliqua labore nostrud Lorem enim. Aliquip veniam amet excepteur
            commodo. Ipsum quis reprehenderit minim in cupidatat elit cillum
            culpa magna duis magna voluptate duis do. Duis commodo eu non
            cupidatat amet fugiat cillum aliquip amet mollit aliqua sint nulla
            officia. Consectetur nisi esse labore irure fugiat quis. Consequat
            dolor reprehenderit culpa deserunt nisi aliqua nulla incididunt
            elit. Voluptate consectetur aute excepteur aliqua qui. Deserunt esse
            non aute ut sit est enim irure voluptate consectetur. Proident
            consectetur occaecat laboris dolore in pariatur incididunt ipsum.
            Magna dolor minim reprehenderit labore eu dolor proident. Veniam
            aliqua adipisicing nostrud id enim reprehenderit dolor amet elit qui
            ut ea nostrud ad. Deserunt ullamco veniam aliqua deserunt fugiat
            enim excepteur. Magna ea ex eiusmod elit mollit Lorem tempor velit
            fugiat Lorem non amet veniam irure.
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
}
