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
          className="fixed inset-0 bg-cia-text/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto lg:min-h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 h-full overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-8 lg:hidden">
            <h2 className="text-xl font-heading font-bold text-cia-main">Filtres</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-cia-gray-2 hover:text-cia-main"
            >
              ✕
            </button>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-end mb-6 border-b border-gray-200 pb-2">
              <h3 className="text-xs font-bold text-cia-main uppercase tracking-[0.2em] font-heading">
                Catégories
              </h3>
              {selectedTags.length > 0 && (
                <button
                  onClick={onClearTags}
                  className="text-[10px] text-cia-gray-2 hover:text-cia-cyan uppercase tracking-wider font-medium transition-colors"
                >
                  Tout effacer
                </button>
              )}
            </div>
            <div className="space-y-1">
              {allTags.map((tag) => (
                <label
                  key={tag}
                  className="flex items-center space-x-3 cursor-pointer group py-1.5 px-2 rounded hover:bg-gray-50 transition-all duration-200"
                >
                  <div className="relative flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="appearance-none h-4 w-4 rounded border border-gray-300 bg-white checked:bg-cia-main checked:border-cia-main focus:ring-1 focus:ring-cia-main/30 transition-all duration-200 cursor-pointer"
                      checked={selectedTags.includes(tag)}
                      onChange={() => onToggleTag(tag)}
                    />
                    {selectedTags.includes(tag) && (
                      <svg className="w-3 h-3 absolute text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className={`text-sm transition-colors select-none ${
                    selectedTags.includes(tag) ? 'text-cia-main font-bold' : 'text-cia-gray-1 group-hover:text-cia-text font-normal'
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