import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection, AsyncItem } from "@aws-amplify/datastore";

export enum Transporte {
  DRIVING = "DRIVING",
  BICYCLING = "BICYCLING"
}

export enum OrderStatus {
  NOVO = "NOVO",
  AGUARDANDO = "AGUARDANDO",
  PREPARANDO = "PREPARANDO",
  PRONTO_PARA_RETIRADA = "PRONTO_PARA_RETIRADA",
  SAIU_PARA_ENTREGA = "SAIU_PARA_ENTREGA",
  RECEBIDO = "RECEBIDO",
  FINALIZADO = "FINALIZADO",
  CANCELADO = "CANCELADO"
}

export enum Situacao {
  ATIVO = "ATIVO",
  INATIVO = "INATIVO"
}

export enum Plano {
  FREE = "FREE",
  BASIC = "BASIC",
  PRO = "PRO",
  PREMIUM = "PREMIUM"
}

export enum Uf {
  AC = "AC",
  AL = "AL",
  AP = "AP",
  AM = "AM",
  BA = "BA",
  CE = "CE",
  DF = "DF",
  ES = "ES",
  GO = "GO",
  MA = "MA",
  MG = "MG",
  MT = "MT",
  MS = "MS",
  PA = "PA",
  PB = "PB",
  PE = "PE",
  PI = "PI",
  PR = "PR",
  RJ = "RJ",
  RN = "RN",
  RS = "RS",
  RO = "RO",
  RR = "RR",
  SC = "SC",
  SE = "SE",
  SP = "SP",
  TO = "TO"
}



type EagerOrderDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Qtd?: number | null;
  readonly orderID: string;
  readonly produtoID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrderDish = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<OrderDish, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Qtd?: number | null;
  readonly orderID: string;
  readonly produtoID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type OrderDish = LazyLoading extends LazyLoadingDisabled ? EagerOrderDish : LazyOrderDish

export declare const OrderDish: (new (init: ModelInit<OrderDish>) => OrderDish) & {
  copyOf(source: OrderDish, mutator: (draft: MutableModel<OrderDish>) => MutableModel<OrderDish> | void): OrderDish;
}

type EagerOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly SubTotal?: number | null;
  readonly TaxaEntrega?: number | null;
  readonly Total?: number | null;
  readonly Status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly TokenSMS?: string | null;
  readonly OrderDishes?: (OrderDish | null)[] | null;
  readonly deliveryID: string;
  readonly courierID: string;
  readonly userID: string;
  readonly Latitude?: number | null;
  readonly Longitude?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyOrder = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Order, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly SubTotal?: number | null;
  readonly TaxaEntrega?: number | null;
  readonly Total?: number | null;
  readonly Status?: OrderStatus | keyof typeof OrderStatus | null;
  readonly TokenSMS?: string | null;
  readonly OrderDishes: AsyncCollection<OrderDish>;
  readonly deliveryID: string;
  readonly courierID: string;
  readonly userID: string;
  readonly Latitude?: number | null;
  readonly Longitude?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Order = LazyLoading extends LazyLoadingDisabled ? EagerOrder : LazyOrder

export declare const Order: (new (init: ModelInit<Order>) => Order) & {
  copyOf(source: Order, mutator: (draft: MutableModel<Order>) => MutableModel<Order> | void): Order;
}

type EagerCourier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Courier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nome: string;
  readonly Cpf: string;
  readonly Telefone: string;
  readonly Tipo: Transporte | keyof typeof Transporte;
  readonly UrlFoto?: string | null;
  readonly TokenSMS?: string | null;
  readonly Orders?: (Order | null)[] | null;
  readonly Latitude?: number | null;
  readonly Longitude?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCourier = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Courier, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nome: string;
  readonly Cpf: string;
  readonly Telefone: string;
  readonly Tipo: Transporte | keyof typeof Transporte;
  readonly UrlFoto?: string | null;
  readonly TokenSMS?: string | null;
  readonly Orders: AsyncCollection<Order>;
  readonly Latitude?: number | null;
  readonly Longitude?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Courier = LazyLoading extends LazyLoadingDisabled ? EagerCourier : LazyCourier

export declare const Courier: (new (init: ModelInit<Courier>) => Courier) & {
  copyOf(source: Courier, mutator: (draft: MutableModel<Courier>) => MutableModel<Courier> | void): Courier;
}

