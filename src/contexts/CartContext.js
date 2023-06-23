/**
 * src/context/CartContext.js
 */

import { useState, createContext } from 'react';

export const CartContext = createContext({});

export default function CartContextProvider({ children }) {

  const [ basket, setBasket ] = useState([]);
  const [ delivery, setDelivery ] = useState([]);
  const [ subtotal, setSubTotal] = useState(0);

  async function AddToBasket(produto, qtd) {
    const i = basket.findIndex(item => item?.id === produto?.id);
    if(i !== -1){ 
      let cList = basket;
      cList[i].Qtd = cList[i].Qtd +qtd;
      cList[i].Total  = cList[i].Total + (qtd * produto?.VrUnitario);
      setBasket(cList);
      setBasketTotal(cList);
      // item existente na lista, quantidade somada e total atualizado e retorno para ponto de chamada da função
      return; 
    } else {
      let data = {
        ...produto,
        Qtd: qtd,
        Total: qtd * produto?.VrUnitario
      }
      setBasket(dishes => [...dishes, data]);
      setBasketTotal([...basket, data])
      // item adicionado à lista, atualizado e retorno para ponto de chamada da função
      return; 
    }
  };

  async function RemoveFromBasket(produto)  {
    const i = basket.findIndex(item => item?.id === produto?.id);
    if (basket[i]?.Qtd >1) {
      let cList = basket;
      cList[i].Qtd = cList[i].Qtd -1;
      cList[i].Total = cList[i].Total - cList[i].VrUnitario;
      setBasket(cList);
      setBasketTotal(cList);
      // item existente e maior que 1 na lista, quantidade decrescida em -1, total atualizado e retorno para ponto de chamada da função
      return;
    } else {
      const newList = basket.filter(item => item?.id !== produto?.id);
      setBasket(newList);
      setBasketTotal(newList);
      // item removido da lista, total atualizado e retorno para ponto de chamada da função
      return; 
    }
  }

  function setBasketTotal(itens) {
    let cart = itens;
    let result = cart.reduce((acc, obj) => { return acc + obj?.Total}, 0);
    setSubTotal(result.toFixed(2));
  }

  async function CleanBasket() {
    setBasket([]);
    setSubTotal(0);
  }

  return(
    <CartContext.Provider value={{ 
      basket, delivery, subtotal, 
      AddToBasket, RemoveFromBasket, CleanBasket, setDelivery 
    }}>
      { children }
    </CartContext.Provider>
  )
}
