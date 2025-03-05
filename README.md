# Staciona 🚗 - Simplificando sua busca por estacionamento

## Descrição do Projeto

O Staciona é uma plataforma digital inovadora que revoluciona a forma como os motoristas encontram, reservam e avaliam estacionamentos. Desenvolvido com foco em tecnologia e mobilidade urbana, o aplicativo oferece uma solução completa para simplificar a experiência de estacionamento.

## Missão

Facilitar a mobilidade urbana, proporcionando aos motoristas uma experiência segura, eficiente e acessível na busca e reserva de estacionamentos.

## Visão

Ser a plataforma líder na digitalização e otimização do setor de estacionamentos, tornando a experiência de estacionamento tão simples quanto um toque na tela.

## Recursos Principais

- 🔒 **Segurança em Primeiro Lugar**
  - Seguro por danos, roubo e furto
  - Estacionamentos seguros para diferentes tipos de veículos

- 🏍️ **Versatilidade**
  - Estacionamento para carros e motos
  - Vagas cobertas e privativas
  - Charge Points para veículos elétricos

- 🔍 **Busca Inteligente**
  - Filtros avançados de pesquisa
  - Localização precisa de estacionamentos
  - Disponibilidade em tempo real

- 📅 **Reserva Antecipada**
  - Garantia de vaga com antecedência
  - Prevenção de surpresas e congestionamentos

- 💰 **Preços Exclusivos**
  - Descontos especiais
  - Promoções para usuários

- 🌙 **Estacionamento Noturno**
  - Locais seguros (disponível até 22h00)

## Persona Exemplo

**Nome**: Edenilson Silva
- **Cidade**: Ribeirão das Neves
- **Trabalho**: Centro de Belo Horizonte
- **Transporte**: Carro próprio
- **Perfil**: Usuário frequente de estacionamentos

## Valores da Empresa

- **Inovação Contínua**: Melhoria constante com tecnologia de ponta
- **Precisão e Transparência**: Informações confiáveis e atualizadas
- **Eficiência e Simplicidade**: Soluções rápidas e intuitivas
- **Parcerias Estratégicas**: Colaboração para melhor experiência
- **Foco no Cliente**: Usuário no centro das decisões
- **Sustentabilidade**: Otimização do espaço urbano
- **Segurança**: Proteção de dados e serviço confiável

## Parceiros

- Metadax Tecnologia LTDA
- Proz Educação
- Prefeituras de:
  - Belo Horizonte
  - São Paulo
  - Florianópolis
  - Rio de Janeiro
- PRODABEL
- SPTRANS
- Shopping Boulevard

## Como Funciona

1. **Buscar**: Encontre estacionamentos próximos
2. **Reservar**: Escolha horário e faça reserva
3. **Avaliar**: Compartilhe sua experiência

## Desenvolvido por

- Pedro Rosemberg
- Ana Carolina
- José
- Kauan
- Thales

## Contato

📧 E-mail: contato@staciona.com.br

## Canais

- Aplicativo móvel
- Possível expansão para website

## Fontes de Receita

- Publicidade
- Assinaturas

## Próximos Passos

- Expansão de parcerias
- Implementação de IA
- Melhoria contínua da plataforma

## Tecnologias e Desafios

### Pontos Fortes
- Agilidade
- Preços exclusivos
- Baixo custo operacional

### Desafios
- Dependência de dados em tempo real
- Risco cibernético
- Baixa adesão de estacionamentos

## Configuração e Instalação

### Pré-requisitos

- Node.js (versão 18.x ou superior)
- npm (versão 9.x ou superior)
- Git

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/staciona.git
cd staciona
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes configurações:
```
DATABASE_URL=sua_url_de_banco_de_dados
API_KEY=sua_chave_de_api
NEXT_PUBLIC_MAPS_API_KEY=sua_chave_google_maps
```

4. Execute as migrações do banco de dados:
```bash
npx prisma migrate dev
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

### Ambiente de Produção

Para build de produção:
```bash
npm run build
npm start
```

## Estrutura do Projeto

```
staciona/
│
├── src/
│   ├── components/     # Componentes React
│   ├── pages/          # Páginas do aplicativo
│   ├── styles/         # Estilos globais
│   ├── utils/          # Utilitários e helpers
│   └── services/       # Serviços de API
│
├── prisma/             # Definições do banco de dados
├── public/             # Arquivos estáticos
├── tests/              # Testes automatizados
└── docs/               # Documentação
```

## Guia de Uso para Usuários

### Baixar o Aplicativo

1. Disponível na Google Play Store
2. Disponível na Apple App Store
3. Acesse https://staciona.vercel.app

### Como Usar

1. **Cadastro**
   - Baixe o aplicativo
   - Crie uma conta ou faça login com Google/Facebook
   - Adicione informações do veículo

2. **Encontrar Estacionamento**
   - Utilize o mapa interativo
   - Aplique filtros (cobertura, segurança, preço)
   - Visualize vagas disponíveis em tempo real

3. **Fazer Reserva**
   - Selecione o estacionamento
   - Escolha data e horário
   - Confirme a reserva
   - Opcional: adicionar seguro

4. **Pagamento**
   - Pague via app ou diretamente para o estacionamento
   - Métodos: Cartão de crédito ou débito e Pix
   - Receba comprovante digital

5. **Avaliação**
   - Após uso, avalie o estacionamento
   - Ganhe pontos e descontos

## Desenvolvimento e Contribuição

### Configuração de Desenvolvimento

1. Faça fork do repositório
2. Crie branch de feature:
```bash
git checkout -b feature/nova-funcionalidade
```

3. Commit suas alterações:
```bash
git commit -m "Adiciona nova funcionalidade"
```

4. Push para a branch:
```bash
git push origin feature/nova-funcionalidade
```

5. Abra um Pull Request

### Testes

Execute os testes:
```bash
npm test
```

### Lint e Formatação

```bash
npm run lint
npm run format
```


## Suporte

- Email: suporte@metadax.com.br
- WhatsApp: +55 (11) 93473-8412

## Licença

Projeto NÃO licenciado. 
© 2025 [METADAX TECNOLOGIA LTDA](https://app.metadax.com.br). Todos os direitos reservados.
