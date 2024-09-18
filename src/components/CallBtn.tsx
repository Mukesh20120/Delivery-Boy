import { IonButton, IonIcon } from "@ionic/react";
import { callOutline } from "ionicons/icons";

interface props{
    phoneNumber: any
}

const CallButton: React.FC<props> = ({phoneNumber}) => {
    const handleCallButtonClick = () => {
      const url = 'tel:' + phoneNumber;
    if(phoneNumber)
      window.open(url);
    };

  return (
    <>
      <IonButton expand="block" className="call-btn" onClick={handleCallButtonClick}>
        <IonIcon className="bottom-icon" icon={callOutline} /> Call
      </IonButton>
    </>
  );
};

export default CallButton;
