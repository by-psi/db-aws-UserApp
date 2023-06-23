/**
* src/pages/Pedidos/OrderDetailsNavigator.js
*/

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import OrderDetails from "./OrderDetails";
import OrderLiveUpdates from "./OrderLiveUpdates";
import OrderPayment from "./OrderPayment";

const Tab = createMaterialTopTabNavigator();

export default function OrderDetailsNavigator({ route }) {
  const id = route?.params?.id;

  return (
    <Tab.Navigator>
      <Tab.Screen name="Details">
        { () => <OrderDetails id={id} /> }
      </Tab.Screen>
      <Tab.Screen name="LiveUpdates">
        { () => <OrderLiveUpdates id={id} /> }
      </Tab.Screen>
      <Tab.Screen name="Payment">
        { () => <OrderPayment id={id} /> }
      </Tab.Screen>
    </Tab.Navigator>
  );
};
