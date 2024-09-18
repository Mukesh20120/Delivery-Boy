import React, { useEffect, useState } from "react";
import { IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import BackgroundGeolocation from "@transistorsoft/capacitor-background-geolocation";
import { changeStatus, sendCurrentLocation } from "../services/apiFunction";
import {Preferences} from '@capacitor/preferences'

interface orderState{
  orderId: string;
  status: string;
  pickup: boolean;
  reached: boolean;
}

const DriverStatusButton: React.FC<{
  oId: string;
  handleFlicker: (show: boolean) => void;
}> = ({ oId, handleFlicker }) => {
  const history = useHistory();

  const handleTrackLocation = async ({ data }: any) => {
    try {
      await sendCurrentLocation(data);
    } catch (error) {
      alert(error);
    }
  };
  const [ready, setReady] = useState<boolean>(false);

  const handleWatchPositionStart = () => {
    if (!ready) return;
    handleFlicker(true);
    console.log("flicker started")
    BackgroundGeolocation.start();
    BackgroundGeolocation.watchPosition(
      (location) => {
        const {
          coords: { latitude, longitude },
        } = location;
        const data = { orderId: oId, coordinates: [longitude, latitude] };
        handleTrackLocation({ data });
      },
      (errorCode) => {
        alert(errorCode);
      },
      {
        interval: 10000,
      }
    );
  };

  const handleWatchPositionStop = () => {
    if (!ready) return;
    handleFlicker(false);
    BackgroundGeolocation.stop();
    BackgroundGeolocation.stopWatchPosition();
  };

  const getSnapShort = async()=>{
    const {value}:any = await Preferences.get({key: "orderState"});
    if(value!==null){
      const res:orderState = JSON.parse(value);
      handleButtonClick(res.status);
    }
  }
  const takeSnapShort = async (status: string) =>{
    const data = {orderId: oId,status,pickup: pickup,reached: reached};
     await Preferences.set({
      key: "orderState",
      value: JSON.stringify(data),
     })
  }
  const removeSnapShort = async () =>{
    await Preferences.remove({key: 'orderState'});
  }

  React.useEffect(() => {
    BackgroundGeolocation.ready({
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      stopTimeout: 5,
      debug: true, 
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false, 
      startOnBoot: true, 
    }).then((state) => {
      setReady(true);
    });
    return () => {};
  }, []);

  useEffect(()=>{
    if(ready){
      getSnapShort();
    }
  },[ready])


  const [pickup, setPickUp] = useState<boolean>(false);
  const [reached, setReached] = useState<boolean>(false);

  
  
  const handleButtonClick = async (status: string) => {
    takeSnapShort(status);
    try {
      let newStatus;
      switch (status) {
        case "picked-up":
          newStatus = "reached";
          handleWatchPositionStart();
          break;
        case "reached":
          newStatus = "delivered";
          handleWatchPositionStop();
          break;
        case "not-reached":
        case "undelivered":
          newStatus = "undelivered";
          removeSnapShort();
          handleWatchPositionStop();
          history.replace('/orderList');
          break;
        case "delivered":
          newStatus = "delivered";
          removeSnapShort();
          history.replace('/deliverDone');
          break;
        default:
          throw new Error("Invalid status");
      }
      await changeStatus({ orderId: oId, status: status });
      setPickUp(status === "picked-up" || status === "reached");
      setReached(status === "reached");
    } catch (error) {
      alert(error);
    }
  };
  
  const renderButtons = () => {
    const buttons = [];
    if (!pickup) {
      buttons.push(<IonButton key="pickup" className="form-button" onClick={() => handleButtonClick("picked-up")}>Pickup</IonButton>);
    } else if (!reached) {
      buttons.push(<IonButton key="reached" className="form-button" onClick={() => handleButtonClick("reached")}>Reached</IonButton>);
      buttons.push(<IonButton key="not-reached" className="form-button-negative" onClick={() => handleButtonClick("not-reached")}>Not Reached</IonButton>);
    } else {
      buttons.push(<IonButton key="delivered" className="form-button" onClick={() => handleButtonClick("delivered")}>Delivered</IonButton>);
      buttons.push(<IonButton key="not-delivered" className="form-button-negative" onClick={() => handleButtonClick("undelivered")}>Not Delivered</IonButton>);
    }
    return buttons;
  };
  
  return (
    <div style={{display: 'column',justifyContent: 'center',alignContent: 'center'}}>
      {renderButtons()}
    </div>
  );
  
};

export default DriverStatusButton;
