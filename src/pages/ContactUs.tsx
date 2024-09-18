import React, { useEffect } from "react";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import { useHistory } from "react-router";
import { IoIosArrowDropleftCircle, IoIosLogOut } from "react-icons/io";
import { Preferences } from "@capacitor/preferences";
import { setAuthToken } from "../services";
import { chevronBackOutline } from "ionicons/icons";

const ContactUS: React.FC = () => {
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
          <IonTitle>Contact Us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
      <div style={{ padding: "0 20px 20px 20px", marginBottom: "40px" }}>
          <h3>Contact Us</h3>
          <p>
            We value your feedback and are committed to providing excellent
            customer service. Reach out to us through any of the following
            channels for inquiries, feedback, or support:
          </p>
          <IonList lines="none">
            <IonItem>
              <IonLabel>
                <strong>Email:</strong>{" "}
                <a href="mailto:support@daykart.com">support@daykart.com</a>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <strong>Phone:</strong> 090151 26652
              </IonLabel>
            </IonItem>
          </IonList>
          <p>
            Our customer support team is available around the clock to assist
            you with any questions or concerns you may have. Whether you need
            assistance with your order, have product inquiries, or simply want
            to share your experience with us, we're here to help.
          </p>

          <h3>Stay Connected</h3>
          <p>Follow us on social media for updates, promotions, and more:</p>
          <IonList lines="none">
            <IonItem>
              <IonLabel>
                <strong>Facebook:</strong>{" "}
                <a href="https://www.facebook.com/daykart">
                  facebook.com/daykart
                </a>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <strong>Twitter:</strong>{" "}
                <a href="https://twitter.com/i/flow/login?redirect_after_login=%2Fdaykart">twitter.com/daykart</a>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <strong>Instagram:</strong>{" "}
                <a href="https://www.instagram.com/daykart/?utm_medium=copy_link">
                  instagram.com/daykart
                </a>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <strong>Linkedin:</strong>{" "}
                <a href="https://www.linkedin.com/in/daykart/">
                  linkedin.com/daykart
                </a>
              </IonLabel>
            </IonItem>
          </IonList>

          <h3>Visit Us</h3>
          <p>
            If you prefer face-to-face interaction, visit one of our experience
            stores to explore our wide range of products and experience our
            exceptional service firsthand. Our knowledgeable staff will be happy
            to assist you with your shopping needs and provide personalized
            recommendations.
          </p>
          <h4>Our Store Locations</h4>
          <IonList lines="none">
            <IonItem className="ion-margin-bottom">
              <IonLabel>Main Store: Shop No 1,2,3,4,5,6 and 7, NH-24, Village Mehrauli, Pargana Dasna, Golf Links, Ghaziabad, Ghaziabad, Uttar Pradesh, 201002</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Branch Store: Shop No. 36, Galleria Market, River Heights Rd, Sehani Khurd, Raj Nagar Extension, Ghaziabad, Uttar Pradesh 201017</IonLabel>
            </IonItem>
          </IonList>
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

export default ContactUS;