type EagerProduto = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Produto, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nome: string;
  readonly Descricao: string;
  readonly VrUnitario?: string | null;
  readonly UrlFoto?: string | null;
  readonly ProdutoDeliveries?: (ProdutoDelivery | null)[] | null;
  readonly OrderDishes?: (OrderDish | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProduto = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Produto, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nome: string;
  readonly Descricao: string;
  readonly VrUnitario?: string | null;
  readonly UrlFoto?: string | null;
  readonly ProdutoDeliveries: AsyncCollection<ProdutoDelivery>;
  readonly OrderDishes: AsyncCollection<OrderDish>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Produto = LazyLoading extends LazyLoadingDisabled ? EagerProduto : LazyProduto

export declare const Produto: (new (init: ModelInit<Produto>) => Produto) & {
  copyOf(source: Produto, mutator: (draft: MutableModel<Produto>) => MutableModel<Produto> | void): Produto;
}

type EagerDelivery = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Delivery, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nome: string;
  readonly PlanoAssinatura: Plano | keyof typeof Plano;
  readonly Situacao: Situacao | keyof typeof Situacao;
  readonly Responsavel?: string | null;
  readonly Telefone?: string | null;
  readonly Email?: string | null;
  readonly Horario?: string | null;
  readonly MinDeliveryTime?: number | null;
  readonly MaxDeliveryTime?: number | null;
  readonly Rating?: number | null;
  readonly TaxaEntrega?: number | null;
  readonly UrlFoto?: string | null;
  readonly Endereco?: string | null;
  readonly Numero?: string | null;
  readonly Complemento?: string | null;
  readonly Bairro?: string | null;
  readonly Cidade?: string | null;
  readonly UF?: Uf | keyof typeof Uf | null;
  readonly Categorias?: (CategoriaDelivery | null)[] | null;
  readonly Produtos?: (ProdutoDelivery | null)[] | null;
  readonly Orders?: (Order | null)[] | null;
  readonly Latitude?: number | null;
  readonly Longitude?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyDelivery = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Delivery, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nome: string;
  readonly PlanoAssinatura: Plano | keyof typeof Plano;
  readonly Situacao: Situacao | keyof typeof Situacao;
  readonly Responsavel?: string | null;
  readonly Telefone?: string | null;
  readonly Email?: string | null;
  readonly Horario?: string | null;
  readonly MinDeliveryTime?: number | null;
  readonly MaxDeliveryTime?: number | null;
  readonly Rating?: number | null;
  readonly TaxaEntrega?: number | null;
  readonly UrlFoto?: string | null;
  readonly Endereco?: string | null;
  readonly Numero?: string | null;
  readonly Complemento?: string | null;
  readonly Bairro?: string | null;
  readonly Cidade?: string | null;
  readonly UF?: Uf | keyof typeof Uf | null;
  readonly Categorias: AsyncCollection<CategoriaDelivery>;
  readonly Produtos: AsyncCollection<ProdutoDelivery>;
  readonly Orders: AsyncCollection<Order>;
  readonly Latitude?: number | null;
  readonly Longitude?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Delivery = LazyLoading extends LazyLoadingDisabled ? EagerDelivery : LazyDelivery

export declare const Delivery: (new (init: ModelInit<Delivery>) => Delivery) & {
  copyOf(source: Delivery, mutator: (draft: MutableModel<Delivery>) => MutableModel<Delivery> | void): Delivery;
}

type EagerCategoria = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Categoria, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Descricao: string;
  readonly UrlFoto?: string | null;
  readonly Ordem?: string | null;
  readonly Deliveries?: (CategoriaDelivery | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategoria = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Categoria, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Descricao: string;
  readonly UrlFoto?: string | null;
  readonly Ordem?: string | null;
  readonly Deliveries: AsyncCollection<CategoriaDelivery>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Categoria = LazyLoading extends LazyLoadingDisabled ? EagerCategoria : LazyCategoria

export declare const Categoria: (new (init: ModelInit<Categoria>) => Categoria) & {
  copyOf(source: Categoria, mutator: (draft: MutableModel<Categoria>) => MutableModel<Categoria> | void): Categoria;
}

type EagerUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nome: string;
  readonly Sobrenome: string;
  readonly UrlFoto?: string | null;
  readonly Token?: string | null;
  readonly Telefone?: string | null;
  readonly Orders?: (Order | null)[] | null;
  readonly Latitude?: number | null;
  readonly Longitude?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyUser = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<User, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly Nome: string;
  readonly Sobrenome: string;
  readonly UrlFoto?: string | null;
  readonly Token?: string | null;
  readonly Telefone?: string | null;
  readonly Orders: AsyncCollection<Order>;
  readonly Latitude?: number | null;
  readonly Longitude?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User) & {
  copyOf(source: User, mutator: (draft: MutableModel<User>) => MutableModel<User> | void): User;
}

type EagerProdutoDelivery = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProdutoDelivery, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly produtoId?: string | null;
  readonly deliveryId?: string | null;
  readonly produto: Produto;
  readonly delivery: Delivery;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyProdutoDelivery = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<ProdutoDelivery, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly produtoId?: string | null;
  readonly deliveryId?: string | null;
  readonly produto: AsyncItem<Produto>;
  readonly delivery: AsyncItem<Delivery>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ProdutoDelivery = LazyLoading extends LazyLoadingDisabled ? EagerProdutoDelivery : LazyProdutoDelivery

export declare const ProdutoDelivery: (new (init: ModelInit<ProdutoDelivery>) => ProdutoDelivery) & {
  copyOf(source: ProdutoDelivery, mutator: (draft: MutableModel<ProdutoDelivery>) => MutableModel<ProdutoDelivery> | void): ProdutoDelivery;
}

type EagerCategoriaDelivery = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CategoriaDelivery, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly deliveryId?: string | null;
  readonly categoriaId?: string | null;
  readonly delivery: Delivery;
  readonly categoria: Categoria;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCategoriaDelivery = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<CategoriaDelivery, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly deliveryId?: string | null;
  readonly categoriaId?: string | null;
  readonly delivery: AsyncItem<Delivery>;
  readonly categoria: AsyncItem<Categoria>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type CategoriaDelivery = LazyLoading extends LazyLoadingDisabled ? EagerCategoriaDelivery : LazyCategoriaDelivery

export declare const CategoriaDelivery: (new (init: ModelInit<CategoriaDelivery>) => CategoriaDelivery) & {
  copyOf(source: CategoriaDelivery, mutator: (draft: MutableModel<CategoriaDelivery>) => MutableModel<CategoriaDelivery> | void): CategoriaDelivery;
}