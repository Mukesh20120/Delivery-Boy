import React from "react";
import {
  IonContent,
  IonPage,
  IonButton,
  IonToolbar,
  IonTitle,
  IonIcon,
} from "@ionic/react";
import { useHistory } from "react-router";
import { personOutline } from "ionicons/icons";
import { FaCheck } from "react-icons/fa6";


const CompleteOrderPage: React.FC = () => {
  const history = useHistory();
  const handleReturnToOrders = () => {
    // Handle navigation to the order list page
    // You can use React Router or any other navigation method here
    history.replace("/orderList");
  };

  return (
    <IonContent>
      {/* <div style={{display: 'flex', padding: '20px', textAlign: 'center',height: '100%',justifyContent: 'center',alignItems: 'center',flexDirection: 'column'}}>
          <div>
          <h3>Deliver Successful!</h3>
          </div>
          <p>Great job, driver! You have successfully delivered the order.</p>
          <IonButton className='form-button' expand="block" onClick={handleReturnToOrders}>Return to Order List</IonButton>
        </div> */}

      <div className="form ion-text-center">
        <div>
          <FaCheck className="check-icon" />
        </div>
        <div>
          <h3>Deliver Successful!</h3>
        </div>
        <p>Great job, driver! You have successfully delivered the order.</p>

        <IonButton
          expand="block"
          onClick={handleReturnToOrders}
          className="form-button"
        >
          Return to Order List
        </IonButton>
      </div>
    </IonContent>
  );
};

export default CompleteOrderPage;
