import { AdaptableTableView } from "@adaptabletools/adaptable-infinite-react";

export const columns = [
  {
    id: "name",
    editable: true,
  },
  {
    id: "language",
  },
  {
    id: "github_stars",
    editable: true,
  },
  {
    id: "2xstars",
  },
  {
    id: "open_pr_count",
  },
  { id: "closed_pr_count" },
  {
    id: "total_pr_count",
  },

  {
    id: "github_watchers",
  },

  {
    id: "description",
  },
];

export default {
  id: "table-view",
  label: "Table View",
  styledCells: ["popular"],
  columns,
} as AdaptableTableView;
