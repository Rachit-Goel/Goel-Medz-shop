import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { publicRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { deleteCart } from "../redux/apiCalls";

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await publicRequest.post(
          "/orders",
          {
            userId: currentUser._id,
            products: cart.products.map((item) => ({
              productId: item._id,
              quantity: item._quantity,
            })),
            amount: cart.total,
            address: "api success",
          },
          {
            headers: {
              token: "Bearer " + currentUser.accessToken,
            },
          }
        );
        setOrderId(res.data._id);
        await deleteCart(dispatch, currentUser);
      } catch (err) {
        console.log(err);
      }
    };
    data && createOrder();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/" style={{ textDecoration: "none" }}>
        <button style={{ padding: 10, marginTop: 20 }}>Go to Homepage</button>
      </Link>
    </div>
  );
};

export default Success;
