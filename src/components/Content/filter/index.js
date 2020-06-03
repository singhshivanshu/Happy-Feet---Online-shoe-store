import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useStyleInput } from "./style";
import axios from "axios";
// import Result from "../result";
import Grid from "@material-ui/core/Grid";
import {useStyleCard} from "./style"
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// Checkbox section
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Checkbox from "@material-ui/core/Checkbox";
import {useStyleFormControl} from "./style"

function Filter() {

  const textfield = useStyleInput();

  const [searchValue, setSearchValue] = useState("");
  const [data, setData] = useState([]);

  // checkbox
  const [state, setState] = useState({
    black: false,
    white: false,
    red: false,
    blue: false,
    grey: false,
    brown: false
  });
  const [arr, setArr] = useState([]);
  
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
    arr.indexOf(event.target.name) < 0
      ? setArr([...arr, event.target.name])
      : setArr(arr.filter(item => item !== event.target.name));
  };

  const { black, white, red, blue, grey, brown } = state;
  
   // checkbox

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



  const classesCard = useStyleCard();
  const classesFormControl = useStyleFormControl();

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
        <div className={classesFormControl.root}>
      <FormControl component="fieldset" className={classesFormControl.formControl}>
        <FormLabel component="legend">COLOR</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={black} onChange={handleChange} name="black" />
            }
            label="black"
          />
          <FormControlLabel
            control={
              <Checkbox checked={white} onChange={handleChange} name="white" />
            }
            label="white"
          />
          <FormControlLabel
            control={
              <Checkbox checked={red} onChange={handleChange} name="red" />
            }
            label="red"
          />
          <FormControlLabel
            control={
              <Checkbox checked={blue} onChange={handleChange} name="blue" />
            }
            label="blue"
          />
          <FormControlLabel
            control={
              <Checkbox checked={grey} onChange={handleChange} name="grey" />
            }
            label="grey"
          />
          <FormControlLabel
            control={
              <Checkbox checked={brown} onChange={handleChange} name="brown" />
            }
            label="brown"
          />
        </FormGroup>
        <FormHelperText>Be careful</FormHelperText>
      </FormControl>
    </div>
        
      </Grid>

      <Grid direction="column" sm={9} style={{display: 'contents'}}>
        {searchValue.length < 3 ? (
          <React.Fragment>
            {data.map((product) => {
              return (
                <Card className={classesCard.root} style={{margin: '1%', padding: '10px'}} >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="300"
                      image={product.img}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography style={{textTransform: "capitalize"}} gutterBottom variant="h5" component="h2">
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
                  <Card className={classesCard.root} style={{margin: '1%', padding: '10px'}}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={product.name}
                        height="300"
                        image={product.img}
                        title={product.name}
                      />
                      <CardContent>
                        <Typography style={{textTransform: "capitalize"}} gutterBottom variant="h5" component="h2">
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
