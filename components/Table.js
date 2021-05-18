import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    fontSize: theme.typography.pxToRem(14),
    "& .line": {
      display: "flex",
      padding: "12px 0",
      borderBottom: "1px solid #ccc",
      "&:first-child": {
        borderTop: "1px solid #ccc",
      },
    },
  },
  right: {
    flex: 1,
    textAlign: "right",
    "& span": {
      backgroundColor: "#A6EBFF",
      padding: "3px 8px",
      borderRadius: 4,
      fontSize: theme.typography.pxToRem(12),
      fontWeight: "600",
      // color: "#3F3F3F",
    },
  },
}));

const Table = ({ roomArea, airFiltration, merv, ventilationOutsideAir }) => {
  const classes = useStyles();
  return (
    <Box className={classes.boxContainer}>
      <Box className="line">
        <Box flex={1}>Room Size</Box>
        <Box className={classes.right}>
          <Box component="span">{roomArea} sqft</Box>
        </Box>
      </Box>
      <Box className="line">
        <Box flex={1}>Outside air ventilation</Box>
        <Box className={classes.right}>
          <Box component="span">{ventilationOutsideAir} ACH</Box>
        </Box>
      </Box>
      <Box className="line">
        <Box flex={1}>Air filtration</Box>
        <Box className={classes.right}>
          <Box component="span">{airFiltration} ACH</Box>
        </Box>
      </Box>
      <Box className="line">
        <Box flex={1}>Filter</Box>
        <Box className={classes.right}>
          <Box component="span">{merv}</Box>
        </Box>
      </Box>
      <Box className="line">
        <Box flex={1}>Maximum occupancy</Box>
        <Box className={classes.right}>
          <Box component="span">20 people</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Table;
