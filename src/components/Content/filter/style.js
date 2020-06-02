import { makeStyles } from "@material-ui/core/styles";

export const useStyleInput = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));
