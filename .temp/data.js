  const [taxa, setTaxa] = useState(3.50);
  
  const [pedidos, setPedidos] = useState([
    {
      id: 1, 
      usuario: 1, 
      dt_pedido: '2022-04-21 11:39:19', 
      sub_total: 85.60, 
      taxa_entrega: 3.50, 
      total: 89.10, 
      status: 'A'
    },
    {
      id: 2, 
      usuario: 1, 
      dt_pedido: '2022-04-21 11:39:49', 
      sub_total: 41.00, 
      taxa_entrega: 3.50, 
      total: 44.50, 
      status: 'A'
    },
    {
      id: 3, 
      usuario: 1, 
      dt_pedido: '2022-04-21 13:21:53', 
      sub_total: 47.00, 
      taxa_entrega: 3.50, 
      total: 50.50, 
      status: 'A'
    },
    {
      id: 4, 
      usuario: 1, 
      dt_pedido: '2022-04-21 21:51:11', 
      sub_total: 90.90, 
      taxa_entrega: 3.50, 
      total: 94.40, 
      status: 'A'
    },
    {
      id: 5, 
      usuario: 1, 
      dt_pedido: '2022-04-21 21:52:22', 
      sub_total: 85.60, 
      taxa_entrega: 3.50, 
      total: 89.10, 
      status: 'A'
    },
    {
      id: 6, 
      usuario: 1, 
      dt_pedido: '2022-04-21 22:27:19', 
      sub_total: 119.70, 
      taxa_entrega: 3.50, 
      total: 123.20, 
      status: 'A'
    },
    {
      id: 7, 
      usuario: 1, 
      dt_pedido: '2022-04-21 23:05:16', 
      sub_total: 55.80, 
      taxa_entrega: 3.50, 
      total: 59.30, 
      status: 'A'
    },
  ])

  const [itens, setItens] = useState([
    {
      id: 1, 
      id_pedido: 1, 
      id_produto: 15, 
      qtd: 2, 
      vr_unitario: 33.80, 
      vr_total: 67.60
    },
    {
      id: 2, 
      id_pedido: 1, 
      id_produto: 25, 
      qtd: 3, 
      vr_unitario: 6.00, 
      vr_total: 18.00
    },
    {
      id: 3, 
      id_pedido: 2, 
      id_produto: 22, 
      qtd: 2, 
      vr_unitario: 14.50, 
      vr_total: 29.00
    },
    {
      id: 4, 
      id_pedido: 2, 
      id_produto: 25, 
      qtd: 2, 
      vr_unitario: 6.00, 
      vr_total: 12.00
    },
    {
      id: 5, 
      id_pedido: 3, 
      id_produto: 25, 
      qtd: 2, 
      vr_unitario: 14.50, 
      vr_total: 29.00
    },
    {
      id: 6, 
      id_pedido: 3, 
      id_produto: 22, 
      qtd: 2, 
      vr_unitario: 6.00, 
      vr_total: 12.00
    },
    {
      id: 7, 
      id_pedido: 3, 
      id_produto: 27, 
      qtd: 1, 
      vr_unitario: 6.00, 
      vr_total: 6.00
    },
    {
      id: 8, 
      id_pedido: 4, 
      id_produto: 16, 
      qtd: 2, 
      vr_unitario: 35.00, 
      vr_total: 70.00
    },
    {
      id: 9, 
      id_pedido: 4, 
      id_produto: 25, 
      qtd: 2, 
      vr_unitario: 6.00, 
      vr_total: 12.00
    },
    {
      id: 10, 
      id_pedido: 4, 
      id_produto: 28, 
      qtd: 1, 
      vr_unitario: 8.90, 
      vr_total: 8.90
    },
    {
      id: 11, 
      id_pedido: 5, 
      id_produto: 18, 
      qtd: 2, 
      vr_unitario: 24.90, 
      vr_total: 49.80
    },
    {
      id: 12, 
      id_pedido: 5, 
      id_produto: 25, 
      qtd: 1, 
      vr_unitario: 6.00, 
      vr_total: 6.00
    },
    {
      id: 13, 
      id_pedido: 6, 
      id_produto: 17, 
      qtd: 3, 
      vr_unitario: 33.90, 
      vr_total: 101.70
    },
    {
      id: 14, 
      id_pedido: 6, 
      id_produto: 25, 
      qtd: 2, 
      vr_unitario: 6.00, 
      vr_total: 12.00
    },
    {
      id: 15, 
      id_pedido: 6, 
      id_produto: 27, 
      qtd: 1, 
      vr_unitario: 6.00, 
      vr_total: 6.00
    },
    {
      id: 16, 
      id_pedido: 7, 
      id_produto: 17, 
      qtd: 2, 
      vr_unitario: 33.90, 
      vr_total: 67.80
    }
  ])

  const [produtos, setProdutos] = useState([
    {
      id_produto: 15,
      id_categoria: 1,
      nome: "X-Salada Picanha",
      descricao: "Pão,hamburguer de picanha 150 g,queijo prato, alface, tomate, maionese hamburguinho.",
      preco: 33.80,
      url_foto: "https://jornada-dev2.s3.amazonaws.com/xsalada.jpg"
   },
   {
      "id_produto": 16,
      "id_categoria": 1,
      "nome": "Cheese Steak",
      "descricao": "Rosbife 120g, cheddar e cebola frita, servido no pão de queijo.",
      "preco": 35.00,
      "url_foto": "https://jornada-dev2.s3.amazonaws.com/xespaco_fama.jpg"
   },
   {
      "id_produto": 17,
      "id_categoria": 1,
      "nome": "X-Tudo",
      "descricao": "Pão, hambúrguer de carne angus, alface, tomate e queijo prato.",
      "preco": 33.90,
      "url_foto": "https://jornada-dev2.s3.amazonaws.com/xtudo.png"
   },
   {
      "id_produto": 18,
      "id_categoria": 2,
      "nome": "X-Egg",
      "descricao": "Pão, hambúrguer de carne angus, queijo prato e ovo.",
      "preco": 24.90,
      "url_foto": "https://jornada-dev2.s3.amazonaws.com/xegg.jpg"
   },
   {
      "id_produto": 19,
      "id_categoria": 2,
      "nome": "X-Bacon",
      "descricao": "Pão, hambúrguer de carne angus, queijo prato e bacon.",
      "preco": 27.90,
      "url_foto": "https://jornada-dev2.s3.amazonaws.com/xbacon.jpg"
   },
   {
      "id_produto": 20,
      "id_categoria": 2,
      "nome": "X-Filé Frango",
      "descricao": "Pão, filet de frango e queijo prato.",
      "preco": 25.60,
      "url_foto": "https://jornada-dev2.s3.amazonaws.com/x-frango-egg.png"
   },
   {
      "id_produto": 21,
      "id_categoria": 2,
      "nome": "X-Cebola Maionese",
      "descricao": "Pão, hambúrguer de 150g (angus), queijo prato, cebola frita e maionese artesanal.",
      "preco": 28.90,
      "url_foto": "https://jornada-dev2.s3.amazonaws.com/xcebola.png"
   },
   {
      "id_produto": 22,
      "id_categoria": 3,
      "nome": "Hot Dog Tradicional",
      "descricao": "Pão de Hot Dog, 1 Salsicha, Ketchup, Maionese, Mostarda e Batata Palha",
      "preco": 14.50,
      "url_foto": "https://jornada-dev2.s3.amazonaws.com/dog1.png"
   },
   {
      "id_produto": 23,
      "id_categoria": 3,
      "nome": "Hot Dog Soja",
      "descricao": "Salsicha de soja, requeijão, oregano, cheddar, vinagrete, milho, maionese, batata palha, pure e parmesão (vegetariano ou vegano)",
      "preco": 28.00,
      "url_foto": "https://jornada-dev2.s3.amazonaws.com/dog2.png"
   },
   {
      "id_produto": 24,
      "id_categoria": 3,
      "nome": "Hot Dogão",
      "descricao": "Quatro salsichas, requeijão, oregano, cheddar, vinagrete, milho, maionese, batata palha, pure e parmesão",
      "preco": 31.00,
      "url_foto": "https://jornada-dev2.s3.amazonaws.com/dog3.png"
   },
   {
      "id_produto": 25,
      "id_categoria": 4,
      "nome": "Coca-Cola Lata",
      "descricao": "Refrigerante Coca-Cola lata 350ml",
      "preco": 6.00,
      "url_foto": "https://jornada-dev2.s3.amazonaws.com/coca-cola.png"
   },
   {
      "id_produto": 26,
      "id_categoria": 4,
      "nome": "Água mineral",
      "descricao": "Água mineral 330ml",
      "preco": 4.00,
      "url_foto": "https://jornada-dev2.s3.amazonaws.com/agua.png"
   },
   {
      "id_produto": 27,
      "id_categoria": 4,
      "nome": "Schweppes",
      "descricao": "Schweppes citrus 350ml",
      "preco": 6.00,
      "url_foto": "https://jornada-dev2.s3.amazonaws.com/Schweppes.png"
   },
   {
      "id_produto": 28,
      "id_categoria": 4,
      "nome": "Sprite Lemon",
      "descricao": "Sprite Lemon fresh 500ml",
      "preco": 8.90,
      "url_foto": "https://jornada-dev2.s3.amazonaws.com/sprite.png"
   }  
])

const [categorias, setCategorias] = useState([
  {
    "id_categoria": 1,
    "descricao": "OFERTAS",
    "ordem": 1
  },
  {
    "id_categoria": 2,
    "descricao": "SANDUICHES",
    "ordem": 2
  },
  {
    "id_categoria": 3,
    "descricao": "HOTDOGS",
    "ordem": 3
  },
  {
    "id_categoria": 4,
    "descricao": "BEBIDAS",
    "ordem": 4
  }
])