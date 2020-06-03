import { makeStyles } from "@material-ui/core/styles";

export  const useStyles = makeStyles({
    root: {
      width: 400,
      textAlign: "center",
      backgroundColor: "transparent",
      transition: "none",
      border: "none",
      borderRadius: 0
    },
    bullet: {
      display: "inline-block",
      margin: "0 2px",
      transform: "scale(0.8)",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    cardNo: {
      width: "28ch",
      margin: "12px",
    },
    cardName: {
      width: "28ch",
      margin: "12px",
    },
    cardDate: {
      width: "16.5ch",
      margin: "12px",
    },
    cardCVV: {
      width: "9.8ch",
      margin: "12px",
    },
  });
