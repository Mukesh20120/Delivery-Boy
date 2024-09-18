import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Preferences } from "@capacitor/preferences";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import LoginPage from "./pages/Login/Login";
import OrderListPage from "./pages/OrderList";
import OrderDetailPage from "./pages/OrderDetailPage";
import CompleteOrderPage from "./pages/CompleteOrder";
import ProfilePage from "./pages/ProfilePage";
import OtpPage from "./pages/Login/Otp";
import ProfileMenu from "./pages/ProfileMenu";
import DeliveredOrder from "./pages/DeliveredOrder";
import BackgroundLocation from "./pages/BackgroundLocation";
import ContactUS from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import MapIconBtn from "./components/MapIconBtn";
import Navigation from "./pages/Navigation";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/orderList" component={OrderListPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/orderDetail" component={OrderDetailPage} />
            <Route exact path="/deliverDone" component={CompleteOrderPage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/otp" component={OtpPage}/>
            <Route exact path="/menu" component={ProfileMenu}/>
            <Route exact path="/history" component={DeliveredOrder}/>
            <Route exact path="/location" component={BackgroundLocation}/>
            <Route exact path="/aboutUs" component={AboutUs}/>
            <Route exact path="/contactUs" component={ContactUS}/>
            <Route exact path="/navigation" component={Navigation}/>
            {/* <Route exact path="/location" component={BackgroundLocation}/>
            <Route exact path="/mapIcon" component={MapIconBtn}/> */}
            <Route path="/">
              <Redirect to={"/navigation"} />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
