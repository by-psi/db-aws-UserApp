/**
 * src/components/PageHeader/index.js
 * tabela de cores: #FFB901 #55A9D6 #7F7B7B #5D5D5D #FF0000 #0033CC #FFF000 #131313 #4DCE4D
*/

import { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CartContext } from '../../contexts/CartContext';

import logo_png from '../../../assets/logo.png';
import marca_png from '../../../assets/marca.png';
import cart_png from '../../../assets/cart.png';

export default function PageHeader() {
  const navigation = useNavigation();
  const { basket } = useContext(CartContext);

  function GoToLink(link) {
    return (
      navigation.navigate(link)
    )
  }

  return (
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={()=> {
            alert("DeliveryBairro UserApp v1.0 Build #7 "+'\n'+"(31) 98410-7540");
            GoToLink("Home");
          }}
        >
          <Image source={logo_png} style={{ width: 85, height: 85 }} resizeMode="contain" />
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Image source={marca_png} style={{ width: 195, height: 85 }} resizeMode="contain" />
        </View>
        <TouchableOpacity onPress={ () => GoToLink('BasketInfo') }>
          <Image source={cart_png} style={{ width: 85, height: 85 }} resizeMode="contain" />
          {
            basket?.length >= 1 &&
            <View style={styles.dot}>
              <Text style={styles.dotText}>{ basket?.length }</Text>
            </View>
          }
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  header:{
    height: 100,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    marginBottom: 5,
    marginTop: 20,
  },
  dot:{
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    width: 30,
    height: 30, 
    borderRadius: 15,
    position: 'absolute',
    zIndex: 99,
    bottom: -4,
    left: -6
  },
  dotText:{
    fontSize: 14,
    color: '#FFF'
  }
})
