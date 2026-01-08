import React, { useState, useMemo, useEffect } from 'react';
import { Menu, Search, Github, X, Database } from 'lucide-react';
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
    <div className="min-h-screen bg-white flex flex-col text-cia-text font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Area */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 -ml-2 mr-3 text-cia-gray-1 hover:text-cia-main lg:hidden transition-colors"
              >
                <Menu size={24} />
              </button>
              <div className="flex items-center gap-3 group cursor-pointer">
                {/* Logo Icon using CIA colors */}
                <div className="w-10 h-10 bg-cia-main rounded-lg flex items-center justify-center shadow-lg shadow-cia-main/20">
                   <Database className="text-white" size={20} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <h1 className="text-xl font-heading font-bold text-cia-main tracking-widest leading-none">
                    AGENCE CIA
                  </h1>
                  <span className="text-[10px] font-heading font-semibold text-cia-cyan tracking-[0.2em] uppercase mt-1">
                    Base de PromptyBot
                  </span>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} className="text-cia-gray-3 group-focus-within:text-cia-main transition-colors" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-cia-text placeholder-cia-gray-3 focus:outline-none focus:bg-white focus:border-cia-main focus:ring-1 focus:ring-cia-main sm:text-sm transition-all duration-200 font-sans shadow-inner"
                  placeholder="Rechercher une ressource IA..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>

             <div className="flex items-center space-x-4">
               <a 
                href="#" 
                className="text-cia-gray-1 hover:text-cia-main transition-colors hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-cia-main/30 hover:bg-gray-50"
               >
                 <Github size={18} />
                 <span className="text-sm font-medium">Contribuer</span>
               </a>
            </div>
          </div>
          {/* Mobile Search Bar */}
          <div className="pb-4 md:hidden">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-cia-gray-3" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg leading-5 bg-gray-50 text-cia-text placeholder-cia-gray-3 focus:outline-none focus:bg-white focus:border-cia-main sm:text-sm"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-[1600px] mx-auto w-full pt-8">
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
        <main className="flex-1 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
          <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-gray-200 pb-8">
            <div>
              <h2 className="text-4xl font-heading font-bold text-cia-main tracking-tight mb-2">
                Annuaire IA
              </h2>
              <p className="text-cia-gray-1 text-lg font-light">
                Explorez notre collection de <span className="text-cia-cyan font-semibold">{filteredAgents.length}</span> outil{filteredAgents.length > 1 ? 's' : ''} d'intelligence artificielle
              </p>
            </div>
            {hasActiveFilters && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-5 py-2.5 bg-cia-main hover:bg-cia-mid text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-cia-main/20 transform hover:-translate-y-0.5"
              >
                <X size={18} />
                EFFACER LES FILTRES
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
            <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
              <div className="w-20 h-20 rounded-full bg-white border border-gray-200 flex items-center justify-center mb-6 shadow-sm">
                <Search size={32} className="text-cia-gray-3" />
              </div>
              <p className="text-cia-main font-heading text-xl font-medium mb-2">Aucun résultat trouvé</p>
              <p className="text-cia-gray-1 text-sm mb-8">Essayez d'autres mots-clés ou supprimez les filtres.</p>
              <button 
                onClick={handleClearAll}
                className="px-6 py-3 bg-cia-main hover:bg-cia-mid text-white rounded-lg font-bold transition-colors uppercase tracking-wide text-sm"
              >
                Réinitialiser tout
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