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
    receiverPhoneNumber: string;
    location: Location;
    _id: string;
  }
  interface StoreLocation{
    sector: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
  }
  interface Store{
    _id: string;
    storeLocation: StoreLocation;
    email: string;
    mobile: string;
    location: Location;
  }
  export interface Order {
    _id: string;
    userId: string;
    orderID: string;
    products: Product[];
    deliveryDistance?: string;
    shippingAddress: ShippingAddress;
    mobile: number;
    itemTotal: number;
    grandTotal: number;
    savings: number;
    paymentMethod: string;
    deliveryCharge: number;
    promoCodeName: string;
    orderStatus: number;
    store?: Store,
    deliveryTime: string
  }