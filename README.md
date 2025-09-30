# 🛒 Swift+ Personal Shopper

## 📘 Visão Geral
O **Swift+ Personal Shopper** é uma experiência integrada ao app/site da Swift, criada para reduzir atritos na jornada **O2O (Offline to Online)** e incentivar clientes das lojas físicas a migrarem para o digital com simplicidade, confiança e benefícios claros.

---

## ⚠️ Problemas Identificados
1. Tempo de navegação longo (categorias técnicas, falta de filtros inteligentes).  
2. Checkout demorado (múltiplas etapas, poucas opções rápidas).  
3. Dúvidas sobre produtos (preparo, validade, origem).  
4. Incertezas na retirada (horário, status do pedido).  
5. Poucos incentivos para compras maiores (combos, descontos progressivos).  

---

## 💡 Solução Proposta
- Filtros inteligentes por ocasião (churrasco, marmita, kids etc.).  
- Carrinho inteligente com sugestões de combos.  
- Checkout simplificado em 1 tela (Pix, Google Pay, Apple Pay).  
- QR Codes e Click & Collect.  
- Receitas integradas aos produtos.  
- Programa de fidelidade O2O.  

---

## 📱 Funcionalidades (Telas)
- **Login/Cadastro** → social login (Google/Facebook), recuperação de senha.  
- **Onboarding** → escolha de CEP, modalidade de entrega e benefícios online.  
- **Home/Vitrine** → destaques, combos, QR/cupons.  
- **Busca/Categorias** → filtros inteligentes e assistente IA.  
- **Produto (PDP)** → informações nutricionais, receitas e sugestões complementares.  
- **Carrinho** → sugestões de produtos + barra de frete grátis.  
- **Checkout** → pagamento rápido em tela única.  
- **Confirmação** → status do pedido + QR para retirada.  
- **Receitas** → personalizadas e relacionadas aos produtos comprados.  
- **Cupons/QR** → integração O2O.  
- **Perfil** → centralização de pedidos, cupons e endereços.  
- **FAQ/Ajuda** → FAQ + botão de WhatsApp/chat.  
- **Localizador de Lojas** → mapa, horários e retirada.  

---

## ⚖️ Regras de Negócio
- Cadastro/login obrigatório para cupons, fidelidade e retirada.  
- Carrinho sugere combos e complementos automaticamente.  
- Checkout só conclui com endereço válido ou retirada escolhida.  
- Retirada gera QR único por pedido.  
- Cupons possuem validade e uso único por cliente.  
- Receitas vinculadas aos produtos comprados.  

---

## 🔄 Fluxos Principais
- Cadastro/Login → Onboarding → Home → Busca/Produto → Carrinho → Checkout → Confirmação → Retirada (QR).
- Receitas → sugeridas após PDP e carrinho.
- Cupons → resgate físico → uso online.
- Fidelização → pontos acumulados online + loja física.

## 🔐 RBAC (Controle de Acesso)
- Cliente: CRUD de conta, pedidos, avaliações.
- Atendente (loja): valida QR, atualiza retirada.
- Administrador: CRUD de produtos, cupons, lojas e relatórios.

## 🛡️ RLS (Row-Level Security)
- Pedidos: cliente só acessa seus próprios.
- Avaliações: cliente só altera/exclui as suas.
- Cupons: controlados por ID único + validade.

## 📦 Discovery Pack
- Wireframes das telas (Login, Onboarding, Home, Carrinho, Checkout, Perfil etc.).
- Diagnóstico + proposta de negócio (redução de atritos O2O).
- Estratégias de migração do físico → digital (QR, cupons, fidelidade).
- Modelos de dados lógico e relacional.

---
## 🗄️ Modelo de Dados

### Lógico (normalizado)
- **Cliente**, **Produto**, **Pedido**, **Item_Pedido**, **Loja**, **Retirada**, **Sugestao_Produto**, **Avaliacao_Produto**  
- Estruturas auxiliares: **Endereço**, **Telefone**, **Estado/Cidade/Bairro/Logradouro**  

### Relacional (implementação simplificada)
```sql
Cliente(id_cliente, nome, email, telefone, senha, endereco_principal, data_cadastro)
Produto(id_produto, nome, descricao, preco, categoria, imagem_url, info_adicional, ativo)
Pedido(id_pedido, id_cliente, data_pedido, valor_total, status)
Item_Pedido(id_pedido, id_produto, quantidade, valor_unitario)
Loja(id_loja, nome, endereco, horario_funcionamento, telefone)
Retirada(id_retirada, id_pedido, id_loja, data_hora_prevista, status_retirada)
Sugestao_Produto(id_produto_base, id_produto_sugerido)
Avaliacao_Produto(id_avaliacao, id_cliente, id_produto, nota, comentario, data_avaliacao)


