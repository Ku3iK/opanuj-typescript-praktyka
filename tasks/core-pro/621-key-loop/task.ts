// Wykorzystaj odpowiednie mechanizmy TypeScript, aby uzyskać szczegółowe informacje o kluczach obiektu wewnątrz pętli for...of

const configurations = {
  apiEndpoint: 'https://api.example.com',
  retryAttempts: 3,
  enableLogs: true,
};

for (const key of Object.keys(configurations)) {
  console.log(`${key} => ${configurations[key as keyof typeof configurations]}`);
}
