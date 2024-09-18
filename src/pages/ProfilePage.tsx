import React, { useEffect, useState } from "react";
import { getDriverProfile } from "../services/apiFunction";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonIcon,
} from "@ionic/react";
import { useHistory } from "react-router";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { chevronBackOutline } from "ionicons/icons";

interface ProfileDetails {
  currentLocation: {
    coordinates: number[]; // Assuming coordinates are numbers
  };
  _id: string;
  name: string;
  mobile: string;
  aadharNumber: string;
  isActive: boolean;
  isReady: boolean;
  isLive: boolean;
  __v: number;
  firstName: string;
  lastName: string;
  storeId: string;
  updatedAt: string; // Assuming it's a date string
  email: string;
  createdAt: string; // Assuming it's a date string
}

const ProfilePage: React.FC = () => {
  const [profileDetails, setProfileDetails] = useState<ProfileDetails>();

  const history = useHistory();

  const fetchProfileDetails = async () => {
    try {
      const res = await getDriverProfile();
      setProfileDetails(res.data.data); 
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchProfileDetails();
  }, []);
  
  return (
    <>
      <IonHeader className="header-section">
        <IonToolbar>
          <IonButtons slot="start" className="ion-padding">
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
        <div className="ion-padding">
          {/* <h2 style={{ fontWeight: "bolder" }}>Driver Profile</h2> */}
          <table
            style={{
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Name
                </td>
                <td style={{ border: "1px solid #ddd", textAlign: "center"}}>
                  {profileDetails?.name}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Mobile
                </td>
                <td style={{ border: "1px solid #ddd", textAlign: "center"}}>
                  {profileDetails?.mobile}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Aadhar Number
                </td>
                <td style={{ border: "1px solid #ddd", textAlign: "center"}}>
                  {profileDetails?.aadharNumber}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Email
                </td>
                <td style={{ border: "1px solid #ddd", textAlign: "center"}}>
                  {profileDetails?.email}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Is Active
                </td>
                <td style={{ border: "1px solid #ddd", textAlign: "center"}}>
                  {profileDetails?.isActive === true ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Is Live
                </td>
                <td style={{ border: "1px solid #ddd", textAlign: "center"}}>
                  {profileDetails?.isLive === true ? "Yes" : "No"}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Is Ready
                </td>
                <td style={{ border: "1px solid #ddd", textAlign: "center", }}>
                  {profileDetails?.isReady === true ? "Yes" : "No"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </IonContent>
    </>
  );
};

export default ProfilePage;
