import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import { useStyleInput } from "./style";
import axios from "axios";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useStyleFormControl } from "./style";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Displaycard from "../displaycard";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { useStylesSlider } from "./style";

function Filter() {
  //search by brand //
  const [brandName, setBrandName] = useState("");
  const [data, setData] = useState([]);
  const [sliderValue, setSliderValue] = useState([1500, 10000]);
  const [color, setColor] = useState([]);
  
    
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

   // price slider filter

   

   const handleSliderChange = (event, newValue) => {
     setSliderValue(newValue);
   
   };
   
   // price slider filter



  // Radio box
  const [radioValue, setRadioValue] = useState("low");

  const sortProducts = (value) => {
    axios.get("./data/products.json").then((response) => {
      let sortedData = response.data;

      if (value === "low") {
        sortedData = sortedData.sort(function (a, b) {
          let keyA = a.discount_price;
          let keyB = b.discount_price;

          return keyA - keyB;
        });
      } else {
        sortedData = sortedData.sort(function (a, b) {
          let keyA = a.discount_price;
          let keyB = b.discount_price;

          return keyB - keyA;
        });
      }
      // filtering data by price
      setData(sortedData.filter(data => data.discount_price <= sliderValue[1] && data.discount_price >= sliderValue[0] ));
      
      // filtering data by color
      setColor(data && data.filter((product) => arr.includes(product.color)));
    });
  };
  //Radio box

  useEffect(() => {
    
    sortProducts(radioValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderValue, arr.length, radioValue]);

 

  // styling function expressions
  const classesFormControl = useStyleFormControl();
  const classesSlider = useStylesSlider();
  const textfield = useStyleInput();

  return (
    <div className="filter-main-section">
      <div className="filter-sec">
        <div style={{ marginLeft: "24px", letterSpacing: "2px" }}>
          <h2>Filters</h2>
        </div>
        <hr />
        <form className={textfield.root} noValidate autoComplete="off">
          <h4 style={{ color: "grey" }}>BRANDS</h4>
          <TextField
            id="outlined-basic"
            label="Search Brands..."
            variant="outlined"
            valaue={brandName}
            onChange={(e) => setBrandName(e.target.value.toLocaleLowerCase())}
          />
        </form>
        <hr />
        <div className={classesSlider.root}>
          <Typography
            variant="h6"
            style={{ color: "grey" }}
            id="range-slider"
            gutterBottom
          >
            PRICE RANGE
          </Typography>
          <Slider
            min={1500}
            max={10000}
            value={sliderValue}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
          />
        </div>
        <hr />
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
                    size="small"
                    checked={black}
                    onChange={handleChange}
                    name="black"
                  />
                }
                label="Black"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={white}
                    onChange={handleChange}
                    name="white"
                  />
                }
                label="White"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={red}
                    onChange={handleChange}
                    name="red"
                  />
                }
                label="Red"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={blue}
                    onChange={handleChange}
                    name="blue"
                  />
                }
                label="Blue"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={grey}
                    onChange={handleChange}
                    name="grey"
                  />
                }
                label="Grey"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    size="small"
                    checked={brown}
                    onChange={handleChange}
                    name="brown"
                  />
                }
                label="Brown"
              />
            </FormGroup>
          </FormControl>
        </div>
        <hr />
        <div className="sort-by-sec">
          <h4 style={{ color: "grey" }}>SORT BY PRICE</h4>
          <FormControl component="fieldset">
            <FormLabel component="legend">RELEVANCE</FormLabel>
            <RadioGroup
              name="sorting"
              value={radioValue}
              onChange={(e) => {
                sortProducts(e.target.value);
                setRadioValue(e.target.value);
              }}
            >
              <FormControlLabel
                value="low"
                control={<Radio size="small" />}
                label="low to high"
              />
              <FormControlLabel
                value="high"
                control={<Radio size="small" />}
                label="high to low"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>

      <div className="result-sec">
        {color.length !== 0 ? (
          <React.Fragment>
            {brandName.length < 3 ? (
              <React.Fragment>
                {color.map((product) => {
                  return <Displaycard product={product} />;
                })}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {color
                  .filter((product) => product.brand === brandName)
                  .map((product) => {
                    return <Displaycard product={product} />;
                  })}
              </React.Fragment>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {brandName.length < 3 ? (
              <React.Fragment>
                {data.map((product) => {
                  return <Displaycard product={product} />;
                })}
              </React.Fragment>
            ) : (
              <React.Fragment>
                {data
                  .filter((product) => product.brand === brandName)
                  .map((product) => {
                    return <Displaycard product={product} />;
                  })}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
export default Filter;
