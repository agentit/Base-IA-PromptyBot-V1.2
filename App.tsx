import React, { useState, useMemo, useEffect } from 'react';
import { Menu, Search, Github, X } from 'lucide-react';
import { AGENTS_DATA } from './data';
import AgentCard from './components/AgentCard';
import Sidebar from './components/Sidebar';
import Pagination from './components/Pagination';

const ITEMS_PER_PAGE = 24;

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Filter agents based on search and selected tags
  const filteredAgents = useMemo(() => {
    return AGENTS_DATA.filter((agent) => {
      // Basic data validation
      if (!agent.name || !agent.name.trim()) return false;

      const matchesSearch =
        agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (agent.description && agent.description.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => agent.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  // Pagination logic
  const totalPages = Math.ceil(filteredAgents.length / ITEMS_PER_PAGE);
  const paginatedAgents = filteredAgents.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleToggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleClearTags = () => {
    setSelectedTags([]);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setSearchQuery('');
    handleClearTags();
  };

  const hasActiveFilters = searchQuery.trim() !== '' || selectedTags.length > 0;

  return (
    <div className="min-h-screen bg-prompty-black flex flex-col text-prompty-white">
      {/* Header */}
      <header className="bg-prompty-black/90 backdrop-blur-md border-b border-white/10 sticky top-0 z-30 shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 mr-2 text-gray-400 hover:text-prompty-gold lg:hidden transition-colors"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 bg-gradient-to-br from-prompty-gold to-prompty-yellow rounded-xl flex items-center justify-center shadow-lg shadow-prompty-gold/20">
                  <span className="text-prompty-black font-bold text-lg">P</span>
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-prompty-white to-gray-400 uppercase">
                  LA BASE DE PROMPTYBOT
                </h1>
              </div>
            </div>

            <div className="flex-1 max-w-lg mx-4 hidden md:block">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-500 group-focus-within:text-prompty-gold transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2.5 border border-white/10 rounded-xl leading-5 bg-white/5 text-prompty-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-prompty-gold/50 focus:border-prompty-gold sm:text-sm transition-all duration-200"
                  placeholder="Rechercher un outil, une description..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

             <div className="flex items-center space-x-4">
               <a href="#" className="text-gray-400 hover:text-prompty-gold transition-colors hidden sm:block hover:bg-white/5 p-2 rounded-lg">
                 <Github size={20} />
               </a>
            </div>
          </div>
          {/* Mobile Search Bar */}
          <div className="pb-4 md:hidden">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-white/10 rounded-xl leading-5 bg-white/5 text-prompty-white placeholder-gray-500 focus:outline-none focus:bg-white/10 focus:border-prompty-gold sm:text-sm"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1600px] mx-auto w-full">
        {/* Sidebar */}
        <Sidebar
          agents={AGENTS_DATA}
          selectedTags={selectedTags}
          onToggleTag={handleToggleTag}
          onClearTags={handleClearTags}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <h2 className="text-3xl font-bold text-prompty-white tracking-tight">Annuaire IA</h2>
              <p className="text-gray-400 mt-2 text-sm sm:text-base">
                Explorez notre collection de {filteredAgents.length} outil{filteredAgents.length > 1 ? 's' : ''} d'intelligence artificielle
              </p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-4 py-2 bg-prompty-gold hover:bg-prompty-pale text-prompty-black rounded-lg text-sm font-bold transition-all shadow-lg shadow-prompty-gold/20 hover:shadow-prompty-gold/40 transform hover:-translate-y-0.5"
              >
                <X size={16} />
                Effacer les filtres
              </button>
            )}
          </div>

          {paginatedAgents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedAgents.map((agent) => (
                <AgentCard key={agent.id} agent={agent} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-2xl border border-dashed border-white/10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                <Search size={24} className="text-gray-400" />
              </div>
              <p className="text-gray-400 text-lg font-medium">Aucun résultat trouvé pour votre recherche.</p>
              <p className="text-gray-500 text-sm mt-2">Essayez d'autres mots-clés ou supprimez les filtres.</p>
              <button 
                onClick={handleClearAll}
                className="mt-6 px-4 py-2 bg-prompty-gold hover:bg-prompty-orange text-prompty-black rounded-lg font-bold transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
};

export default App;