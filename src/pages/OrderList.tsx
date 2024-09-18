import React, { useEffect, useState } from "react";
import { chevronBackOutline } from "ionicons/icons";
import { IonCol, IonRow, IonToggle } from "@ionic/react";
import { IonContent, IonHeader, IonIcon } from "@ionic/react";
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import OrderCard from "../components/OrderCard";
import { useHistory } from "react-router";
import {
  acceptOrder,
  getOrderList,
  rejectOrder,
  toggleIsReady,
} from "../services/apiFunction";
import { RxAvatar } from "react-icons/rx";
import { Order } from "../components/DataInterFace";

const OrderListPage: React.FC = () => {
  const history = useHistory();
  const [availableOrders, setAvailableOrders] = useState<Order[]>([]);
  const [acceptedOrders, setAcceptedOrders] = useState<Order[]>([]);
  const [driverStatus, setDriverStatus] = useState<boolean>(true);
  const handleAcceptOrder = async (id: string | null) => {
    try {
      const data = { orderId: id, action: "accept" };
      await acceptOrder(data);
      fetchOrderList();
    } catch (error) {
      alert(error);
    }
  };
  const handleRejectOrder = async (id: string | null) => {
    try {
      const data = { orderId: id, action: "reject" };
      await rejectOrder(data);
      fetchOrderList();
    } catch (error) {
      alert(error);
    }
  };
  const fetchOrderList = async () => {
    try {
      const res = await getOrderList();
      const { availableOrders, acceptedOrders } = res.data;
      setAvailableOrders(driverStatus===true?availableOrders:[]);
      setAcceptedOrders(acceptedOrders);
    } catch (error) {
      alert(error);
    }
  };
  const OrderDetailPage = (id: any) => {
    history.push("/orderDetail", id);
  };
  const handleToggle = async () => {
    try {
      await toggleIsReady({ isLive: !driverStatus });
      setDriverStatus((prev) =>{
        if(prev)
           setAvailableOrders([]);
        return !prev});
      // if (driverStatus === false) fetchOrderList();
      // else {
      //   setAvailableOrders([]);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderList();
  }, [driverStatus]);

  const [showPending, setShowPending] = useState<boolean>(true);

  const handleSegmentChange = (event: CustomEvent) => {
    const value = (event.target as HTMLIonSegmentElement).value;
    if (value) {
      setShowPending(value === "pending"); // If value is 'custom', show pending list
    }
  };

  return (
    <>
      <IonHeader className="header-section">
        <IonRow>
          <IonCol size="8" class="ion-padding">
            <h4>Order List</h4>
          </IonCol>
          <IonCol size="2" class="ion-text-center">
            <IonToggle
              color="success"
              checked={driverStatus}
              onIonChange={handleToggle}
              className="toggle-btn"
            ></IonToggle>
          </IonCol>
          <IonCol size="2" id="cover-trigger">
            <RxAvatar
              size={30}
              onClick={() => {
                history.push("/menu");
              }}
            />
          </IonCol>
        </IonRow>
      </IonHeader>

      <IonContent>
        <IonSegment
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white",
          }}
          value={showPending ? "pending" : "available"}
          onIonChange={(e) => {
            handleSegmentChange(e);
          }}
        >
          <IonSegmentButton value="pending">
            <IonLabel>Pending Order</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="available">
            <IonLabel>Available Order</IonLabel>
          </IonSegmentButton>
        </IonSegment>
        <div style={{ overflow: "hidden", marginBottom: "15%" }}>
          {showPending
            ? acceptedOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  firstBtn="Order Details"
                  secondBtn="Reject"
                  order={order}
                  handleFirstBtnPress={OrderDetailPage}
                  handleSecondBtnPress={handleRejectOrder}
                />
              ))
            : availableOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  firstBtn="Accept Order"
                  secondBtn={undefined}
                  order={order}
                  handleFirstBtnPress={handleAcceptOrder}
                  handleSecondBtnPress={() => {}}
                />
              ))}
        </div>
      </IonContent>
    </>
  );
};

export default OrderListPage;
