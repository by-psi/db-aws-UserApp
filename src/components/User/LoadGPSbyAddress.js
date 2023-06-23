/**
 * src/components/User/LoadGPSbyAddress.js
 */

import { useState } from 'react';
import * as Location from 'expo-location';

import { GOOGLE_APIKEY } from '@env';

export default function LoadGPSbyAddress({ props }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [info, setInfo] = useState("");
  const [address, setAddress] = useState("");

  async function getCoordinates() {
    const { Endereco, Complemento, Bairro, Cidade, Cep, Uf } = {
      Endereco: props.Endereco,
      Complemento: props.Complemento,
      Bairro: props.Bairro,
      Cidade: props.Cidade,
      Uf: props.Uf,
      Cep: props.Cep,
      ...data, 
    };

    const formattedAddress = `${Endereco}${Complemento ? `, ${Complemento}` : ''}, ${Bairro}, ${Cidade} - ${Uf}, ${Cep}`.replace(/ /g, '+');
    const address_formatated = Endereco+", "+Complemento+", "+Bairro+", "+Cidade+"/"+Uf+" CEP "+Cep;

    const apiKey = GOOGLE_APIKEY; 
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const { lat, lng } = data.results[0].geometry.location;
      setLocation({ latitude: lat, longitude: lng });
    } catch (error) {
      setErrorMsg('Erro ao obter as coordenadas');
    }
  };

  async function getLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permissão para acessar a localização foi negada');
      return;
    }
    const { coords } = await Location.getCurrentPositionAsync({});
    setLocation(coords);
  };

  async function handleGetLocation() {
    if (location) {
      setLocation(null);
    } else {
      await getCoordinates();
      getLocation();
    }
  };

  setInfo("Toque no botão para obter as coordenadas");

  if (errorMsg) {
    setInfo(errorMsg);
  } else if (location) {
    setInfo(`Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{ address }</Text>
      <Text>{ info }</Text>
      <Button title={location ? 'Obter novamente' : 'Obter coordenadas'} onPress={handleGetLocation} />
    </View>
  )
}
