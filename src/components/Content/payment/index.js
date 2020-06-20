import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MuiAlert from "@material-ui/lab/Alert";
import { useStyles } from "./style";
import axios from "axios";

function Payment(props) {
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [cvv, setCvv] = useState("");
  const [expiry, setExpiry] = useState("");
  const [focus, setFocus] = useState("");

  const [status, setStatus] = useState(false);

  const classes = useStyles();

  // Addiding data to session storage
  const [product, setProduct] = useState(null);
  React.useEffect(() => {
    axios.get("/data/products.json").then((response) => {
      const a = response.data.filter(
        (elem) => elem.id === props.match.params.id
      );
      setProduct(a[0]);
    });
  }, [props.match.params.id]);

  // Adding data to session storage

  const paymentInitiated = () => {
    const existingItem = JSON.parse(sessionStorage.getItem("product")) || [];

    existingItem.push(product);
    sessionStorage.setItem("product", JSON.stringify(existingItem));

    setStatus(true);
  };

  //////

  const changeNameHandler = (e) => {
    const re = /[a-z\s]/i;
    if (re.test(e.key)) {
    } else {
      e.preventDefault();
    }
  };

  return (
    <React.Fragment>
      {status === true && (
        <MuiAlert severity="success">
          Congrats!!! You have successfully purchased your favouraite HAPPY FEET
          product. Please visit MY SHOES to check your item.
        </MuiAlert>
      )}

      <div style={{ textAlign: "-webkit-center" }}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Cards
              cvc={cvv}
              expiry={expiry}
              focused={focus}
              name={name}
              number={num}
            />
            <TextField
              id="outlined-number"
              label="Card Number"
              type="number"
              onInput={(e) => {
                e.target.value = Math.max(0, parseInt(e.target.value, 10))
                  .toString()
                  .slice(0, 16);
              }}
              className={classes.cardNo}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={num}
              onChange={(e) => setNum(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <TextField
              type="text"
              id="outlined-name"
              label="Card Name"
              className={classes.cardName}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={name}
              onKeyPress={(e) => changeNameHandler(e)}
              onChange={(e) => setName(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <TextField
              id="outlined-date"
              label="Valid upto"
              type="number"
              placeholder="MMYY"
              className={classes.cardDate}
              onInput={(e) => {
                e.target.value = Math.max(parseInt(e.target.value, 10))
                  .toString()
                  .slice(0, 4);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            <TextField
              id="outlined-CVV"
              label="CVV"
              type="number"
              className={classes.cardCVV}
              onInput={(e) => {
                e.target.value = Math.max(parseInt(e.target.value, 10))
                  .toString()
                  .slice(0, 3);
              }}
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              onFocus={(e) => setFocus(e.target.name)}
            />
            {num.length === 16 &&
            name &&
            (cvv.length >= 3) & (expiry.length === 4) ? (
              <Button
                variant="contained"
                onClick={() => paymentInitiated()}
                color="primary"
              >
                Pay
              </Button>
            ) : (
              <Button variant="contained" color="primary" href="#" disabled>
                Pay
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Payment;
