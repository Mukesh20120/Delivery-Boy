import api from './index'

export const getOtp = (data: any) => {
    return api.post('/api/driver/login/sendotp',data);
}

export const login = (data: any) => {
    return api.post('/api/driver/login/verifyotp',data);
}

export const toggleIsReady = (data: any) => {
    return api.put('/api/driver/islivetoggle',data);
}
export const getOrderList = () => {
  return api.get('/api/driver/order/list');
}

export const acceptOrder = (data: any) => {
    return api.put('/api/driver/order/accept',null,{params: data});
}
export const rejectOrder = (data: any) => {
    return api.put('/api/driver/order/accept',null,{params: data});
}

export const getOrderDetails = (data: any) => {
   return api.get(`/api/driver/order?orderId=${data.orderId}`);
}
export const sendCurrentLocation = (data: any) => {
   return api.put('/api/driver/order/locationtracking',data);
}
export const getDriverProfile = () => {
   return api.get('/api/driver/profile');
}
export const getDeliveredOrderList = () =>{
  return api.get('/api/driver/order/history')
}
export const changeStatus = (statusData: any) =>{
    return api.put('/api/driver/order/deliverystatus',null,{params: statusData})
}