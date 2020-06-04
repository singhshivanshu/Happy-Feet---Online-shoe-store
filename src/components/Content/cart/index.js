import React, { useState, useEffect } from "react";
import { useStyleCard } from "./style";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import GradeIcon from "@material-ui/icons/Grade";
import Typography from "@material-ui/core/Typography";
import MuiAlert from "@material-ui/lab/Alert";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(sessionStorage.getItem("product")));
  }, []);

  console.log(cart && cart.length);
  // console.log(cart && cart);
  // console.log(props.size)

  const classesCard = useStyleCard();
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {cart && cart ? (
        cart &&
        cart.map((product) => (
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
                title="name"
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
                <Typography variant="body2" color="textSecondary" component="p">
                  <strong>{product.name}</strong>
                  <hr />
                  <strong>Rs.{product.discount_price}</strong>&nbsp;&nbsp;
                  <del>Rs.{product.original_price}</del>&nbsp;
                  <span className="discount_percent">
                    ({product.discount}%)
                  </span>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions style={{ justifyContent: "flex-end" }}>
              <Chip
                label={product.rating}
                icon={<GradeIcon fontSize="small" />}
                color="secondary"
                style={{ backgroundColor: "#4CAF50" }}
              />
            </CardActions>
          </Card>
        ))
      ) : (
        <MuiAlert style={{width: "100%"}} severity="info">OOPS!!! You are yet to buy anything, Please have a look at products, We assure you it's worth giving time.</MuiAlert>
      )}
    </div>
  );
}

export default Cart;
