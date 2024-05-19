import './envConfig.ts';

const API_KEY = process.env.API_KEY;

export const isAPIKeyValid = (request: Request): boolean => {
  const apiKey = request.headers.get('x-api-key');
  return !!(apiKey || apiKey !== API_KEY);
};
