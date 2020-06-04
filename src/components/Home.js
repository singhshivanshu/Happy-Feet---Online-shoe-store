import React from "react";
import Header from "./Header";
import Content from "./Content";
import { Switch, Route } from "react-router-dom";
import Payment from "./Content/payment";
import Cart from "./Content/cart";

function Home() {
 

  return (
    <React.Fragment>
      <Header />
      <Switch>
        <Route exact path="/" component={Content} />
        <Route path="/:id/payment" component={Payment} />
        <Route
          path="/cart"
          component={() => <Cart/>}
        />
      </Switch>
    </React.Fragment>
  );
}

export default Home;
