'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const checkOnlineStatus = () => {
      setIsOnline(navigator.onLine);
    };

    checkOnlineStatus();
    window.addEventListener('online', checkOnlineStatus);
    window.addEventListener('offline', checkOnlineStatus);

    return () => {
      window.removeEventListener('online', checkOnlineStatus);
      window.removeEventListener('offline', checkOnlineStatus);
    };
  }, []);

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <WifiOff className="h-8 w-8 text-red-600" />
          </div>
          <CardTitle className="text-xl">You're Offline</CardTitle>
          <CardDescription>
            Please check your internet connection and try again
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Make sure your device is connected to the internet</p>
            <p>• Try refreshing the page</p>
            <p>• Check if your Wi-Fi or mobile data is working</p>
          </div>
          
          <Button 
            onClick={handleRetry} 
            className="w-full"
            disabled={!isOnline}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            {isOnline ? 'Retry Connection' : 'No Internet Connection'}
          </Button>
          
          {!isOnline && (
            <p className="text-xs text-center text-gray-500">
              Waiting for internet connection...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 