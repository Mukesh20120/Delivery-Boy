import React, { useContext, useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonRow,
  IonCol,
  IonHeader,
  IonButtons,
} from "@ionic/react";
import { useHistory, useLocation } from "react-router";
import { getOrderDetails } from "../services/apiFunction";
import DriverStatusButton from "../components/DriverStatusBtn";
import FlickerIcon from "../components/FlickerIcon";
import MapIconBtn from "../components/MapIconBtn";
import {
  chevronBackOutline,
  documentOutline,
  storefrontOutline,
  locationOutline,
  personCircleOutline,
  callOutline,
} from "ionicons/icons";
import { Order } from "../components/DataInterFace";
import CallButton from "../components/CallBtn";
// import {useStore} from "../store/Store"
import { StoreContext } from "../store/Store";

const OrderDetailPage: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<Order>();

  const history = useHistory();
  const location = useLocation();
  const orderId = location.state;
  const x: any = useContext(StoreContext);
  useEffect(() => {
    const { data, setData } = x || {};
    const fetchOrderDetails = async () => {
      try {
        const res = await getOrderDetails({ orderId });
        setData((prev:any) => ({
          ...(prev !== null && prev !== undefined ? prev : {}),
          [orderId as string]: res.data.order 
        }));
        setOrderDetails(res.data.order);
      } catch (error) {
        alert(error);
      }
    };
    console.log(data,orderId);
    if (orderId !== undefined && data !== undefined) {
      const id = orderId as string; 
      if (data[id] === undefined) {
        fetchOrderDetails();
      } else {
        setOrderDetails(data[id]);
      }
    }
    
  }, [orderId]);

  const {
    products = [],
    shippingAddress = {
      addressType: "",
      googleAddress: "",
      completeAddress: "",
      floor: "",
      nearbyLandmark: "",
      receiverName: "",
      receiverPhoneNumber: "",
      _id: "",
    },
    _id = "",
    mobile = "",
    orderID = "",
    itemTotal = 0,
    grandTotal = 0,
    paymentMethod = "",
    deliveryCharge = 0,
    promoCodeName = "",
    orderStatus = 0,
  } = orderDetails || {};

  const {
    mobile: storeMobile = "xxxxxxxxx",
    storeLocation = {},
    location: {
      coordinates: [storeLat, storeLong] = [77.4146509, 28.7018628],
    } = {},
  } = orderDetails?.store ?? {};

  const storeAddress = Object.values(storeLocation).join(", ") || "Delhi India";

  const [showFlicker, setShowFlicker] = useState<Boolean>(false);
  const handleShowFlicker = (show: boolean) => {
    setShowFlicker(show);
  };
  return (
    <IonPage>
      <IonHeader className="header-section">
        <IonToolbar>
          <IonButtons
            slot="start"
            className="ion-padding"
            onClick={() => {
              if (!showFlicker) history.replace("/orderList");
            }}
          >
            <IonIcon className="back-icon" icon={chevronBackOutline} />
          </IonButtons>
          <IonTitle>Order Details</IonTitle>
          <IonButtons slot="end" className="ion-padding">
            {showFlicker && (
              <div>
                <FlickerIcon />
              </div>
            )}
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent class="ion-padding">
        {/* -----------user----card--------------- */}
        <IonRow class="user-card">
          <IonCol size="1">
            <h5>
              <IonIcon icon={personCircleOutline} />{" "}
            </h5>
          </IonCol>
          <IonCol size="11">
            <h5>
              <b style={{ textTransform: "uppercase" }}>
                {shippingAddress?.receiverName}
              </b>
            </h5>
          </IonCol>

          <IonCol size="1">
            <h6>
              <IonIcon icon={documentOutline} />
            </h6>
          </IonCol>
          <IonCol size="11">
            <h6>{orderID}</h6>
          </IonCol>
          <IonCol size="1">
            <h6>
              <IonIcon icon={callOutline} />
            </h6>
          </IonCol>
          <IonCol size="11">
            <h6>{mobile || ""}</h6>
          </IonCol>
          <IonCol size="1">
            <h6>
              <IonIcon icon={locationOutline} />
            </h6>
          </IonCol>
          <IonCol size="11">
            <h6>{shippingAddress?.googleAddress || ""} </h6>
          </IonCol>
          <IonCol size="6">
            <MapIconBtn
              userLocation={[
                orderDetails?.shippingAddress?.location?.coordinates[1],
                orderDetails?.shippingAddress?.location?.coordinates[0],
              ]}
            />
          </IonCol>
          <IonCol size="6">
            <CallButton phoneNumber={orderDetails?.mobile} />
          </IonCol>
        </IonRow>
        {/* ----------------user----card----end------------ */}

        {/* ---------Order--item---list--------- */}
        <div className="order-list">
          <IonRow class="ion-margin-bottom">
            <IonCol size="3">
              <b>Image</b>
            </IonCol>
            <IonCol size="6" class="ion-text-center">
              <b>Items</b>
            </IonCol>
            <IonCol size="3" class="ion-text-center">
              <b> Quantity</b>
            </IonCol>
          </IonRow>

          {products.map((product, index) => (
            <>
              <IonRow key={index}>
                <IonCol size="3">
                  <img className="item-image" alt="" src={product.images[0]} />
                </IonCol>
                <IonCol size="6" class="ion-text-center">
                  <span className="item-data"> {product?.name || ""}</span>
                </IonCol>
                <IonCol size="3" class="ion-text-center">
                  {product.quantity || 0}
                </IonCol>
              </IonRow>
            </>
          ))}
              <IonRow class="ion-margin-top">
                <IonCol size="12">
                  <h5>
                    <b>Payment Details:</b>
                  </h5>
                </IonCol>
                <IonCol size="12">
                  <p>
                    Payment Method:{" "}
                    <small>
                      <b style={{ textTransform: "uppercase" }}>
                        {paymentMethod}
                      </b>
                    </small>
                  </p>
                </IonCol>
                {paymentMethod === "cod" ? (
                  <IonCol size="12">
                    <p>
                      Total Amount to Collect:{" "}
                      <small>
                        <b>₹{itemTotal}</b>
                      </small>
                    </p>
                  </IonCol>
                ) : (
                  <IonCol size="12">
                    <p>
                      Payment Status:{" "}
                      <small>
                        <b>Payment Done</b>
                      </small>
                    </p>
                  </IonCol>
                )}
              </IonRow>
        </div>
        {/* --------order--item---list---end----------- */}

        {/* -----------Store----card--------------- */}
        <IonRow class="user-card">
          <IonCol size="1">
            <h5>
              <IonIcon icon={storefrontOutline} />
            </h5>
          </IonCol>
          <IonCol size="11">
            <h5>
              <b>Daykart</b>
            </h5>
          </IonCol>
          <IonCol size="1">
            <h6>
              <IonIcon icon={callOutline} />
            </h6>
          </IonCol>
          <IonCol size="11">
            <h6>{storeMobile}</h6>
          </IonCol>
          <IonCol size="1">
            <h6>
              <IonIcon icon={locationOutline} />
            </h6>
          </IonCol>
          <IonCol size="11">
            <h6>{storeAddress}</h6>
          </IonCol>
          <IonCol size="6">
            <MapIconBtn userLocation={[storeLong, storeLat]} />
          </IonCol>
          <IonCol size="6">
            <CallButton phoneNumber={storeMobile} />
          </IonCol>
        </IonRow>
        {/* ----------------store end------------ */}

        {/* --------status button-start------- */}
        <div
          style={{
            marginTop: "20px",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <DriverStatusButton
            oId={typeof orderId === "string" ? orderId : ""}
            handleFlicker={handleShowFlicker}
          />
        </div>
        {/* --------status button-end------- */}
      </IonContent>
    </IonPage>
  );
};

export default OrderDetailPage;
