declare global {
  interface Window {
    analytics: {
      trackEvent(string): void;
    };
  }
}

export {};
