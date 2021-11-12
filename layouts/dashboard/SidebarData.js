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
    text: "beranda",
    to: "/dashboard/home",
    icon: getIcon(dashboard),
  },
  {
    text: "profil",
    to: "/dashboard/profile",
    icon: getIcon(profile),
  },
];

const operational = [
  {
    text: "akun",
    to: "/dashboard/create/account",
    icon: getIcon(account),
  },
  {
    text: "laporan",
    to: "/dashboard/create/report",
    icon: getIcon(reportIcon),
  },
  {
    text: "kategori",
    to: "/dashboard/create/category",
    icon: getIcon(category),
  },
];

const report = [
  {
    text: "akun",
    to: "/dashboard/table/account",
    icon: getIcon(account),
  },
  {
    text: "laporan",
    to: "/dashboard/table/report",
    icon: getIcon(reportIcon),
  },
  {
    text: "kategori",
    to: "/dashboard/table/category",
    icon: getIcon(category),
  },
];

const user = [
  {
    text: "riwayat",
    to: "/report/history",
    icon: getIcon(category),
  },
];

const admin = [
  {
    text: "riwayat",
    to: "/admin/report/history",
    icon: getIcon(category),
  },
];

const technician = [
  {
    text: "riwayat",
    to: "/technician/report/history",
    icon: getIcon(category),
  },
];

export { general, report, operational, user, admin, technician };
