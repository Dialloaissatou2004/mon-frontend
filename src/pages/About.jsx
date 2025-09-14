import React from 'react';
import { useMembers } from '../hooks/useMembers';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const About = () => {
  const { isAuthenticated } = useAuth();
  const { members, loading, error } = useMembers(isAuthenticated);

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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="mb-12 relative">
            <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl mb-8 shadow-2xl animate-float relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-50 animate-pulse"></div>
              <svg className="w-14 h-14 text-white relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-purple-200 mb-8 leading-tight">
            À propos de
            <span className="block text-4xl md:text-5xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mt-4 font-light">
              TaskFlow Professional
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            Une plateforme révolutionnaire de gestion d'équipe et de tâches conçue pour transformer votre productivité.
            <span className="block mt-2 text-lg text-slate-400">Innovation • Performance • Excellence</span>
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6">Notre Mission</h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Task Manager Pro a été conçu pour simplifier la gestion de vos tâches quotidiennes en entreprise. 
            Notre objectif est de vous fournir un outil puissant mais simple d'utilisation 
            qui vous aide à rester organisé et productif dans un environnement professionnel.
          </p>
          
          <h2 className="text-2xl font-semibold text-white mb-6">Fonctionnalités Principales</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mr-4 border border-blue-500/30">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Création de tâches</h3>
                <p className="text-slate-300 text-sm">
                  Créez facilement de nouvelles tâches avec titre, description, priorité et échéance.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-4 border border-green-500/30">
                <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Suivi des statuts</h3>
                <p className="text-slate-300 text-sm">
                  Suivez l'avancement de vos tâches : à faire, en cours, terminé.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-4 border border-yellow-500/30">
                <svg className="w-4 h-4 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Gestion des priorités</h3>
                <p className="text-slate-300 text-sm">
                  Définissez des niveaux de priorité pour organiser vos tâches importantes.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mr-4 border border-purple-500/30">
                <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">Filtrage et tri</h3>
                <p className="text-slate-300 text-sm">
                  Filtrez et triez vos tâches selon différents critères pour une meilleure organisation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6">Technologies Utilisées</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-blue-500/30">
                <span className="text-2xl font-bold text-blue-400">R</span>
              </div>
              <h3 className="font-semibold text-white">React</h3>
              <p className="text-sm text-slate-300">Interface utilisateur</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-purple-500/30">
                <span className="text-2xl font-bold text-purple-400">V</span>
              </div>
              <h3 className="font-semibold text-white">Vite</h3>
              <p className="text-sm text-slate-300">Build tool</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-cyan-500/30">
                <span className="text-2xl font-bold text-cyan-400">T</span>
              </div>
              <h3 className="font-semibold text-white">Tailwind</h3>
              <p className="text-sm text-slate-300">Styles CSS</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-3 border border-green-500/30">
                <span className="text-2xl font-bold text-green-400">N</span>
              </div>
              <h3 className="font-semibold text-white">Node.js</h3>
              <p className="text-sm text-slate-300">Backend API</p>
            </div>
          </div>
        </div>

        {/* Members List - Always visible with debug info */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-6">Notre Équipe</h2>
          
          {/* Debug info */}
          <div className="mb-4 text-sm text-slate-400">
            <p>Authentifié: {isAuthenticated ? 'Oui' : 'Non'}</p>
            <p>Chargement: {loading ? 'Oui' : 'Non'}</p>
            <p>Nombre de membres: {Array.isArray(members) ? members.length : 'N/A'}</p>
            {error && <p>Erreur: {error.message}</p>}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
            </div>
          ) : Array.isArray(members) && members.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {members.map((member) => (
                <div key={member._id} className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="w-16 h-16 mx-auto mb-4 relative">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.nom || 'Membre'}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                        onError={(e) => {
                          // Fallback to gradient avatar if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center ${
                        member.photo ? 'hidden' : 'flex'
                      }`}
                    >
                      <span className="text-white text-xl font-bold">
                        {member.nom ? member.nom.charAt(0).toUpperCase() : member.email ? member.email.charAt(0).toUpperCase() : '?'}
                      </span>
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
              <p className="text-slate-400 mb-4">
                {!isAuthenticated 
                  ? "Veuillez vous connecter pour voir l'équipe" 
                  : "Aucun membre trouvé."
                }
              </p>
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg"
                >
                  Se connecter
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Contact */}
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm rounded-xl shadow-2xl p-8 text-center border border-white/20">
          <h2 className="text-2xl font-semibold text-white mb-4">Besoin d'aide ?</h2>
          <p className="mb-6 text-slate-300">
            Si vous avez des questions ou des suggestions, n'hésitez pas à nous contacter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@taskmanager.com"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Nous contacter
            </a>
            <a
              href="#"
              className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
            >
              Documentation
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
