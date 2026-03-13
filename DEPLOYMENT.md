# Deployment Guide

## Build for Production

1. Install dependencies:
   npm install

2. Build:
   npm run build

3. Start:
   npm run start

## Environment Variables
- Copy .env.example to .env and fill in your values.

## Deploy to Vercel
- Connect your GitHub repo to Vercel and follow prompts.

## Deploy to Netlify
- Set build command: next build
- Set publish directory: .next

## Custom Hosting
- Deploy .next and run npm run start on a Node.js server.

## Notes
- Ensure all secrets are in .env (never commit secrets).
- Update .gitignore to exclude .env files.
