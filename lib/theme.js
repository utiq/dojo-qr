import common from "@material-ui/core/colors/common";
import grey from "@material-ui/core/colors/grey";
import { createMuiTheme } from "@material-ui/core/styles";

const baseTheme = createMuiTheme({});

const base = {
  colors: {
    brand: "#333333",
  },
  fonts: {
    family: {
      arial: "Arial",
    },
  },
};

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      "@global": {
        html: {
          WebkitFontSmoothing: "auto",
        },
        "html, body": {
          maxWidth: "100%",
          overflowX: "hidden",
        },
      },
    },
  },
  palette: {
    text: {
      primary: base.colors.brand,
    },
  },
  typography: {
    fontFamily: base.fonts.family.arial,
    h1: {
      fontSize: "36px",
      fontWeight: baseTheme.typography.fontWeightMedium,
      lineHeight: 1.17,
      [baseTheme.breakpoints.up("xs")]: {
        fontSize: "28px",
      },
    },
    h2: {
      fontSize: "28px",
      fontWeight: baseTheme.typography.fontWeightRegular,
      [baseTheme.breakpoints.up("xs")]: {
        fontSize: "20px",
      },
    },
    allVariants: {
      color: base.colors.brand,
    },
  },
});

export default theme;
