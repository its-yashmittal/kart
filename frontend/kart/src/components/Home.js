import React from "react";
import Header from './Header.js'
import Footer from './Footer.js'
import Shop from './Shop.js'
import Product from './Product'
import Login from './Login'
import SignUp from './SignUp'
import AboutUs from './AboutUs'
import Terms from './TermsService'
import PrivPol from './PrivacyPolicy'
import Youtube from './Youtube'
import Facebook from './Facebook'
import Twitter from './Twitter'
import Instagram from './Instagram'
import AddProduct from './AddProducts'
import Watches from './Watches'
import Mobiles from './Mobiles'
import Shirts from './Shirts'
import TShirts from './TShirts'
import Trousers from './Trousers'
import Trackpants from './Trackpants'
import Buy from './Buy'
import Kart from './Kart'
import VIPLounge from './VIP.js'
import User from './User.js'
import "bulma/css/bulma.min.css"
import '../css/index.css'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
function App() {
  return (
    <Router >
    
      <Header />
      <div>
      <Switch>
        <Route exact path="/">
          <Shop />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/kart">
          <Kart />
        </Route>
        <Route path="/product">
          <Product />
        </Route>
        <Route path="/addproducts">
          <AddProduct />
        </Route>
        <Route path="/watches">
          <Watches />
        </Route>
        <Route path="/mobiles">
          <Mobiles />
        </Route>
        <Route path="/shirts">
          <Shirts />
        </Route>
        <Route path="/tshirts">
          <TShirts />
        </Route>
        <Route path="/trousers">
          <Trousers />
        </Route>
        <Route path="/trackpants">
          <Trackpants />
        </Route>
        <Route path="/vip">
          <VIPLounge />
        </Route>
        <Route path="/buy">
          <Buy />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/user">
          <User />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/youtube">
          <Youtube />
        </Route>
        <Route path="/facebook">
          <Facebook />
        </Route>
        <Route path="/twitter">
          <Twitter />
        </Route>
        <Route path="/instagram">
          <Instagram />
        </Route>
        <Route path="/aboutus">
          <AboutUs />
        </Route>
        <Route path="/terms">
          <Terms />
        </Route>
        <Route path="/privacy">
          <PrivPol />
        </Route>
      </Switch>
    </div>
    <Footer />
    </Router>
  );
}

export default App;
