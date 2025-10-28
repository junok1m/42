# 5web - Model Agency Website 🌟

Built with **Vite + React + TypeScript + Tailwind CSS**

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:5173 in your browser! 🎉

## 📦 What's Inside

- ✅ Banner carousel with your 5 images (in `public/images/banner/`)
- ✅ Roster system (Today/Tomorrow tabs)
- ✅ Model portfolio carousel
- ✅ Fully responsive design
- ✅ Touch/swipe gestures
- ✅ TypeScript + Tailwind CSS
- ✅ **No vulnerabilities!** (thanks to Vite!)

## 🎨 Adding Your Model Photos

1. Put model images in `public/images/models/`
2. Update `src/Homepage.tsx` around line 25:

```typescript
const models = [
  {
    id: 1,
    name: 'Lily',
    image: '/images/models/lily.jpg', // Update this
    profileLink: '/models/lily'
  },
  // ... add more
];
```

## 🌐 Deploy to GitHub Pages

### 1. Update Your Username

In `package.json` line 6, change:
```json
"homepage": "https://YOUR-USERNAME.github.io/5web",
```

And in `vite.config.ts` line 7:
```typescript
base: '/5web/', // Your repo name
```

### 2. Deploy

```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Push to GitHub (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/5web.git
git branch -M main
git push -u origin main

# Deploy!
npm run deploy
```

Your site will be live at: `https://YOUR-USERNAME.github.io/5web`

## 📝 Available Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Build for production
npm run preview   # Preview production build
npm run deploy    # Deploy to GitHub Pages
```

## 📁 Project Structure

```
5web/
├── public/
│   └── images/
│       └── banner/          # Your 5 banner images
├── src/
│   ├── Homepage.tsx         # Main component
│   ├── App.tsx             # App wrapper
│   ├── main.tsx            # Entry point
│   └── index.css           # Tailwind styles
├── package.json
├── vite.config.ts          # Vite configuration
└── tailwind.config.js      # Tailwind configuration
```

## 🎯 Customization

### Change Company Name
Search "ELITE MODELS" in `src/Homepage.tsx`

### Update Contact Info
Edit footer in `src/Homepage.tsx`

### Adjust Carousel Timing
Change intervals in the `useEffect` hooks in `Homepage.tsx`

## 💡 Why Vite?

- ⚡ Lightning fast hot reload
- 🔧 No configuration needed
- 📦 Smaller bundle sizes
- 🐛 No vulnerabilities
- 🚀 Better developer experience

## 🆘 Troubleshooting

### Port already in use?
```bash
# Vite will auto-increment to 5174, 5175, etc.
# Or specify a port:
npm run dev -- --port 3000
```

### Images not showing?
- Check they're in `public/images/banner/`
- Paths should start with `/images/...`

### Build fails?
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Tech Stack

- **Vite** - Build tool
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **gh-pages** - Deployment

---

**Next Steps:**
1. `npm install`
2. `npm run dev`
3. Add your model photos
4. Deploy to GitHub Pages!

Made with ❤️ - Happy coding!
