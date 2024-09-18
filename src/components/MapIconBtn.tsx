import React, { useState } from "react";
import { FaDirections } from "react-icons/fa";
import BackgroundGeolocation, {
  Subscription,
} from "@transistorsoft/capacitor-background-geolocation";
import { IonButton } from "@ionic/react";

type LocationType = any; // Replace any with the actual type of your locations

const MapIconBtn: React.FC<{
  userLocation: [LocationType, LocationType] | undefined;
}> = ({ userLocation }) => {
  // Destructure the array elements
  const [firstLocation, secondLocation] = userLocation || [];

  const [position, setPosition] = React.useState<any>();
  React.useEffect(() => {
    /// 1.  Subscribe to events.
    const onLocation: Subscription = BackgroundGeolocation.onLocation(
      (location) => {
        setPosition({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        BackgroundGeolocation.stop();
      }
    );

    /// 2. ready the plugin.
    BackgroundGeolocation.ready({
      // Geolocation Config
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      distanceFilter: 10,
      // Activity Recognition
      stopTimeout: 5,
      // Application config
      debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      stopOnTerminate: false, // <-- Allow the background-service to continue tracking when user closes the app.
      startOnBoot: true, // <-- Auto start tracking when device is powered-up.
    }).then((state) => {});
    BackgroundGeolocation.start();
    return () => {
      onLocation.remove();
    };
  }, []);

  const handleOpenGoogleMaps = () => {
    const startLat = position.latitude; // Replace with your start latitude
    const startLng = position.longitude; // Replace with your start longitude
    const endLat = firstLocation; // Replace with your end latitude
    const endLng = secondLocation; // Replace with your end longitude

    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${startLat},${startLng}&destination=${endLat},${endLng}`;

    window.open(googleMapsUrl, "_blank");
  };

  return (
    <>
      <IonButton
        expand="block"
        className="form-button"
        onClick={handleOpenGoogleMaps}
      >
        <FaDirections className="bottom-icon" size={20} color="white" />{" "}
        Navigate
      </IonButton>
    </>
  );
};

export default MapIconBtn;
