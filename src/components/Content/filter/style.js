import { makeStyles } from "@material-ui/core/styles";

export const useStylePaper = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(32),
      height: theme.spacing(64),
    },
  },
}));

export const useStyleInput = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
