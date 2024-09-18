import React, { useEffect } from "react";
import { Preferences } from "@capacitor/preferences";
import { setAuthToken } from "../services";
import { useHistory } from "react-router";
import { IonItem, IonSpinner } from '@ionic/react';

interface orderState{
    orderId: string;
    status: string;
  }

const Navigation: React.FC = () => {

    const history = useHistory();

    useEffect(() => {
        const fetchToken = async () => {
          const { value: token } = await Preferences.get({ key: "token" });
          if (token) {
            setAuthToken(token);
            const {value}:any = await Preferences.get({ key: "orderState" });
            if(value!==null){
              const res:orderState = JSON.parse(value);
              history.replace("/orderDetail",res.orderId);
            }
            else{
              history.replace("/orderList");
            }
          }
          else{
            history.replace("/login")
          }
        };
        fetchToken();
      }, []);
  return (
    <div style={{height: '100%',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
       <IonItem>
        <IonSpinner></IonSpinner>
      </IonItem>
    </div>
  );
};
export default Navigation;
