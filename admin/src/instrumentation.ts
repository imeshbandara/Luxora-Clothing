export function register() {
  if (typeof window === 'undefined') {
    // Check if Node.js 25's experimental localStorage is present but not configured/functional
    if (typeof globalThis.localStorage !== 'undefined' && !globalThis.localStorage.getItem) {
      const mockStorage: Record<string, string> = {};
      const localStorageMock = {
        getItem: (key: string): string | null => {
          return mockStorage[key] || null;
        },
        setItem: (key: string, value: string): void => {
          mockStorage[key] = String(value);
        },
        removeItem: (key: string): void => {
          delete mockStorage[key];
        },
        clear: (): void => {
          for (const key in mockStorage) {
            delete mockStorage[key];
          }
        },
        key: (index: number): string | null => {
          const keys = Object.keys(mockStorage);
          return keys[index] || null;
        },
        get length(): number {
          return Object.keys(mockStorage).length;
        }
      };

      Object.defineProperty(globalThis, 'localStorage', {
        value: localStorageMock,
        writable: true,
        configurable: true
      });
    }
  }
}
