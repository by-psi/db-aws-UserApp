/**
 * src/components/Sidebar/index.js
 */

import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome5, Fontisto, AntDesign, Entypo } from '@expo/vector-icons';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { useNavigation } from '@react-navigation/native';

import logo_png from '../../../assets/logo.png';

export default function SideBar({ props }) {
  const navigation = useNavigation();
  const { user, signOut } = useAuthenticator();

  function GoToLink(link) {
    navigation.navigate(link);
  }

  function Perfil() {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitle}>PERFIL</Text>
        <Text>{user?.attributes?.email}</Text>
        <TouchableOpacity style={[styles.btnLogout, {marginTop: 15}]} onPress={ signOut }>
          <Text style={styles.btnTxt}>FECHAR (LOGOUT)</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <DrawerContentScrollView {...props}>

      <View style={styles.hearder}>
        <Image style={styles.logo} source={logo_png} resizeMode="contain" />
        <Text style={styles.title}>Bem vindo!</Text>
        <Text style={styles.line13}>{user?.attributes?.email}</Text>
      </View>

      <DrawerItem
        label="HOME"
        onPress={ () => GoToLink('Home') }
        activeTintColor='#FFF'
        activeBackgroundColor='#FF0000'
        inactiveTintColor='#FFF'
        inactiveBackgroundColor='#000'
        icon={({ focused, size }) => (
          <Entypo name='shop' size={size} color={(focused !== true) ? '#FFF' : '#000'} />
        )}
      />
      <DrawerItem
        label="MEUS PEDIDOS"
        onPress={ () => GoToLink('Pedidos') }
        activeTintColor='#FFF'
        activeBackgroundColor='#FF0000'
        inactiveTintColor='#FFF'
        inactiveBackgroundColor='#000'
        icon={({ focused, size }) => (
          <Fontisto name='shopping-bag-1' size={size} color={(focused !== true) ? '#FFF' : '#000'} />
        )}
      />
      <DrawerItem
        label="PERFIL DO USUÁRIO"
        onPress={ Perfil }
        activeTintColor='#FFF'
        activeBackgroundColor='#FF0000'
        inactiveTintColor='#FFF'
        inactiveBackgroundColor='#000'
        icon={({ focused, size }) => (
          <FontAwesome5 name='user-cog' size={size} color={(focused !== true) ? '#FFF' : '#000'} />
        )}
      />
      <DrawerItem
        label="SAIR (LOGOUT)"
        onPress={ signOut }
        activeTintColor='#FFF'
        activeBackgroundColor='#FF0000'
        inactiveTintColor='#FFF'
        inactiveBackgroundColor='#000'
        icon={({ focused, size }) => (
          <FontAwesome5 name="door-open" size={size} color={(focused !== true) ? '#FFF' : '#000'} />
        )}
      />
      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
        <Text style={styles.line18}><AntDesign name="copyright" color='#000' size={12} /> 2022 PSI-SOFTWARE</Text>
        <Text style={styles.line13}>Direitos Reservados</Text>
      </View>

    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  hearder:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    marginBottom: 10
  },
  logo:{ 
    width: 120, 
    height: 120 
  },
  title:{ 
    color: '#5D5D5D',
    fontSize: 18,
    marginTop: 25
  },
  subtitle:{
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold',
    // marginBottom: 20
  },
  line18:{ 
    color: '#000', 
    fontSize: 18 
  },
  line13:{
    color: '#000',
    fontSize: 13,
    marginBottom: 10
  },
  btnLogout: {
    width: '95%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  btnTxt:{
    color: "#FFF", 
    fontSize: 20,
    textAlign: "center", 
  },
});
