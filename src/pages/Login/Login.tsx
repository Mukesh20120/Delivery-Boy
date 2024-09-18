import React, { useState } from "react";
import "../../style/style.scss";
import { IonButton, IonPage, IonIcon, IonContent, IonImg } from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { getOtp } from "../../services/apiFunction";
import { useHistory } from "react-router";
import Logo from "../../images/icon.png"

const LoginPage: React.FC = () => {
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const history = useHistory();

  const verifyMobileNumber = async () => {
    try {
      const res = await getOtp({ mobile: mobileNumber });
      const { success, hash, otp, message } = res.data;
      if (!success) throw new Error(message);
      if (otp) alert(`your otp is ${otp}`);
      history.replace("/otp", { mobile: mobileNumber, otp, hash });
    } catch (error) {
      alert(`${error}`);
    }
  };

  return (
    <IonContent className="login-page">
      <div>
        <div className="form">
          <div className="ion-text-center">
            <img src={Logo} className="user-icon" />
          </div>
          <h1 className="form-title ion-text-center">
            <b>Login</b>
          </h1>
          <div className="form-input">
            <label>
              <b>Mobile No.</b>
            </label>
            <input
              type="number"
              value={mobileNumber}
              maxLength={10}
              placeholder="+917887XXXXXX"
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <IonButton
            expand="block"
            onClick={verifyMobileNumber}
            className="form-button"
          >
            Send Mobile Number
          </IonButton>
        </div>
      </div>
    </IonContent>
  );
};

export default LoginPage;
