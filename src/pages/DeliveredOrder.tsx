import React, { useEffect, useState } from "react";
import { getDeliveredOrderList } from "../services/apiFunction";
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonIcon,
} from "@ionic/react";
import { useHistory } from "react-router";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import OrderCard from "../components/OrderCard";
import { chevronBackOutline } from "ionicons/icons";

interface Location {
  type: string;
  coordinates: number[];
}

interface Product {
  productId: string;
  quantity: number;
  name: string;
  mrp: number;
  discountedPrice: number;
  stock: number;
  images: string[];
}

interface ShippingAddress {
  addressType: string;
  googleAddress: string;
  completeAddress: string;
  floor: string;
  nearbyLandmark: string;
  receiverName: string;
  location: Location;
  receiverPhoneNumber: string;
  _id: string;
}

interface Order {
  location: Location;
  locationTracking: any[]; // Assuming any array type for now
  rejectedDriverIds: any[]; // Assuming any array type for now
  declineDrivers: any[]; // Assuming any array type for now
  _id: string;
  userId: string;
  orderID: string;
  products: Product[];
  shippingAddress: ShippingAddress;
  mobile: number;
  itemTotal: number;
  grandTotal: number;
  savings: number;
  paymentMethod: string;
  deliveryCharge: number;
  promoCodeName: string;
  orderStatus: number;
  onlineReferenceNumber: number;
  isGofrugalOrderCreated: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const DeliveredOrder: React.FC = () => {
  const [deliveredOrderList, setDeliveredOrderList] = useState<Order[]>([]);

  const history = useHistory();

  const fetchDeliveredOrder = async () => {
    try {
      const deliveredList = await getDeliveredOrderList();
      setDeliveredOrderList(deliveredList?.data?.orderHistory);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    fetchDeliveredOrder();
  }, []);

  return (
    <>
      <IonHeader className="header-section">
        <IonToolbar>
          <IonButtons slot="start" className="ion-padding">
            <IonIcon
              className="back-icon"
              icon={chevronBackOutline}
              onClick={() => {
                history.goBack();
              }}
            />
          </IonButtons>
          <IonTitle>Delivered Order</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {deliveredOrderList? (
          <div>
            {deliveredOrderList.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                firstBtn={undefined}
                secondBtn={undefined}
                handleFirstBtnPress={() => {}}
                handleSecondBtnPress={()=>{}}
              />
            ))}
          </div>
        ) : (
          <div style={{textAlign: 'center'}}>
            <p>Nothing delivered yet</p>
          </div>
        )}
      </IonContent>
    </>
  );
};

export default DeliveredOrder;
