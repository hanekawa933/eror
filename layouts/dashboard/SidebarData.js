import { Icon } from "@iconify/react";

const dashboard = "majesticons:dashboard";
const profile = "vs:profile";
const account = "bx:bxs-user-account";
const category = "ic:outline-category";
const reportIcon = "carbon:report";
const product = "icon-park-outline:ad-product";
const stock = "healthicons:rdt-result-out-stock";
const status = "carbon:progress-bar-round";
const bag = "clarity:coin-bag-solid";
const sellcast = "la:sellcast";
const expenditure = "icon-park-outline:expenses";
const barrel = "mdi:barrel";
const getIcon = (icon) => <Icon icon={icon} width={22} height={22} />;

const general = [
  {
    text: "home",
    to: "/dashboard/home",
    icon: getIcon(dashboard),
  },
  {
    text: "profile",
    to: "/dashboard/profile",
    icon: getIcon(profile),
  },
];

const operational = [
  {
    text: "account",
    to: "/dashboard/create/account",
    icon: getIcon(account),
  },
  {
    text: "report",
    to: "/dashboard/create/report",
    icon: getIcon(reportIcon),
  },
  {
    text: "category",
    to: "/dashboard/create/category",
    icon: getIcon(category),
  },
];

const report = [
  {
    text: "account",
    to: "/dashboard/table/account",
    icon: getIcon(account),
  },
  {
    text: "report",
    to: "/dashboard/table/report",
    icon: getIcon(reportIcon),
  },
  {
    text: "category",
    to: "/dashboard/table/category",
    icon: getIcon(category),
  },
];

export { general, report, operational };
