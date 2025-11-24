# Chord Transposer 🎸

A beautiful, mobile-friendly web app for transposing music chords.

## Features

- ✨ Transpose chords up or down by semitones
- 📱 Mobile-friendly responsive design
- 🎨 Beautiful music-studio inspired aesthetic
- ⚡ Fast and lightweight
- 🎵 Supports all chord types (major, minor, 7th, sus, dim, aug, etc.)

## Deploy to Vercel (Recommended)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Install Git** (if you haven't already):
   - Download from https://git-scm.com/

2. **Create a GitHub repository:**
   - Go to https://github.com/new
   - Name it `chord-transposer` (or any name you like)
   - Keep it public or private
   - Don't initialize with README
   - Click "Create repository"

3. **Upload your code to GitHub:**
   - Open terminal/command prompt
   - Navigate to the `chord-transposer-app` folder
   - Run these commands:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/chord-transposer.git
     git push -u origin main
     ```
   - Replace `YOUR_USERNAME` with your GitHub username

4. **Deploy to Vercel:**
   - Go to https://vercel.com/
   - Sign up/login (you can use your GitHub account)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect it's a Vite project
   - Click "Deploy"
   - Wait 1-2 minutes for deployment to complete
   - Your app will be live at a Vercel URL! 🎉

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   cd chord-transposer-app
   vercel
   ```

3. **Follow the prompts:**
   - Login to Vercel
   - Set up project settings (use defaults)
   - Deploy!

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Go to `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## How to Use the App

1. Enter your chords separated by commas (e.g., `Am, F, C, G, Dm, E`)
2. Click the **+** button to transpose up by one semitone
3. Click the **−** button to transpose down by one semitone
4. Click **Reset to Original** to return to the starting key

## Supported Chord Formats

- Major: `C`, `D`, `E`, etc.
- Minor: `Am`, `Dm`, `Em`, etc.
- Seventh: `C7`, `Am7`, `Dmaj7`, etc.
- Suspended: `Csus4`, `Dsus2`, etc.
- Diminished: `Cdim`, `Ddim7`, etc.
- Augmented: `Caug`, etc.
- And many more!

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Google Fonts (DM Serif Display & Manrope)

## License

Free to use and modify!

---

Made with ❤️ for musicians everywhere
