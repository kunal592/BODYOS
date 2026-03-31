import { quotes } from './quoteData';

export const getRandomQuote = () => {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
};

export const getDailyQuote = () => {
  const today = new Date().toDateString();
  // Simplified daily quote selection based on date string
  const hash = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return quotes[hash % quotes.length];
};
