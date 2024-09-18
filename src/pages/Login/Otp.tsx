import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import "../../style/style.scss";
import { IonButton, IonPage, IonIcon, IonContent } from "@ionic/react";
import { personOutline } from "ionicons/icons";
import { Preferences } from "@capacitor/preferences";
import { getOtp, login } from "../../services/apiFunction";
import { setAuthToken } from "../../services";
import ResendOtp from "../../components/ResendOtp";

import { CiEdit } from "react-icons/ci";
import Logo from "../../images/icon.png"

interface ReceivedData {
  mobile: string;
  otp?: string;
  hash: string;
}

const OtpPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();

  const receiveData: ReceivedData = location.state as ReceivedData;
  const { mobile, hash } = receiveData;

  const [InputOtp, setOtp] = useState<string>("");
  const [userHash, setUserHash] = useState<string>(hash);

  const storeToken = async (data: string) => {
    await Preferences.set({
      key: "token",
      value: data,
    });
  };

  const handleLogin = async () => {
    try {
      const loginCredentials = { mobile, otp: InputOtp, hash: userHash };
      const res = await login(loginCredentials);
      const { success, token, message } = res.data;
      if (!success) {
        throw new Error(message);
      }
      storeToken(token);
      setAuthToken(token);
      history.replace("/orderList");
    } catch (error) {
      alert(error);
    }
  };

  const verifyMobileNumber = async () => {
    try {
      const res = await getOtp({ mobile });
      const { success, hash, otp, message } = res.data;
      if (!success) throw new Error(message);
      if(otp)
      alert(`your otp is ${otp}`);
      setUserHash(hash);
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
            <b>OTP Verification</b>
          </h1>
          <div className="form-input ion-text-center">
            <p>OTP successfully send on</p>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>+91 {mobile} <CiEdit onClick={()=>{history.replace('/login')}} color="darkgreen" size={30} /></div>
          </div>

          <div className="form-input ion-margin-top">
            <input
              type="number"
              value={InputOtp}
              maxLength={4}
              placeholder="Please Enter Otp"
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
          <IonButton
            expand="block"
            onClick={handleLogin}
            className="form-button"
          >
            Verify OTP
          </IonButton>
          <ResendOtp initialSecond={30} onPress={verifyMobileNumber} />
        </div>
      </div>
    </IonContent>
  );
};

export default OtpPage;
