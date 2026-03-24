// src/utils/dateUtils.js

export const getRelativeTime = (dateString) => {
  const reviewDate = new Date(dateString);
  const now = new Date();
  
  // Différence en jours
  const diffInDays = Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24));

  if (diffInDays < 1) return "aujourd'hui";
  if (diffInDays < 30) return `il y a ${diffInDays} jour${diffInDays > 1 ? 's' : ''}`;
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `il y a ${diffInMonths} mois`;
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `il y a ${diffInYears} an${diffInYears > 1 ? 's' : ''}`;
};