import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "pending",
    label: "Pending",
    icon: QuestionMarkCircledIcon,
  },
  //   {
  //     value: "in progress",
  //     label: "In Progress",
  //     icon: StopwatchIcon,
  //   },
  {
    value: "success",
    label: "Success",
    icon: CheckCircledIcon,
  },
  {
    value: "failure",
    label: "Failure",
    icon: CrossCircledIcon,
  },
];

export const operations = [
  {
    label: "FT",
    value: "ft",
    icon: ArrowDownIcon,
  },
  {
    label: "FT Reversal",
    value: "ft reversal",
    icon: ArrowRightIcon,
  },
  {
    label: "FT Reversal ND",
    value: "ft reversal next day",
    icon: ArrowUpIcon,
  },
  {
    label: "FT Lump Sum",
    value: "ft lump sum",
    icon: ArrowUpIcon,
  },
  {
    label: "FT Interest",
    value: "ft interest",
    icon: ArrowUpIcon,
  },
];
