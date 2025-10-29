# Kataplum - Festas e Eventos

## 🚀 Especificações Técnicas

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS v4** for styling
- **Lucide React** for icons
- **ShadCN UI** components

## 📁 Estrutura do Projeto

```
├── App.tsx                      # Main application component
├── components/
│   ├── Header.tsx              # Navigation header with mobile menu
│   ├── HeroCarousel.tsx        # Auto-sliding carousel (3s interval)
│   ├── FeaturedCategories.tsx  # Themed category cards
│   ├── HowItWorks.tsx          # 3-step process section
│   ├── ProductList.tsx         # Filterable product showcase
│   ├── InstagramFeed.tsx       # Instagram feed with caching
│   ├── Footer.tsx              # Footer with contact info
│   └── ui/                     # ShadCN UI components
├── styles/
│   └── globals.css             # Global styles and brand colors
└── public/
    └── assets/
        └── carousel/           # Carousel images (to be replaced)
```

## 🖼️ Refazendo o carrossel de imagens

### Etapa 1: Preparando as imagens

1. Create your carousel images with these recommended dimensions:
   - Minimum: 1920x1080px (16:9 ratio)
   - Format: JPG or PNG
   - Optimized file size: < 500KB per image

2. Save your images in `/public/assets/carousel/` directory:
   ```
   /public/assets/carousel/
   ├── slide-1.jpg
   ├── slide-2.jpg
   ├── slide-3.jpg
   └── slide-4.jpg
   ```

### Etapa 2: Atualize o componente 'Carousel'

Open `/components/HeroCarousel.tsx` and update the `slides` array:

```typescript
const slides: Slide[] = [
  {
    id: 1,
    title: "Your Custom Title",
    subtitle: "Your custom subtitle text",
    image: "/assets/carousel/slide-1.jpg",
    cta: "Your CTA Text",
  },
  // Add more slides...
];
```

### Melhores Práticas de Imagens

- Use descriptive alt text for accessibility
- Lazy load images (already implemented for slides 2+)
- Optimize images before upload using tools like:
  - [TinyPNG](https://tinypng.com/)
  - [Squoosh](https://squoosh.app/)
  - ImageOptim (Mac)

## 📸 Configuração do Feed do Instagram

The Instagram feed component supports dynamic content from an API endpoint.

### Environment Setup

1. Create a `.env` file in the root directory:

```env
# Instagram API Endpoint
VITE_IG_ENDPOINT=https://your-api-endpoint.com/instagram/posts

# Example response format expected:
# [
#   {
#     "id": "post-id",
#     "media_url": "https://...",
#     "caption": "Post caption",
#     "permalink": "https://instagram.com/p/..."
#   }
# ]
```

### API Integration Notes

- **Cache Duration**: 30 minutes (configurable in `InstagramFeed.tsx`)
- **Offline Support**: Automatically uses cached data when offline
- **Fallback**: Uses mock data if no API endpoint is configured
- **Local Storage**: Caches posts in browser localStorage

### Without API (Using Mock Data)

If you don't configure `VITE_IG_ENDPOINT`, the component will use placeholder images. This is perfect for development or if you prefer static content.

### Custom API Format

If your API returns different field names, update the transformation logic in `/components/InstagramFeed.tsx`:

```typescript
const transformedPosts: InstagramPost[] = data.map(
  (post: any) => ({
    id: post.your_id_field,
    image: post.your_image_field,
    caption: post.your_caption_field,
    link: post.your_link_field,
  }),
);
```

## 🛠️ Dev.

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 📦 Dependências

- `react` & `react-dom`: UI framework
- `lucide-react`: Icon library
- `@radix-ui/*`: Accessible component primitives (via ShadCN)
- `class-variance-authority`: Component variants
- `clsx` & `tailwind-merge`: Utility class management

## 📄 Licença

© 2017 Kataplum. All rights reserved.

## 🤝 Suporte

For questions or support:

- Instagram: kataplum\_
- Telefone: +55 (61) 99629-1414


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
