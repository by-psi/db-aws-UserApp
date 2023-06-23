/**
 * DeliveryBairro UserApp - App.js
*/

import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Amplify, I18n } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react-native';
import { translations } from '@aws-amplify/ui';

import logo from './assets/logo.png';
import marca from './assets/marca.png';
import AppRoutes from './src/routes/App.Routes';
import config from './src/aws-exports';

Amplify.configure({
  ...config, 
  Analytics: {
    disabled: true
  },
});

import AuthContextProvider from './src/contexts/AuthContext';
import CartContextProvider from './src/contexts/CartContext';
import OrderContextProvider from './src/contexts/OrderContext';

export default function App() {
  return (
    <NavigationContainer>
      <Authenticator.Provider>
        <Authenticator  Header={AppHeader}>

          <AuthContextProvider>
            <CartContextProvider>
              <OrderContextProvider>
                <StatusBar style="dark" backgroundColor="#FFF" />
                <AppRoutes />
              </OrderContextProvider>
            </CartContextProvider>
          </AuthContextProvider>

        </Authenticator>
      </Authenticator.Provider>
    </NavigationContainer>
  );
}

I18n.putVocabularies(translations);
I18n.setLanguage('pt');
I18n.putVocabulariesForLanguage('pt', {
  Username: 'Usuário', 
  Password: 'Senha', 
  Email: 'E-mail', 
  Code: 'Código de Verificação', 
  Confirm: 'Confirmação (Código de Verificação)',
  'Sign In': 'LOGIN DE USUÁRIO',
  'Sign in': 'ACESSAR',
  'Sign in to your account': 'Seja bemvindo(a)!',
  'Forgot your password?': 'Esqueseu sua Senha?',
  'Create Account': 'REGISTRAR-SE', 
  'Create a new account': 'Novo Usuário',
  'Confirm Password': 'Confirme sua senha',
  'Phone Number': 'Digite seu número de telefone',
  'Back to Sign In': 'Retorna para Login',
  'Forgot Password?': 'Lembrar senha?',
  'Enter your Email': 'Digite seu email',
  'Enter your Password': 'Digite sua senha',
  'Please confirm your Password': 'Digite novamente sua senha',
  'User does not exist': 'Usuário não existe'
});

function AppHeader() {
  return (
    <View style={styles.container}>
      <Image source={ logo } style={styles.logo} resizeMode="contain" />
      <Image source={ marca } style={styles.marca} resizeMode="contain" />
      <Text>UserApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center", 
    justifyContent: "center"
  },
  logo: {
    width: 85, 
    height: 85
  },
  marca: {
    width: 195, 
    height: 85
  },
});

// import * as Sentry from 'sentry-expo';

// Sentry.init({
//   dsn: 'https://f804359c8ec849da9e9b230c4a6287c4@o4505409112309760.ingest.sentry.io/4505409130463232',
//   tracesSampleRate: 1.0,
// });
