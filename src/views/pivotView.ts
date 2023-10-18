import { AdaptablePivotView } from "@adaptabletools/adaptable-infinite-react";

export default {
  id: "pivot_view",
  label: "Pivot View",
  pivotColumns: [
    {
      columnId: "language",
    },
  ],

  pivotAggregationColumns: [
    {
      columnId: "github_stars",
      aggregation: "sum",
      label: "Total Stars",
    },
    {
      columnId: "license",
      aggregation: "count",
    },
  ],

  pivotGroupColumns: [
    {
      id: "license-group",
      label: "Type of License",
      groupBy: ["license"],
    },
  ],
} as AdaptablePivotView;
