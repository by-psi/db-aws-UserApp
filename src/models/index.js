// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Transporte = {
  "DRIVING": "DRIVING",
  "BICYCLING": "BICYCLING"
};

const OrderStatus = {
  "NOVO": "NOVO",
  "AGUARDANDO": "AGUARDANDO",
  "PREPARANDO": "PREPARANDO",
  "PRONTO_PARA_RETIRADA": "PRONTO_PARA_RETIRADA",
  "SAIU_PARA_ENTREGA": "SAIU_PARA_ENTREGA",
  "RECEBIDO": "RECEBIDO",
  "FINALIZADO": "FINALIZADO",
  "CANCELADO": "CANCELADO"
};

const Situacao = {
  "ATIVO": "ATIVO",
  "INATIVO": "INATIVO"
};

const Plano = {
  "FREE": "FREE",
  "BASIC": "BASIC",
  "PRO": "PRO",
  "PREMIUM": "PREMIUM"
};

const Uf = {
  "AC": "AC",
  "AL": "AL",
  "AP": "AP",
  "AM": "AM",
  "BA": "BA",
  "CE": "CE",
  "DF": "DF",
  "ES": "ES",
  "GO": "GO",
  "MA": "MA",
  "MG": "MG",
  "MT": "MT",
  "MS": "MS",
  "PA": "PA",
  "PB": "PB",
  "PE": "PE",
  "PI": "PI",
  "PR": "PR",
  "RJ": "RJ",
  "RN": "RN",
  "RS": "RS",
  "RO": "RO",
  "RR": "RR",
  "SC": "SC",
  "SE": "SE",
  "SP": "SP",
  "TO": "TO"
};

const { OrderDish, Order, Courier, Produto, Delivery, Categoria, User, ProdutoDelivery, CategoriaDelivery } = initSchema(schema);

export {
  OrderDish,
  Order,
  Courier,
  Produto,
  Delivery,
  Categoria,
  User,
  ProdutoDelivery,
  CategoriaDelivery,
  Transporte,
  OrderStatus,
  Situacao,
  Plano,
  Uf
};