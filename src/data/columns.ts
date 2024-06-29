import { AdaptableColDef } from "@adaptabletools/adaptable-infinite-react";

export type Developer = {
  age: number;
  birthDate: string;
  canDesign: "yes" | "no";
  city: string;
  country: string;
  countryCode: string;
  email: string;
  id: number;
  firstName: string;
  lastName: string;
  hireDate: number;
  reposCount: number;
  stack: "backend" | "frontend" | "full-stack";
  streetName: string;
  streetNo: number;
  streetPrefix: string;
  preferedLanguage: string;
  hobby: string;
  salary: number;
  currency: string;
};

export const availableColumns: Record<string, AdaptableColDef> = {
  firstName: {
    label: "First Name",
    field: "firstName",
    dataType: "text",
  },
  lastName: {
    label: "Last Name",
    field: "lastName",
    dataType: "text",
  },
  preferredLanguage: {
    label: "Preferred Language",
    field: "preferredLanguage",
    dataType: "text",
  },
  reposCount: {
    field: "reposCount",
    dataType: "number",
  },
  hireDate: {
    field: "hireDate",
    label: "Hire Date",
    dataType: "number",
    renderValue: ({ value }) => new Date(value).toLocaleDateString(),
  },
  stack: {
    field: "stack",
    dataType: "text",
  },
  age: {
    field: "age",
    dataType: "number",
  },
  salary: {
    label: "Salary",
    field: "salary",
    dataType: "number",
  },
  "2xsalary": {
    label: "2x Salary",
    expression: "[salary] * 2",
    dataType: "number",
  },
  description: {
    label: "Description (calculated)",
    width: 450,
    expression: `[firstName] + ", " +  [lastName] + " is a " + [stack] + " developer" + " from " + FIELD("city") + ", " + FIELD("country")`,
    dataType: "text",
  },
};
