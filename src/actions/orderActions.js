import {
  SET_ERRORS,
  SET_ORDER_HISTORY,
  SET_ORDERED_ITEMS,
  REMOVE_ONE_ORDER_HISTORY,
} from './actionTypes';
import axiosInstance from '../utils/axiosInstance';
import { emptyCart } from './cartActions';
import { showFlash, removeFlash } from './flashActions';

const placeOrder = (cartItems = {}, handleModal, user) => (dispatch) => {
  if (!user.isAuthenticated) {
    const flashData = {
      title: 'Please Login',
      message: 'Login to place your order',
      flashType: 'flash-error',
    };
    dispatch(showFlash(flashData));
    setTimeout(() => dispatch(removeFlash()), 2000);
    handleModal();
  }
  const orderData = {
    foodItems: cartItems,
  };
  axiosInstance
    .post('/orders', orderData)
    .then((response) => {
      const { data } = response;

      const flashData = {
        title: 'Order submitted',
        message: 'Order submitted, Click My Orders on the navigation menu to see your order history',
        flashType: 'flash-success',
      };
      dispatch(showFlash(flashData));
      setTimeout(() => dispatch(removeFlash()), 2000);
      handleModal();

      dispatch(emptyCart());
    })
    .catch((errors) => {
      const { response = {}, request } = errors;
      // console.log(errors);
      // console.log(response);
      // console.log('=======');
      // console.log(request);

      if (response.data) {
        return dispatch({
          type: SET_ERRORS,
          payload: [...response.data.errors],
        });
      }

      return dispatch({
        type: SET_ERRORS,
        payload: [{ msg: 'An unknown error occurred, Please check your network and try again' }],
      });
    });
};

export const setOrderHistory = payload => ({
  type: SET_ORDER_HISTORY,
  payload,
});

export const setOrderedItems = payload => ({
  type: SET_ORDERED_ITEMS,
  payload,
});

export const removeOneOrderHistory = id => ({
  type: REMOVE_ONE_ORDER_HISTORY,
  id,
});

export const getOrderHistory = userId => (dispatch) => {
  // console.log(userId);
  axiosInstance
    .get(`/users/${userId}/orders`)
    .then((response) => {
      const { data } = response;
      // console.log(data);
      // alert('getOrders');
      dispatch(setOrderHistory(data.orders));
    })
    .catch((errors) => {
      const { response = {}, request } = errors;
      // console.log(response);
      // console.log('=======');
      // console.log(request);

      if (response.data) {
        return dispatch({
          type: SET_ERRORS,
          payload: [...response.data.errors],
        });
      }

      return dispatch({
        type: SET_ERRORS,
        payload: [{ msg: 'An unknown error occurred, Please check your network and try again' }],
      });
    });
};

export const getOrderedItems = (userId, orderId) => (dispatch) => {
  // console.log(userId, orderId);
  axiosInstance
    .get(`/users/${userId}/orders/${orderId}`)
    .then((response) => {
      const { data } = response;
      console.log(data);
      // alert('getOrders');
      dispatch(setOrderedItems(data.items));
    })
    .catch((errors) => {
      const { response = {}, request } = errors;
      // console.log(response);
      // console.log('=======');
      // console.log(request);

      if (response.data) {
        return dispatch({
          type: SET_ERRORS,
          payload: [...response.data.errors],
        });
      }

      return dispatch({
        type: SET_ERRORS,
        payload: [{ msg: 'An unknown error occurred, Please check your network and try again' }],
      });
    });
};

export const cancelOrder = (orderId = {}, handleModal) => (dispatch) => {
  // const cancelData = { orderId };
  axiosInstance
    .delete('/orders', { data: { orderId } })
    .then((response) => {
      // handleModal();
      dispatch(removeOneOrderHistory(orderId));
    })
    .catch((errors) => {
      const { response = {}, request } = errors;
      console.log(errors);
      console.log(response);
      console.log('=======');
      console.log(request);

      if (response.data) {
        return dispatch({
          type: SET_ERRORS,
          payload: [...response.data.errors],
        });
      }

      return dispatch({
        type: SET_ERRORS,
        payload: [{ msg: 'An unknown error occurred, Please check your network and try again' }],
      });
    });
};

export default placeOrder;
