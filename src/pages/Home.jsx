import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTasks } from '../hooks/useTasks';
import { useMembers } from '../hooks/useMembers';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';

const Home = () => {
  const { user, isAuthenticated } = useAuth();
  // Only load tasks and members if user is authenticated
  const { tasks, loading: tasksLoading, createTask, updateTask, deleteTask, updateTaskStatus } = useTasks(isAuthenticated);
  const { members, loading: membersLoading } = useMembers(isAuthenticated);
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [activeSection, setActiveSection] = useState('dashboard');

  // Helper function to get image URL
  const getImageUrl = (photoPath) => {
    if (!photoPath) return '';
    const baseUrl = 'https://mon-backend-j2ol.onrender.com';
    // Handle both relative and absolute paths
    if (photoPath.startsWith('http')) {
      return photoPath;
    }
    const path = photoPath.startsWith('/') ? photoPath : `/${photoPath}`;
    return `${baseUrl}${path}`;
  };

  // Task handlers
  const handleCreateTask = async (taskData) => {
    try {
      await createTask(taskData);
      setShowTaskForm(false);
    } catch (error) {
      console.error('Erreur création tâche:', error);
    }
  };

  const handleUpdateTask = async (taskData) => {
    if (!editingTask) return;
    try {
      await updateTask(editingTask._id, taskData);
      setEditingTask(null);
      setShowTaskForm(false);
    } catch (error) {
      console.error('Erreur mise à jour tâche:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Supprimer cette tâche ?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        console.error('Erreur suppression tâche:', error);
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error('Erreur changement statut:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-300 rounded-full animate-pulse animation-delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-pink-300 rounded-full animate-pulse animation-delay-3000"></div>
      </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Modern Navigation Tabs */}
        {isAuthenticated && (
          <div className="flex justify-center mb-12 animate-fade-in">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-1.5 border border-white/10 shadow-2xl">
              <div className="flex space-x-1">
                {[
                  { key: 'dashboard', icon: '📊', label: 'Dashboard', gradient: 'from-blue-500 to-cyan-500' },
                  { key: 'tasks', icon: '⚡', label: 'Tasks', gradient: 'from-purple-500 to-pink-500' },
                  { key: 'team', icon: '👥', label: 'Team', gradient: 'from-emerald-500 to-teal-500' },
                  { key: 'profile', icon: '🎯', label: 'Profile', gradient: 'from-orange-500 to-red-500' }
                ].map((section) => (
                  <button
                    key={section.key}
                    onClick={() => setActiveSection(section.key)}
                    className={`group relative px-8 py-4 rounded-xl font-semibold transition-all duration-500 transform hover:scale-105 ${
                      activeSection === section.key
                        ? `bg-gradient-to-r ${section.gradient} text-white shadow-2xl shadow-${section.gradient.split('-')[1]}-500/25`
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-xl group-hover:animate-bounce">{section.icon}</span>
                      <span className="font-medium">{section.label}</span>
                    </div>
                    {activeSection === section.key && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Modern Hero Section for non-authenticated users */}
        {!isAuthenticated && (
          <div className="text-center mb-20 animate-fade-in">
            <div className="mb-12 relative">
              <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl mb-8 shadow-2xl animate-float relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-50 animate-pulse"></div>
                <svg className="w-14 h-14 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h2m0-13h10a2 2 0 012 2v11a2 2 0 01-2 2H9m0-13v13" />
                </svg>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-8 leading-tight">
              TaskFlow
              <span className="block text-4xl md:text-5xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-4 font-light">
                Professional Suite
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Révolutionnez votre productivité avec notre plateforme de gestion collaborative nouvelle génération.
              <span className="block mt-2 text-lg text-slate-400">Gestion intelligente • Collaboration temps réel • Analytics avancés</span>
            </p>

            {/* Documentation Section */}
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 mb-16 border border-white/10 max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">🚀 Fonctionnalités Principales</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Gestion des Tâches */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Gestion des Tâches</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• Création et organisation de tâches</li>
                    <li>• Priorités et échéances personnalisables</li>
                    <li>• Statuts avancés (À faire, En cours, Terminé)</li>
                    <li>• Assignation à des membres d'équipe</li>
                    <li>• Suivi des progrès en temps réel</li>
                  </ul>
                </div>

                {/* Collaboration */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Collaboration d'Équipe</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• Profils membres avec photos</li>
                    <li>• Rôles Admin et Membre</li>
                    <li>• Assignation collaborative de tâches</li>
                    <li>• Gestion des permissions</li>
                    <li>• Communication intégrée</li>
                  </ul>
                </div>

                {/* Analytics */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Tableaux de Bord</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• Statistiques détaillées des tâches</li>
                    <li>• Graphiques de performance</li>
                    <li>• Suivi des échéances</li>
                    <li>• Rapports d'activité</li>
                    <li>• Métriques de productivité</li>
                  </ul>
                </div>

                {/* Interface */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Interface Moderne</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• Design responsive et élégant</li>
                    <li>• Navigation intuitive par onglets</li>
                    <li>• Animations fluides</li>
                    <li>• Mode sombre professionnel</li>
                    <li>• Expérience utilisateur optimisée</li>
                  </ul>
                </div>

                {/* Sécurité */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Sécurité Avancée</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• Authentification JWT sécurisée</li>
                    <li>• Chiffrement des données</li>
                    <li>• Gestion des sessions</li>
                    <li>• Protection CORS</li>
                    <li>• Validation des entrées</li>
                  </ul>
                </div>

                {/* Performance */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Performance Optimisée</h3>
                  <ul className="text-slate-300 text-sm space-y-2">
                    <li>• Chargement ultra-rapide</li>
                    <li>• Cache intelligent</li>
                    <li>• Optimisation des requêtes</li>
                    <li>• Pagination avancée</li>
                    <li>• Synchronisation temps réel</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Avantages Section */}
            <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">✨ Pourquoi Choisir TaskFlow ?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">🎯 Productivité Maximale</h4>
                    <p className="text-slate-300 text-sm">Augmentez votre efficacité de 300% avec nos outils intelligents</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">⚡ Déploiement Instantané</h4>
                    <p className="text-slate-300 text-sm">Commencez en moins de 2 minutes, aucune configuration requise</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">🔄 Synchronisation Temps Réel</h4>
                    <p className="text-slate-300 text-sm">Vos équipes restent synchronisées où qu'elles soient</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">📊 Analytics Intelligents</h4>
                    <p className="text-slate-300 text-sm">Prenez des décisions éclairées avec nos rapports détaillés</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link
                to="/login"
                className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-105 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center space-x-3">
                  <span>Commencer Maintenant</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </Link>
              
              <Link
                to="/register"
                className="group bg-white/5 backdrop-blur-xl text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-500 border border-white/20 hover:border-white/40 transform hover:scale-105"
              >
                <div className="flex items-center space-x-3">
                  <span>Créer un Compte</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>
              </Link>
            </div>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: '⚡', title: 'Ultra Rapide', desc: 'Interface réactive et performante' },
                { icon: '🔒', title: 'Sécurisé', desc: 'Chiffrement de bout en bout' },
                { icon: '🌍', title: 'Collaboratif', desc: 'Travail d\'équipe en temps réel' }
              ].map((feature, index) => (
                <div key={index} className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 hover:bg-white/10 transform hover:-translate-y-2">
                  <div className="text-3xl mb-4 group-hover:animate-bounce">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modern Dashboard Section */}
        {isAuthenticated && activeSection === 'dashboard' && (
          <div className="space-y-12 animate-fade-in">
            {/* Welcome Header with Avatar */}
            <div className="text-center mb-12 relative">
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  {user?.photo ? (
                    <img
                      src={getImageUrl(user.photo)}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-white/20 shadow-2xl"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center border-4 border-white/20 shadow-2xl">
                      <span className="text-2xl font-bold text-white">
                        {user?.nom ? user.nom.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </div>
                  )}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white/20 animate-pulse"></div>
                </div>
                
                <div>
                  <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-3">
                    Bonjour, {user?.nom || 'Utilisateur'} ! 👋
                  </h1>
                  <p className="text-xl text-slate-300 font-light">Voici votre tableau de bord personnalisé</p>
                  <div className="mt-2 text-sm text-slate-400">
                    {new Date().toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
              {[
                {
                  title: 'Total Tâches',
                  count: Array.isArray(tasks) ? tasks.length : 0,
                  icon: '📊',
                  gradient: 'from-indigo-500 to-purple-500',
                  bgGradient: 'from-indigo-500/10 to-purple-500/10',
                  borderColor: 'border-indigo-500/30'
                },
                {
                  title: 'À Faire',
                  count: Array.isArray(tasks) ? tasks.filter(t => t?.statut === 'a_faire').length : 0,
                  icon: '📋',
                  gradient: 'from-orange-500 to-red-500',
                  bgGradient: 'from-orange-500/10 to-red-500/10',
                  borderColor: 'border-orange-500/30'
                },
                {
                  title: 'En Cours',
                  count: Array.isArray(tasks) ? tasks.filter(t => t?.statut === 'en_cours').length : 0,
                  icon: '⚡',
                  gradient: 'from-blue-500 to-cyan-500',
                  bgGradient: 'from-blue-500/10 to-cyan-500/10',
                  borderColor: 'border-blue-500/30'
                },
                {
                  title: 'Terminées',
                  count: Array.isArray(tasks) ? tasks.filter(t => t?.statut === 'termine').length : 0,
                  icon: '✅',
                  gradient: 'from-emerald-500 to-green-500',
                  bgGradient: 'from-emerald-500/10 to-green-500/10',
                  borderColor: 'border-emerald-500/30'
                }
              ].map((stat, index) => (
                <div key={index} className={`group relative bg-gradient-to-br ${stat.bgGradient} backdrop-blur-xl p-6 rounded-2xl border ${stat.borderColor} hover:border-white/40 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2 shadow-2xl`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl"></div>
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-r ${stat.gradient} rounded-xl shadow-lg group-hover:animate-bounce`}>
                        <span className="text-xl">{stat.icon}</span>
                      </div>
                      <div className="text-right">
                        <div className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${stat.gradient} group-hover:animate-pulse`}>
                          {stat.count}
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{stat.title}</h3>
                    <div className="w-full bg-white/10 rounded-full h-1.5">
                      <div className={`bg-gradient-to-r ${stat.gradient} h-1.5 rounded-full transition-all duration-1000`} 
                           style={{width: `${Math.min(100, (stat.count / Math.max(1, Array.isArray(tasks) ? tasks.length : 1)) * 100)}%`}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modern Quick Actions */}
            <div className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white">Actions Rapides</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {user?.role === 'admin' && (
                  <button
                    onClick={() => setShowTaskForm(true)}
                    className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6 rounded-2xl font-semibold hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 transform hover:scale-105 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="relative flex flex-col items-center space-y-3">
                      <div className="p-3 bg-white/20 rounded-xl group-hover:animate-bounce">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <span className="text-lg">Nouvelle Tâche</span>
                      <span className="text-xs opacity-75">Créer une nouvelle tâche</span>
                    </div>
                  </button>
                )}
                
                <button
                  onClick={() => setActiveSection('tasks')}
                  className="group bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl text-white p-6 rounded-2xl font-semibold hover:from-emerald-500/30 hover:to-teal-500/30 transition-all duration-500 border border-emerald-500/30 hover:border-emerald-400/50 transform hover:scale-105"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-emerald-500/30 rounded-xl group-hover:animate-bounce">
                      <svg className="w-8 h-8 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <span className="text-lg">Toutes les Tâches</span>
                    <span className="text-xs opacity-75">Gérer vos tâches</span>
                  </div>
                </button>
                
                <button
                  onClick={() => setActiveSection('team')}
                  className="group bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-xl text-white p-6 rounded-2xl font-semibold hover:from-orange-500/30 hover:to-red-500/30 transition-all duration-500 border border-orange-500/30 hover:border-orange-400/50 transform hover:scale-105"
                >
                  <div className="flex flex-col items-center space-y-3">
                    <div className="p-3 bg-orange-500/30 rounded-xl group-hover:animate-bounce">
                      <svg className="w-8 h-8 text-orange-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-lg">Équipe</span>
                    <span className="text-xs opacity-75">Voir les membres</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tasks Section */}
        {isAuthenticated && activeSection === 'tasks' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">Gestion des Tâches</h2>
              {user?.role === 'admin' && (
                <button
                  onClick={() => setShowTaskForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-xl flex items-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>Nouvelle Tâche</span>
                </button>
              )}
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl border border-white/20 overflow-hidden">
              <div className="p-6">
                {tasksLoading ? (
                  <div className="flex justify-center items-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <TaskList
                    tasks={tasks || []}
                    loading={tasksLoading}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* Team Section */}
        {isAuthenticated && activeSection === 'team' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Notre Équipe</h2>
            
            {membersLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
              </div>
            ) : Array.isArray(members) && members.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                  <div key={member._id} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="w-20 h-20 mx-auto mb-4 relative">
                      {member.photo ? (
                        <div className="relative">
                          <img
                            src={getImageUrl(member.photo)}
                            alt={member.nom || 'Membre'}
                            className="w-20 h-20 rounded-full object-cover border-3 border-white/30 shadow-lg"
                            onError={(e) => {
                              console.log('Image failed to load:', getImageUrl(member.photo));
                              e.target.style.display = 'none';
                              e.target.parentElement.nextElementSibling.style.display = 'flex';
                            }}
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                      ) : null}
                      <div 
                        className={`w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ${
                          member.photo ? 'hidden' : 'flex'
                        }`}
                      >
                        <span className="text-white text-2xl font-bold">
                          {member.nom ? member.nom.charAt(0).toUpperCase() : member.email ? member.email.charAt(0).toUpperCase() : '?'}
                        </span>
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
                      </div>
                    </div>
                    <h3 className="font-semibold text-white mb-1">{member.nom || 'Nom non défini'}</h3>
                    <p className="text-sm text-slate-300 mb-2">{member.poste || 'Poste non défini'}</p>
                    <p className="text-xs text-slate-400">{member.email}</p>
                    <div className="mt-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        member.role === 'admin' 
                          ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {member.role === 'admin' ? 'Administrateur' : 'Membre'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-400">Aucun membre trouvé.</p>
              </div>
            )}
          </div>
        )}

        {/* Profile Section */}
        {isAuthenticated && activeSection === 'profile' && user && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center">Mon Profil</h2>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/20">
              <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="flex-shrink-0">
                  {user.photo ? (
                    <img
                      src={getImageUrl(user.photo)}
                      alt="Photo de profil"
                      className="w-32 h-32 rounded-2xl object-cover border-4 border-white/30 shadow-xl"
                    />
                  ) : (
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center border-4 border-white/30 shadow-xl">
                      <span className="text-4xl font-bold text-white">
                        {user.nom ? user.nom.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-white mb-4">{user.nom}</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-center lg:justify-start text-slate-300">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                      <span>{user.email}</span>
                    </div>
                    {user.poste && (
                      <div className="flex items-center justify-center lg:justify-start text-slate-300">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                        </svg>
                        <span>{user.poste}</span>
                      </div>
                    )}
                  </div>
                  <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold shadow-lg ${
                    user.role === 'admin' 
                      ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white' 
                      : 'bg-gradient-to-r from-emerald-500 to-green-600 text-white'
                  }`}>
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {user.role === 'admin' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      )}
                    </svg>
                    {user.role === 'admin' ? 'Administrateur' : 'Membre'}
                  </span>
                </div>
              </div>
            </div>

            {/* User Tasks */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <svg className="w-6 h-6 text-emerald-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Mes Tâches
              </h3>
              
              {tasksLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </div>
              ) : Array.isArray(tasks) && tasks.length > 0 ? (
                <div className="grid gap-4">
                  {tasks.slice(0, 5).map((task) => (
                    <div key={task._id} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-white">{task.titre}</h4>
                        <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          task.statut === 'termine' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                          task.statut === 'en_cours' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                          'bg-slate-500/20 text-slate-300 border border-slate-500/30'
                        }`}>
                          {task.statut === 'termine' ? '✓ Terminé' :
                           task.statut === 'en_cours' ? '⏳ En cours' : '📋 À faire'}
                        </span>
                      </div>
                      {task.description && (
                        <p className="text-slate-300 text-sm mb-2">{task.description}</p>
                      )}
                      <div className="flex justify-between items-center text-xs text-slate-400">
                        <span>Priorité: <span className={`font-medium ${
                          task.priorite === 'haute' ? 'text-red-400' :
                          task.priorite === 'moyenne' ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {task.priorite === 'haute' ? 'Haute' :
                           task.priorite === 'moyenne' ? 'Moyenne' : 'Faible'}
                        </span></span>
                        {task.dateEcheance && (
                          <span>Échéance: {new Date(task.dateEcheance).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {tasks.length > 5 && (
                    <button
                      onClick={() => setActiveSection('tasks')}
                      className="text-blue-400 hover:text-blue-300 text-sm font-medium mt-2"
                    >
                      Voir toutes les tâches ({tasks.length})
                    </button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-300">Aucune tâche assignée</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Task Form Modal */}
      {(showTaskForm || editingTask) && (
        <TaskForm
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          task={editingTask}
          loading={false}
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
};

export default Home;
