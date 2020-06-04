import React from "react";
import { useStyleCard } from "./style";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Chip from "@material-ui/core/Chip";
import GradeIcon from "@material-ui/icons/Grade";
import Typography from "@material-ui/core/Typography";

function Cart() {
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    setCart(JSON.parse(sessionStorage.getItem("product")));
  }, []);

  console.log(cart && cart);

  const classesCard = useStyleCard();
  return (
    <div style={{ display: "flex", flexWrap: "wrap" ,justifyContent: "center" }}>
      {cart &&
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
                  {product.name}
                  <hr />
                  Rs.{product.original_price}
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
        ))}
    </div>
  );
}

export default Cart;
