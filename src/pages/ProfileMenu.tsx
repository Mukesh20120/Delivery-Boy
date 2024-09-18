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

const ProfileMenu: React.FC = () => {
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
          <IonTitle>Driver Profile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ padding: "20px" }}>
          <ul style={{ listStyleType: "none", padding: 0, fontSize: "20px" }}>
            <li
              style={listStyle}
              onClick={()=>{
                history.push('/profile')
              }}
            >
              Profile
            </li>
            <li
             style={listStyle}
             onClick={()=>{history.push('/history')}}
            >
              Orders
            </li>
            <li
             style={listStyle}
             onClick={()=>{history.push('/aboutUs')}}
            >
              About us
            </li>
            <li
             style={listStyle}
             onClick={()=>{history.push('/contactUs')}}
            >
              Contact us
            </li>
            <li
             style={listStyle}
              onClick={() => {
                handleLogout();
              }}
            >
              <IoIosLogOut
                size={20}
                style={{ marginRight: "10px", verticalAlign: "middle" }}
              />
              Logout
            </li>
          </ul>
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
}

export default ProfileMenu;
