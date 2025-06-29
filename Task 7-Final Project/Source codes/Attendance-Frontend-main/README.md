# Attendance Management System - PWA

A modern Progressive Web App (PWA) for attendance management in educational institutions.

## Features

### PWA Capabilities
- ✅ **Installable** - Can be installed on mobile and desktop devices
- ✅ **Offline Support** - Works without internet connection
- ✅ **Push Notifications** - Real-time attendance updates
- ✅ **Background Sync** - Syncs data when connection is restored
- ✅ **App-like Experience** - Full-screen, standalone mode
- ✅ **Fast Loading** - Cached resources for instant access

### Core Features
- **Role-based Access** - Admin, Instructor, and Student dashboards
- **Attendance Tracking** - Real-time check-in system
- **Course Management** - Schedule and manage courses
- **Reporting** - Comprehensive attendance reports
- **Messaging** - In-app communication system

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd attendance-management-system
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## PWA Features

### Installation
- **Mobile**: Use "Add to Home Screen" from browser menu
- **Desktop**: Click the install prompt or use browser menu
- **Chrome**: Look for the install icon in the address bar

### Offline Usage
The app caches essential resources and works offline:
- Dashboard and navigation
- Previously viewed pages
- Basic functionality

### Push Notifications
- Attendance reminders
- Course updates
- System notifications

## File Structure

```
attendance-management-system/
├── app/                    # Next.js app router
│   ├── admin/             # Admin dashboard
│   ├── instructor/        # Instructor dashboard
│   ├── student/           # Student dashboard
│   ├── auth/              # Authentication pages
│   └── offline/           # Offline page
├── components/            # React components
│   ├── ui/               # UI components (shadcn/ui)
│   ├── pwa-installer.tsx # PWA install prompt
│   └── pwa-update-notification.tsx # Update notifications
├── hooks/                # Custom hooks
│   └── use-pwa.ts        # PWA functionality hook
├── public/               # Static assets
│   ├── manifest.json     # Web app manifest
│   ├── sw.js            # Service worker
│   └── icons/           # PWA icons
└── next.config.mjs      # Next.js + PWA configuration
```

## PWA Configuration

### Manifest (`public/manifest.json`)
- App name and description
- Theme colors and icons
- Display mode and orientation
- App shortcuts

### Service Worker (`public/sw.js`)
- Caching strategies
- Offline functionality
- Background sync
- Push notifications

### Icons
Multiple sizes for different devices:
- 16x16, 32x32 (favicon)
- 72x72, 96x96 (Android)
- 144x144, 152x152 (iOS)
- 192x192, 512x512 (PWA)

## Browser Support

- ✅ Chrome 67+
- ✅ Firefox 67+
- ✅ Safari 11.1+
- ✅ Edge 79+

## Development

### PWA Testing
1. Use Chrome DevTools > Application tab
2. Test service worker registration
3. Verify manifest loading
4. Check offline functionality

### Lighthouse Audit
Run Lighthouse audit to verify PWA compliance:
```bash
# Install Lighthouse globally
npm install -g lighthouse

# Run audit
lighthouse http://localhost:3000 --view
```

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel --prod
```

### Other Platforms
- Netlify
- AWS Amplify
- Firebase Hosting

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test PWA functionality
5. Submit a pull request

## License

This project is licensed under the MIT License. 