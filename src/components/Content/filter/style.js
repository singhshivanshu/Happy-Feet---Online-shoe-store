import { makeStyles } from "@material-ui/core/styles";

export const useStyleInput = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0,0,2,3),
      width: "17ch",
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
    height: "fit-content"
  },
});

export const useStylePrice = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(2, 0, 2, 3),
        width: '12ch',
      },
    },
  }));
