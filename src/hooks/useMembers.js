import { useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

export const useMembers = (isAuthenticated = true) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer tous les membres
  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/auth/users');
      
      // La réponse contient { success: true, count: number, users: array }
      const membersData = response.data.users || response.data || [];
      
      setMembers(Array.isArray(membersData) ? membersData : []);
    } catch (err) {
      console.error('❌ Error fetching members:', err);
      console.error('📋 Error response:', err.response?.data);
      console.error('🔍 Error status:', err.response?.status);
      
      setError(
        err.response?.data?.error || 
        'Erreur de connexion au serveur.'
      );
      setMembers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Charger les membres au montage du composant seulement si authentifié
  useEffect(() => {
    if (isAuthenticated) {
      fetchMembers();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, fetchMembers]);

  return {
    members,
    loading,
    error,
    refreshMembers: fetchMembers
  };
};
