# 🔥 Fire Force - Naruto Encyclopedia

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![Jest](https://img.shields.io/badge/Jest-30.2.0-C21325?style=for-the-badge&logo=jest)

Uma aplicação moderna e interativa para explorar o universo Naruto, com informações detalhadas sobre personagens, jutsus e muito mais.

[Demo](https://your-demo-link.com) • [Reportar Bug](https://github.com/lucas-albieri/fire-force/issues) • [Solicitar Feature](https://github.com/lucas-albieri/fire-force/issues)

</div>

---

## 📋 Sobre o Projeto

Fire Force é uma enciclopédia completa do universo Naruto, desenvolvida com as tecnologias mais modernas do ecossistema React. O projeto oferece uma experiência rica e fluida para os fãs explorarem informações sobre seus ninjas favoritos.

### ✨ Principais Funcionalidades

- 🎯 **Galeria de Ninjas**: Navegação intuitiva com infinite scroll
- 🔍 **Busca em Tempo Real**: Filtro dinâmico de personagens
- 📱 **Design Responsivo**: Experiência perfeita em qualquer dispositivo
- ⚡ **Performance Otimizada**: Server-side rendering e caching inteligente
- 🎨 **UI Moderna**: Interface elegante com animações suaves
- 🧪 **100% Testado**: Cobertura completa de testes unitários

---

## 🚀 Tecnologias

### Core

- **[Next.js 16.0.3](https://nextjs.org/)** - Framework React com SSR e App Router
- **[React 19.2.0](https://react.dev/)** - Biblioteca para interfaces de usuário
- **[TypeScript 5.x](https://www.typescriptlang.org/)** - Superset JavaScript com tipagem estática
- **[Tailwind CSS 4.x](https://tailwindcss.com/)** - Framework CSS utility-first

### Bibliotecas

- **[Ky 1.14.0](https://github.com/sindresorhus/ky)** - Cliente HTTP moderno e elegante
- **[Lucide React 0.553.0](https://lucide.dev/)** - Ícones SVG otimizados

### API

- **[Naruto BR API](https://narutodb.xyz/)** - API completa com informações sobre o universo Naruto

### Qualidade de Código

- **[Biome 2.2.0](https://biomejs.dev/)** - Linter e formatter ultrarrápido
- **[Jest 30.2.0](https://jestjs.io/)** - Framework de testes JavaScript
- **[Testing Library](https://testing-library.com/)** - Utilitários para testar componentes React

---

## 🎯 Arquitetura

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── (home)/            # Página inicial
│   ├── ninjas/            # Lista de ninjas
│   │   ├── [id]/         # Detalhes do ninja
│   │   └── _components/  # Componentes da lista
│   └── layout.tsx        # Layout global
├── components/            # Componentes compartilhados
├── services/             # Camada de serviços/API
├── shared/               # Tipos, hooks e utilitários
│   ├── enum/
│   ├── hooks/
│   └── types/
└── __tests__/            # Testes unitários
```

### 🏗️ Padrões Utilizados

- **Server Components**: Renderização do lado do servidor por padrão
- **Client Components**: Apenas quando necessário para interatividade
- **API Routes**: Endpoints customizados quando necessário
- **TypeScript Strict Mode**: Máxima segurança de tipos
- **Component Composition**: Componentes reutilizáveis e compostos
- **Custom Hooks**: Lógica compartilhada entre componentes

---

## 🛠️ Instalação e Uso

### Pré-requisitos

- Node.js 18+ 
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clone o repositório
git clone https://github.com/lucas-albieri/fire-force.git

# Entre no diretório
cd fire-force

# Instale as dependências
npm install
# ou
yarn install
# ou
pnpm install
```

### Executar em Desenvolvimento

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
# Criar build otimizado
npm run build

# Iniciar servidor de produção
npm start
```

### Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm test -- --watch

# Executar testes com cobertura
npm test -- --coverage
```

### Linting e Formatação

```bash
# Verificar código
npm run lint

# Formatar código automaticamente
npm run format
```

---

## 🧪 Testes

O projeto possui **cobertura completa de testes** com 60+ testes unitários:

- ✅ **Home Page**: 11 testes
- ✅ **Ninjas List**: 19 testes  
- ✅ **Ninja Details**: 30 testes

Todos os componentes críticos estão testados incluindo:
- Renderização de componentes
- Interações do usuário
- Estados de loading e erro
- Filtros e buscas
- Navegação

---

## 📁 Principais Arquivos

- `next.config.ts` - Configuração do Next.js
- `tailwind.config.ts` - Configuração do Tailwind CSS
- `jest.config.ts` - Configuração do Jest
- `jest.setup.ts` - Setup global dos testes
- `biome.json` - Configuração do Biome (linter/formatter)
- `tsconfig.json` - Configuração do TypeScript

---

## 🎨 Features em Destaque

### 🔄 Infinite Scroll
Carregamento progressivo de ninjas com Intersection Observer API, proporcionando uma experiência fluida sem paginação tradicional.

### 🎯 Busca em Tempo Real
Sistema de busca instantânea que filtra personagens enquanto você digita, com feedback visual do número de resultados.

### 📊 Detalhes Completos
Páginas individuais para cada ninja com:
- Informações familiares
- Lista de jutsus especiais
- Galeria de imagens
- Nível de poder visual
- Navegação intuitiva

### 🎭 Animações Suaves
Transições e animações CSS cuidadosamente elaboradas para uma experiência premium.

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um Fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

**Lucas Albieri**

- GitHub: [@lucas-albieri](https://github.com/lucas-albieri)

---

## 🙏 Agradecimentos

- [Naruto BR API](https://narutodb.xyz/) pela API incrível
- Comunidade Next.js pelos recursos e documentação
- Masashi Kishimoto pelo universo Naruto

---

<div align="center">

Feito com ❤️ e ☕ por [Lucas Albieri](https://github.com/lucas-albieri)

</div>
