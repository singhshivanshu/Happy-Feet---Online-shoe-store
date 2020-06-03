import { makeStyles } from "@material-ui/core/styles";

export const useStyleInput = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export const useStyleFormControl = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export const useStyleCard = makeStyles({
  root: {
    width: 345,
  },
});
