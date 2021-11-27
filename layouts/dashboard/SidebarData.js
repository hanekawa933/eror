import { Icon } from "@iconify/react";

const dashboard = "majesticons:dashboard";
const profile = "vs:profile";
const account = "bx:bxs-user-account";
const category = "ic:outline-category";
const reportIcon = "carbon:report";
const history = "bx:bx-history";
const getIcon = (icon) => <Icon icon={icon} width={22} height={22} />;

const general = [
  {
    text: "beranda",
    icon: getIcon(dashboard),
  },
  {
    text: "profil",
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
    icon: getIcon(history),
  },
];

const admin = [
  {
    text: "riwayat",
    to: "/admin/report/history",
    icon: getIcon(history),
  },
];

const technician = [
  {
    text: "riwayat",
    to: "/technician/report/history",
    icon: getIcon(history),
  },
];

export { general, report, operational, user, admin, technician };
