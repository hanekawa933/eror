import { createTheme } from "react-data-table-component";

// createTheme creates a new theme named solarized that overrides the build in dark theme
const transparentTheme = createTheme("dark", {
  background: {
    default: "transparent",
  },
});

export default transparentTheme;
