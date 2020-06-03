import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useStyleInput } from "./style";
import axios from "axios";
// import Result from "../result";
import Grid from "@material-ui/core/Grid";
import { useStyleCard } from "./style";
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
import Checkbox from "@material-ui/core/Checkbox";
import { useStyleFormControl } from "./style";
// Price filter
import { useStylePrice } from "./style";

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
    brown: false,
  });
  const [arr, setArr] = useState([]);

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    arr.indexOf(event.target.name) < 0
      ? setArr([...arr, event.target.name])
      : setArr(arr.filter((item) => item !== event.target.name));
  };

  const { black, white, red, blue, grey, brown } = state;

  // checkbox

  // price filter

  const [priceFilterValue, setPriceFilterValue] = useState({
    minPrice: "",
    maxPrice: "",
  });

  // price filter

  const onSearchHandler = () => {
    axios
      .get("./data/products.json")
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    onSearchHandler();
  }, [searchValue]);

  // For cards..

  const classesCard = useStyleCard();
  const classesFormControl = useStyleFormControl();
  const classesPrice = useStylePrice();

  // For cards..

  //  console.log(arr)

  let onFilter = {
    byColour: [...arr],
    byBrand: searchValue,
  };
  //  console.log(onFilter.byColour)
  //  console.log(onFilter.byBrand)
  console.log(priceFilterValue.minPrice);
  console.log(priceFilterValue.maxPrice);

  return (
    <Grid container direction="row" alignItems="stretch">
      <Grid sm={2}>
        <h3>Filters</h3>
        <form className={textfield.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Search Brands..."
            variant="outlined"
            valaue={searchValue}
            onChange={(e) => setSearchValue(e.target.value.toLocaleLowerCase())}
          />
        </form>
        <form className={classesPrice.root} noValidate autoComplete="off">
          <div>
            <h3>PRICE</h3>
          </div>
          <div>
            <TextField
              id="outlined-number"
              label="Min-price"
              type="number"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={priceFilterValue.minPrice}
              onChange={(e) =>
                setPriceFilterValue({
                  minPrice: e.target.value,
                })
              }
            />
          </div>
          <div>
            <TextField
              id="outlined-number"
              label="Max-price"
              type="number"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={priceFilterValue.maxPrice}
              onChange={(e) =>
                setPriceFilterValue({
                  maxPrice: e.target.value,
                })
              }
            />
          </div>
        </form>
        <div className={classesFormControl.root}>
          <FormControl
            component="fieldset"
            className={classesFormControl.formControl}
          >
            <FormLabel component="legend">COLOR</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={black}
                    onChange={handleChange}
                    name="black"
                  />
                }
                label="black"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={white}
                    onChange={handleChange}
                    name="white"
                  />
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
                  <Checkbox
                    checked={blue}
                    onChange={handleChange}
                    name="blue"
                  />
                }
                label="blue"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={grey}
                    onChange={handleChange}
                    name="grey"
                  />
                }
                label="grey"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={brown}
                    onChange={handleChange}
                    name="brown"
                  />
                }
                label="brown"
              />
            </FormGroup>
          </FormControl>
        </div>
      </Grid>

      <Grid direction="column" sm={9} style={{ display: "contents" }}>
        {searchValue.length < 3 ? (
          <React.Fragment>
            {data.map((product) => {
              return (
                <Card
                  className={classesCard.root}
                  style={{ margin: "1%", padding: "10px" }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      alt={product.name}
                      height="300"
                      image={product.img}
                      title={product.name}
                    />
                    <CardContent>
                      <Typography
                        style={{ textTransform: "capitalize" }}
                        gutterBottom
                        variant="h5"
                        component="h2"
                      >
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
                    <Button variant="contained" color="primary" href={`${product.id}/payment`}>
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
                  <Card
                    className={classesCard.root}
                    style={{ margin: "1%", padding: "10px" }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        alt={product.name}
                        height="300"
                        image={product.img}
                        title={product.name}
                      />
                      <CardContent>
                        <Typography
                          style={{ textTransform: "capitalize" }}
                          gutterBottom
                          variant="h5"
                          component="h2"
                        >
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
                      <Button
                        variant="contained"
                        color="primary"
                        href="/payment"
                      >
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
