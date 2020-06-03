import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { useStyles } from "./style";
import MenuIcon from "@material-ui/icons/Menu";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            href="/"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link
              href="/"
              style={{ color: "white", textDecorationLine: "none" }}
            >
              HAPPY FEET
            </Link>
          </Typography>
          <Button variant="contained" color="default" href="/cart">
            <ShoppingCartIcon />&nbsp;My shoes
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
