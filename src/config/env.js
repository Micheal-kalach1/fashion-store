const DEFAULT_PORT = 3000;

export function getConfig() {
  const port = Number(process.env.PORT || DEFAULT_PORT);

  return {
    env: process.env.NODE_ENV || 'development',
    port: Number.isFinite(port) ? port : DEFAULT_PORT
  };
}
