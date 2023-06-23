/**
 * src/components/Delivery/DeliveryHeader.js
 */

import { View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import { MaterialCommunityIcons, Fontisto } from '@expo/vector-icons';

export default function DeliveryHeader({ delivery, listbyaz }) { 
  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.title}>{ delivery?.Nome }</Text>
        <Image style={styles.imagem} source={{uri: delivery?.UrlFoto}} />
        <Text style={styles.info}>{ delivery?.Horario }</Text>
        <Text style={styles.info}><Fontisto color="#FF0000" name='map-marker-alt' size={18}/> { parseFloat(delivery?.Latitude).toFixed(6) }, { parseFloat(delivery?.Longitude).toFixed(6) }</Text>
        <Text style={styles.info}>Valor da Taxa de Entrega: R$ { parseFloat( delivery?.TaxaEntrega ).toFixed(2) }</Text>
        <Text style={[styles.info, {marginBottom: 10}]}>Tempo Estimado: { delivery?.MinDeliveryTime } a { delivery?.MaxDeliveryTime } min.</Text>
        <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
          <TouchableOpacity onPress={ listbyaz }>
            <MaterialCommunityIcons name='order-alphabetical-ascending' size={25} color={"#757575"} />
          </TouchableOpacity>
          <Text style={{fontSize: 14, fontWeight: "bold", marginRight: 10}}>CARDÁPIO</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 10
  },
  title: {
    fontSize: 21,
    fontWeight: "600",
  },
  subtitle: {
    fontSize: 15,
    color: "#525252",
  },
  info:{
    fontSize: 13,
    color: "#707070",
  },
  imagem: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 5,
  },
})
