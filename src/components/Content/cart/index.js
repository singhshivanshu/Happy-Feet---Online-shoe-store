import React from "react";
import { useStyleCard } from "./style";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Cart() {
  const [cart, setCart] = React.useState([]);

  React.useEffect(() => {
    setCart(JSON.parse(sessionStorage.getItem("product")));
  }, []);

  console.log(cart && cart);

  const classesCard = useStyleCard();
  return (
    <div style={{display: "contents", justifyContent: "center"}}>
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
            <CardActions>
              <Button size="small" color="primary">
                {product.rating}
              </Button>
            </CardActions>
          </Card>
        ))}
    </div>
  );
}

export default Cart;
