import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useStyleInput } from "./style";
import axios from "axios";
// import Result from "../result";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Filter() {

  const textfield = useStyleInput();

  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);

  const onSearchHandler = () => {
    axios
      .get("./data/products.json")
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => console.log(error));
  };

  //   const conditionHandler = () => {
  //       if(searchValue.length > 2) {
  //           onSearchHandler();
  //       }
  //   }

  useEffect(() => {
    onSearchHandler();
  }, [searchValue]);

  console.log(searchValue);
  console.log(data);

  // For cards..

  const useStyleCard = makeStyles({
    root: {
      width: 345,
    },
  });
  const classes = useStyleCard();

  // For cards..

  return (
    <Grid container direction="row" alignItems="stretch">
      <Grid sm={2}>
        <h3>Filters</h3>
        <form className={textfield.root} noValidate autoComplete="off">
          <TextField
            id="filled-basic"
            label="Search Brands..."
            variant="filled"
            valaue={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toLocaleLowerCase())}
          />
        </form>
      </Grid>

      <Grid direction="column" sm={9} style={{display: 'contents'}}>
        {searchValue.length < 3 ? (
          <React.Fragment>
            {data.map((product) => {
              return (
                <Card className={classes.root} style={{margin: '1%', padding: '10px'}} >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="300"
                      image={product.img}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {product.brand}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {product.name}
                        <hr />
                        Rs.{product.original_price}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <Button size="small" color="primary">
                      BUY
                    </Button>
                    <Button size="small" color="primary">
                      {product.rating}
                    </Button>
                  </CardActions>
                </Card>
              );
            })}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {data
              .filter((product) => product.brand === searchValue)
              .map((product) => {
                return (
                  <Card className={classes.root}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={product.name}
                        height="140"
                        image={product.img}
                        title={product.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {product.brand}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {product.name}
                          <hr />
                          Rs.{product.original_price}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions>
                      <Button size="small" color="primary">
                        BUY
                      </Button>
                      <Button size="small" color="primary">
                        {product.rating}
                      </Button>
                    </CardActions>
                  </Card>
                );
              })}
          </React.Fragment>
        )}
      </Grid>
    </Grid>
  );
}
export default Filter;
