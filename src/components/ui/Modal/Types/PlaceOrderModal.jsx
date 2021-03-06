import React from 'react';
import { connect } from 'react-redux';
import placeOrder from '../../../../actions/orderActions';

export const PlaceOrderModal = props => (
  <div>
    <h2 className="text-center">You are about to place an order</h2>
    <form method="POST" className=" card card-shadow">
      <div className="">
        <h3>Are you sure you want to order all the items in cart?</h3>
        <button
          onClick={() => {
            props.placeOrder(props.cart, props.handleModal, props.user);
          }}
          type="button"
          className="btn btn-green btn-rounded btn-bg close-button "
        >
          Proceed
        </button>
        <button
          onClick={props.handleModal}
          type="button"
          className="close-button btn btn-primary btn-rounded btn-bg"
        >
          Cancel
        </button>
      </div>
    </form>
  </div>
);

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user,
});

export default connect(
  mapStateToProps,
  { placeOrder },
)(PlaceOrderModal);
