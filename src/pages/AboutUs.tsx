import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonIcon,
} from "@ionic/react";
import { useHistory } from "react-router";
import { IoIosArrowDropleftCircle, IoIosLogOut } from "react-icons/io";
import { Preferences } from "@capacitor/preferences";
import { setAuthToken } from "../services";
import { chevronBackOutline } from "ionicons/icons";

const AboutUs: React.FC = () => {
  const history = useHistory();
  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      try {
        // Perform logout action
        await Preferences.remove({ key: "token" });
        setAuthToken(undefined);
        history.replace("/");
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <>
      <IonHeader className="header-section">
        <IonToolbar>
          <IonButtons slot="start" className="ion-padding">
            {/* <IoIosArrowDropleftCircle
              size={30}
              onClick={() => {
                history.goBack();
              }}
              style={{ cursor: "pointer" }}
            /> */}
            <IonIcon
              className="back-icon"
              icon={chevronBackOutline}
              onClick={() => {
                history.goBack();
              }}
            />
          </IonButtons>
          <IonTitle>About Us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <div style={{ padding: "0 20px 20px 20px", marginBottom: "40px" }}>
          <h3>About Us</h3>
          <p>
            Welcome to DayKart, your go-to Offline to Online supermarket for all
            your grocery, household, and essential needs. We bring the
            convenience of online shopping to your fingertips while ensuring you
            receive the same quality and trust you would find in our physical
            stores, delivered right to your doorstep.
          </p>
          <p>
            With a vast selection of over 15,000 products from various brands
            and categories, ranging from fresh produce and pantry staples to
            electronics and personal care items, we cater to all your lifestyle
            needs at competitive prices. Our commitment to quality means each
            product is carefully curated to meet our standards of excellence.
          </p>
          <p>
            Experience the ease of shopping with DayKart through our
            user-friendly interface, allowing you to create wish lists, track
            your order history, and receive personalized recommendations based
            on your preferences. Plus, with our next-hour delivery service, you
            can enjoy the convenience of receiving your order within 3 hours of
            purchase.
          </p>
          <p>
            We offer multiple payment options, including cash on delivery and
            online payment gateways, to suit your preferences. Our dedicated
            customer support team is available 24/7 to assist you with any
            queries or concerns you may have, ensuring a seamless shopping
            experience from start to finish.
          </p>
          <h3>How to Reach Us</h3>
          <p>
            For any inquiries, feedback, or support, please don't hesitate to
            contact us through the following channels:
          </p>
          <ul>
            <li>Email: support@daykart.com</li>
            <li>Phone: 090151 26652</li>
          </ul>
          <p>
            Your satisfaction is our priority, and we look forward to serving
            you as a valued member of the DayKart family. Thank you for choosing
            us as your trusted partner for all your grocery needs.
          </p>
        </div>
      </IonContent>
    </>
  );
};

const listStyle = {
  marginBottom: "10px",
  cursor: "pointer",
  padding: "5px",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
};

export default AboutUs;
