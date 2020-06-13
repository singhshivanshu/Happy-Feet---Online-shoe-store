import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import GradeIcon from "@material-ui/icons/Grade";
import { useStyleCard } from "./style";

function Displaycard(props) {
  const classesCard = useStyleCard();
  return (
    <Card
      className={classesCard.root}
      style={{ margin: "1%", padding: "10px" }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          alt={props.product.name}
          height="300"
          image={props.product.img}
          title={props.product.name}
        />
        <CardContent>
          <Typography
            style={{ textTransform: "capitalize" }}
            gutterBottom
            variant="h5"
            component="h2"
          >
            {props.product.brand}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <strong>{props.product.name}</strong>
            <hr />
            <strong>Rs.{props.product.discount_price}</strong>&nbsp;&nbsp;
            <del>Rs.{props.product.original_price}</del>&nbsp;
            <span className="discount_percent">
              ({props.product.discount}%)
            </span>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="primary"
          href={`${props.product.id}/payment`}
        >
          BUY
        </Button>

        <Chip
          label={props.product.rating}
          icon={<GradeIcon fontSize="small" />}
          color="secondary"
          style={{ backgroundColor: "#4CAF50" }}
        />
      </CardActions>
    </Card>
  );
}
export default Displaycard;
