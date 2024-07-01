import { AdaptableTableView } from "@adaptabletools/adaptable-infinite-react";

export const columns: AdaptableTableView["columns"] = [
  {
    id: "fullName",
  },
  {
    id: "location",
    width: 250,
  },
  {
    id: "address",
  },
];

export default {
  id: "address-view",
  label: "Address Info",

  columns,
} as AdaptableTableView;
