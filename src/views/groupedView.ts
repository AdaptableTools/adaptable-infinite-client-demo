import { AdaptableTableView } from "@adaptabletools/adaptable-infinite-react";

export const columns = [
  {
    id: "Group",
    groupBy: ["language", "license"],
  },
  {
    id: "name",
    editable: true,
  },
  {
    id: "github_stars",
    aggregation: "sum",
  },
  {
    id: "language",
  },
  {
    id: "test",
  },

  {
    id: "description",
  },
];

export default {
  id: "grouped-view",
  label: "Grouped View",
  columns,
} as AdaptableTableView;
