'use client';

import { useEffect, useState } from 'react';

interface PWAState {
  isInstalled: boolean;
  isOnline: boolean;
  hasUpdate: boolean;
  isLoading: boolean;
}

export function usePWA() {
  const [pwaState, setPwaState] = useState<PWAState>({
    isInstalled: false,
    isOnline: navigator.onLine,
    hasUpdate: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check if app is installed
    const checkInstallation = () => {
      const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
      setPwaState(prev => ({ ...prev, isInstalled, isLoading: false }));
    };

    // Check online status
    const handleOnline = () => setPwaState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setPwaState(prev => ({ ...prev, isOnline: false }));

    // Service worker update handling
    const handleUpdateFound = () => {
      setPwaState(prev => ({ ...prev, hasUpdate: true }));
    };

    // Register service worker
    const registerSW = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          
          // Check for updates
          registration.addEventListener('updatefound', handleUpdateFound);
          
          // Handle service worker updates
          registration.addEventListener('controllerchange', () => {
            window.location.reload();
          });

          console.log('Service Worker registered successfully');
        } catch (error) {
          console.error('Service Worker registration failed:', error);
        }
      }
    };

    checkInstallation();
    registerSW();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const updateApp = async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    }
  };

  return {
    ...pwaState,
    updateApp,
  };
} 