import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { publicRequest } from "../requestMethods";
import "./orders.css";
import { format } from "timeago.js";
import Navbar from "../components/Navbar";

export default function WidgetLg() {
  const [orders, setOrders] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    const getOrders = async () => {
      const res = await publicRequest.get("/orders/find/"+currentUser._id,
      {
        headers: {
          token: "Bearer " + currentUser.accessToken,
        },
      });
      setOrders(res.data);
    };

    getOrders();
    // eslint-disable-next-line
  }, []);

  const Button = ({ type }) => {
    return <button className={`widgetLgButton ${type}`}>{type}</button>;
  };
  return (
    <>
      <Navbar />
      <div className="widgetLg">
        <h3 className="widgetLgTitle">Transactions</h3>
        <table className="widgetLgTable">
          <tr className="widgetLgTr">
            {/* <th className="widgetLgTh">Customer</th> */}
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Order Amount</th>
            <th className="widgetLgTh">Status</th>
            <th className="widgetLgTh">Product List</th>
          </tr>
          {orders.map((order) => (
            <tr key={order._id} className="widgetLgTr">
              {/* <td className="widgetLgUser">
                <span className="widgetLgName">{order.userId}</span>
              </td> */}
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>

              <td className="widgetLgAmount">
                <table className="widgetLgTable">
                  <tr className="widgetLgTr">
                    <th className="widgetLgTh">Id</th>
                    <th className="widgetLgTh">Qty</th>
                  </tr>
                  {order.products.map((order) => (
                    <tr key={order._id} className="widgetLgTr">
                      <td className="widgetLgUser">
                        <span className="widgetLgName">{order.productId}</span>
                      </td>
                      <td className="widgetLgStatus">{order.quantity}</td>
                    </tr>
                  ))}
                </table>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </>
  );
}
