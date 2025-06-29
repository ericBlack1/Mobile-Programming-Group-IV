'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { X, RefreshCw } from 'lucide-react';
import { usePWA } from '@/hooks/use-pwa';

export function PWAUpdateNotification() {
  const { hasUpdate, updateApp } = usePWA();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (hasUpdate) {
      setShowNotification(true);
    }
  }, [hasUpdate]);

  const handleUpdate = async () => {
    await updateApp();
    setShowNotification(false);
  };

  const handleDismiss = () => {
    setShowNotification(false);
  };

  if (!showNotification) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-80">
      <Card className="shadow-lg border-green-200 bg-green-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold text-green-900">
              Update Available
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDismiss}
              className="h-6 w-6 p-0 text-green-600 hover:text-green-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-xs text-green-700">
            A new version of AttendanceHub is available
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex gap-2">
            <Button
              onClick={handleUpdate}
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Update Now
            </Button>
            <Button
              onClick={handleDismiss}
              variant="outline"
              size="sm"
              className="border-green-300 text-green-700 hover:bg-green-100"
            >
              Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 