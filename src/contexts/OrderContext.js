/**
* src/context/OrderContext.js
*/

import '@azure/core-asynciterator-polyfill';
import { useState, useEffect, useContext, createContext } from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Order, OrderDish, OrderStatus } from '../models';
import { CartContext } from './CartContext';

export const OrderContext = createContext({});

function OrderContextProvider({ children }) {
  const { user } = useAuthenticator();
  const { delivery, basket, subtotal } = useContext(CartContext);
  const [ orders, setOrders ] = useState([]);

  useEffect(() => {
    if (user) {
      const loadOrdersByUserID = async() =>{
        await DataStore.query(Order, (order)=>order?.TokenSMS.eq(user?.username)).then(setOrders);
      }
      loadOrdersByUserID();
    }
  }, [user]);

  async function createOrder({ latitude, longitude }) {
    // create the order
    const total = parseFloat(subtotal) + parseFloat(delivery?.TaxaEntrega);
    const newOrder = await DataStore.save(
      new Order({
        SubTotal: parseFloat(subtotal),
        TaxaEntrega: parseFloat(delivery?.TaxaEntrega),
        Total: parseFloat(total),
        Status: OrderStatus.NOVO,
        TokenSMS: user?.username,
        Latitude: latitude,
        Longitude: longitude,
        OrderDishes: basket,
        userID: user?.username,
        courierID: "46aa4f12-4d93-421b-b490-b6bd3cd65660", // Zé Delivery
        deliveryID: delivery?.id
      })
    );

    // add all basket items to the order

    await Promise.all(
      basket.map((item) =>
        DataStore.save(
          new OrderDish({
            "Qtd": item.Qtd,
            "orderID": newOrder.id,
            "produtoID": item?.id
          })
        )
      )
    );
    setOrders([...orders, newOrder]);
    return newOrder;
  };

  async function getOrder(id) {
    const order = await DataStore.query(Order, id);
    const orderDishes = await DataStore.query(OrderDish, (orderdish)=>orderdish.orderID.eq(id));
    return { ...order, dishes: orderDishes }; 
  };

  return (
    <OrderContext.Provider value={{ delivery, orders, createOrder, getOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;
