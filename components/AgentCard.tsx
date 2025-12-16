import React from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  // Simple validation to ensure name is present
  if (!agent.name.trim()) return null;

  return (
    <div className="bg-white/5 rounded-xl border border-white/10 p-5 flex flex-col h-full hover:border-prompty-gold/50 hover:shadow-lg hover:shadow-prompty-gold/10 hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-prompty-gold/5 blur-2xl rounded-full -mr-12 -mt-12 pointer-events-none group-hover:bg-prompty-gold/10 transition-colors duration-500"></div>

      <div className="flex justify-between items-start mb-3 relative z-10">
        <h3 className="text-lg font-bold text-prompty-white group-hover:text-prompty-bright transition-colors line-clamp-1 pr-2">
          {agent.name}
        </h3>
        {agent.url && (
          <a
            href={agent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-prompty-gold hover:bg-white/10 p-1.5 rounded-lg transition-all"
            title="Visiter le site"
          >
            <ExternalLink size={16} />
          </a>
        )}
      </div>

      <div className="flex-grow relative z-10">
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-4 group-hover:text-gray-300 transition-colors">
          {agent.description || "Aucune description disponible."}
        </p>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 relative z-10">
        <div className="flex flex-wrap gap-2">
          {agent.tags.filter(t => t.trim() !== "").map((tag, idx) => (
            <span
              key={`${tag}-${idx}`}
              className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/5 text-gray-300 border border-white/5 group-hover:border-prompty-gold/30 group-hover:text-prompty-bright transition-colors cursor-default"
            >
              <Tag size={10} className="mr-1.5 opacity-70" />
              {tag}
            </span>
          ))}
          {agent.tags.every(t => t.trim() === "") && (
             <span className="text-xs text-gray-600 italic">Non classé</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentCard;