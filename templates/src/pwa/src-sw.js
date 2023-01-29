import { clientsClaim } from 'workbox-core';
import { staticResourceCache, imageCache, offlineFallback } from 'workbox-recipes';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { setDefaultHandler } from 'workbox-routing';
import { NetworkOnly } from 'workbox-strategies';

const version = 'abber-v92';
console.log(version);

self.skipWaiting();

clientsClaim();

cleanupOutdatedCaches();

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST);

// Cache pages with Network Only strategy
setDefaultHandler(new NetworkOnly());

// Cache CSS, JS, and Web Worker requests with a Stale While Revalidate strategy
staticResourceCache();

// Cache images with a Cache First strategy
// imageCache();

// Offline page callback
offlineFallback();
