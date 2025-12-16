import React, { useMemo } from 'react';
import { Agent } from '../types';

interface SidebarProps {
  agents: Agent[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClearTags: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  agents,
  selectedTags,
  onToggleTag,
  onClearTags,
  isOpen,
  setIsOpen,
}) => {
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    agents.forEach((agent) => {
      agent.tags.forEach((tag) => {
        if (tag && tag.trim() !== "") {
          tags.add(tag.trim());
        }
      });
    });
    return Array.from(tags).sort();
  }, [agents]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-prompty-black border-r border-white/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto lg:min-h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-6 lg:hidden">
            <h2 className="text-xl font-bold text-prompty-white">Filtres</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-prompty-white"
            >
              ✕
            </button>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Catégories
              </h3>
              {selectedTags.length > 0 && (
                <button
                  onClick={onClearTags}
                  className="text-xs text-prompty-gold hover:text-prompty-bright font-medium transition-colors"
                >
                  Tout effacer
                </button>
              )}
            </div>
            <div className="space-y-1">
              {allTags.map((tag) => (
                <label
                  key={tag}
                  className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-white/5 transition-all duration-200"
                >
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="peer h-4 w-4 rounded border-gray-600 bg-white/5 text-prompty-gold focus:ring-prompty-gold focus:ring-offset-prompty-black cursor-pointer"
                      checked={selectedTags.includes(tag)}
                      onChange={() => onToggleTag(tag)}
                    />
                  </div>
                  <span className={`text-sm transition-colors select-none ${
                    selectedTags.includes(tag) ? 'text-prompty-bright font-medium' : 'text-gray-400 group-hover:text-gray-200'
                  }`}>
                    {tag}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;