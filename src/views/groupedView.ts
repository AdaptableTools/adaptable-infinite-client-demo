import { AdaptableTableView } from "@adaptabletools/adaptable-infinite-react";

export const columns = [
  {
    id: "Group",
    groupBy: ["stack", "preferredLanguage"],
  },
  {
    id: "fullName",
    editable: true,
  },
  {
    id: "reposCount",
    aggregation: "sum",
  },
  { id: "weeklyRepoChange", aggregation: "max", editable: true },
  {
    id: "hobby",
  },
  {
    id: "salary",
    aggregation: "average",
  },
];

export default {
  id: "grouped-view",
  label: "Grouped View",
  columns,
} as AdaptableTableView;
