"use client";
import { allColumns, data } from "./data/frameworks";

import "@adaptabletools/adaptable-infinite-react/index.css";

import { AdaptableInfinite } from "@adaptabletools/adaptable-infinite-react";

const licenseKey = import.meta.env.VITE_ADAPTABLE_INFINITE_LICENSE_KEY;
console.log(licenseKey, "!!!");
export default function App() {
  return (
    <>
      <h2>Adaptable Demo in Vite</h2>
      <div
        style={{
          width: "90vw",
          height: "80vh",
          display: "flex",
          flexFlow: "column",
        }}
      >
        <AdaptableInfinite
          licenseKey={licenseKey}
          adaptableId="my-adaptable-infinite"
          data={data}
          defaultState={{
            globalEntities: {
              availableColumns: allColumns,
            },
            primaryKey: "id",
            dashboard: {
              top: {
                widgets: [
                  {
                    id: "test",
                    type: "view",
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
                      id: "group",
                      groupBy: ["language"],
                    },
                    {
                      id: "name",
                    },
                    {
                      id: "github_stars",
                    },
                    {
                      id: "language",
                    },
                    {
                      id: "license",
                    },
                  ],
                },
              ],
            },
          }}
        />
      </div>
    </>
  );
}
