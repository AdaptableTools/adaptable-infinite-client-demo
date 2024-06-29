import { AdaptableTableView } from "@adaptabletools/adaptable-infinite-react";

export const columns: AdaptableTableView["columns"] = [
  {
    id: "firstName",
    editable: true,
  },
  {
    id: "lastName",
    editable: true,
  },
  {
    id: "description",
  },
  {
    id: "preferredLanguage",
  },
  {
    id: "stack",
  },
  {
    id: "reposCount",
    editable: true,
  },
  {
    id: "hireDate",
  },

  {
    id: "salary",
  },
  {
    id: "2xsalary",
  },
];

export default {
  id: "table-view",
  label: "Table View",
  // styledCells: ["popular"],
  columns,
} as AdaptableTableView;
