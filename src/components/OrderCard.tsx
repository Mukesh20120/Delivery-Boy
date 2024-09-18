import React from "react";
import { IonRow, IonCol, IonIcon, IonButton } from "@ionic/react";
import { location } from "ionicons/icons";
import { Order } from "./DataInterFace";

interface OrderCardProps {
  order: Order;
  firstBtn: string | undefined;
  secondBtn: string | undefined;
  handleFirstBtnPress: (id: string) => void;
  handleSecondBtnPress: (id: string) => void;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  firstBtn,
  secondBtn,
  handleFirstBtnPress,
  handleSecondBtnPress,
}) => {
  const { shippingAddress } = order;

  return (
    <div className="order-list-card">
      <div>
        <IonRow class="order-title">
          <IonCol size="12" class="ion-text-start">
            <p>
              Order Id:{" "}
              <span style={{ fontWeight: "bolder" }}>{order?.orderID}</span>
            </p>
          </IonCol>

          <IonCol size="4" class="border-dashed">
            <p>Distance:</p>
            <h5 style={{ fontWeight: "bolder" }}>
              {order?.deliveryDistance || "10km"}
            </h5>
          </IonCol>
          <IonCol size="4" class="border-dashed">
            <p>Order Amount:</p>
            <h5>₹{order?.itemTotal || 0}</h5>
          </IonCol>
          <IonCol size="4" class="border-dashed">
            <p>Payment Type:</p>
            <h5 style={{ textTransform: "uppercase" }}>
              {order?.paymentMethod || ""}
            </h5>
          </IonCol>
        </IonRow>

        <IonRow class="section-1">
          <IonCol size="1"></IonCol>
          <IonCol size="11">
            <p style={{ margin: 0 }}>
              Delivery Time:{" "}
              {order?.deliveryTime && (
                <>
                  <span>
                    {new Date(order.deliveryTime).toLocaleDateString()}
                  </span>
                  <span style={{ marginLeft: "8px" }}>
                    {new Date(order.deliveryTime).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </>
              )}
            </p>
          </IonCol>
        </IonRow>

        <IonRow class="ion-section">
          <IonCol size="1">
            <p style={{ margin: 0 }}>
              <IonIcon icon={location} className="location-icon" />
            </p>
          </IonCol>
          <IonCol size="11">
            <p style={{ margin: 0 }}>
              {" "}
              Address: {shippingAddress?.googleAddress || ""}
            </p>
          </IonCol>
        </IonRow>
      </div>

      <div>
        <IonRow class="ion-text-center">
          {firstBtn && (
            <IonCol
              size="6"
              class="section-bottom"
              onClick={() => {
                handleFirstBtnPress(order._id);
              }}
            >
              <IonButton expand="block" className="form-button">
                {firstBtn}
              </IonButton>
            </IonCol>
          )}
          {secondBtn && (
            <IonCol
              size="6"
              class="section-bottom"
              onClick={() => {
                handleSecondBtnPress(order._id);
              }}
            >
              <IonButton expand="block" className="call-btn">
                {secondBtn}
              </IonButton>
            </IonCol>
          )}
        </IonRow>
      </div>
    </div>
  );
};

export default OrderCard;
