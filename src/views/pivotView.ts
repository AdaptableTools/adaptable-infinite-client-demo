import { AdaptablePivotView } from "@adaptabletools/adaptable-infinite-react";

export default {
  id: "pivot_view",
  label: "Pivot View",
  pivotColumns: [
    {
      columnId: "stack",
    },
  ],

  pivotAggregationColumns: [
    {
      columnId: "reposCount",
      aggregation: "sum",
      label: "Total Repos",
    },
    {
      columnId: "salary",
      aggregation: "min",
      label: "Min Salary",
    },
  ],

  pivotGroupColumns: [
    {
      id: "language-group",
      label: "Language",
      groupBy: ["country", "preferredLanguage"],
    },
  ],
} as AdaptablePivotView;
