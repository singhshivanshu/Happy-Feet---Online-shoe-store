import React from "react";
import Paper from "@material-ui/core/Paper";
import TextField from '@material-ui/core/TextField';
import { useStylePaper, useStyleInput } from "./style";

function Filter() {
  const paper = useStylePaper();
  const textfield = useStyleInput();

  return (
    <div className={paper.root}>
      <Paper elevation={10} square>
        <h3>Filters</h3>
        <form className={textfield.root} noValidate autoComplete="off">
          <TextField id="filled-basic" label="Search Brand" variant="filled" />
        </form>
      </Paper>
    </div>
  );
}
export default Filter;
