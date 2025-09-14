// Configuration de l'application
const config = {
  // URL de base de l'API
  api: {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000, // 10 secondes
  },
  
  // Configuration de l'application
  app: {
    name: import.meta.env.VITE_APP_NAME || 'Task Manager Pro',
    description: import.meta.env.VITE_APP_DESCRIPTION || 'Application de gestion de projet',
    version: '1.0.0',
  },
  
  // Configuration de l'authentification
  auth: {
    tokenName: 'authToken',
    tokenExpiry: 24 * 60 * 60 * 1000, // 24 heures
    googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID || '',
    facebookAppId: import.meta.env.VITE_FACEBOOK_APP_ID || ''
  },
  
  // Configuration des uploads
  upload: {
    maxSize: parseInt(import.meta.env.VITE_MAX_UPLOAD_SIZE) || 5242880, // 5MB
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'image/webp'
    ],
  },
  
  // Configuration des tâches
  tasks: {
    priorities: [
      { value: 'faible', label: 'Faible', color: 'bg-gray-200 text-gray-800' },
      { value: 'moyenne', label: 'Moyenne', color: 'bg-blue-100 text-blue-800' },
      { value: 'haute', label: 'Haute', color: 'bg-red-100 text-red-800' },
    ],
    statuses: [
      { value: 'a_faire', label: 'À faire', color: 'bg-gray-100 text-gray-800' },
      { value: 'en_cours', label: 'En cours', color: 'bg-blue-100 text-blue-800' },
      { value: 'termine', label: 'Terminé', color: 'bg-green-100 text-green-800' },
    ],
  },
};

export default config;
