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
    id: "preferredLanguage",
  },
  {
    id: "stack",
  },
  {
    id: "reposCount",
    editable: true,
  },
  { id: "weeklyRepoChange" },
  {
    id: "hireDate",
  },

  {
    id: "salary",
  },
  { id: "salaryLevel" },
  {
    id: "monthlyBonus",
  },
  {
    id: "totalPackage",
  },

  {
    id: "age",
  },
  {
    id: "email",
  },
  {
    id: "location",
  },
  {
    id: "description",
  },
];

export default {
  id: "table-view",
  label: "Table View",
  // styledCells: ["popular"],
  columns,
} as AdaptableTableView;
