import React from 'react';
import { ExternalLink, Tag } from 'lucide-react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent }) => {
  if (!agent.name.trim()) return null;

  return (
    <div className="group relative flex flex-col h-full bg-white rounded-lg border border-gray-200 p-6 transition-all duration-300 hover:border-cia-main hover:ring-1 hover:ring-cia-main/20 hover:-translate-y-1 hover:shadow-xl hover:shadow-cia-main/5">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-heading font-bold text-cia-main group-hover:text-cia-mid transition-colors line-clamp-1 pr-4">
          {agent.name}
        </h3>
        {agent.url && (
          <a
            href={agent.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cia-gray-3 hover:text-cia-cyan transition-colors"
            title="Visiter le site"
          >
            <ExternalLink size={18} strokeWidth={2} />
          </a>
        )}
      </div>

      {/* Description */}
      <div className="flex-grow mb-6">
        <p className="text-cia-gray-1 text-sm leading-relaxed line-clamp-3 font-light">
          {agent.description || "Aucune description disponible."}
        </p>
      </div>

      {/* Footer / Tags */}
      <div className="mt-auto pt-4 border-t border-gray-100">
        <div className="flex flex-wrap gap-2">
          {agent.tags.filter(t => t.trim() !== "").slice(0, 3).map((tag, idx) => (
            <span
              key={`${tag}-${idx}`}
              className="inline-flex items-center px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-semibold bg-gray-100 text-cia-gray-2 border border-gray-200 group-hover:bg-cia-cyan/10 group-hover:text-cia-cyan group-hover:border-cia-cyan/20 transition-colors"
            >
              <Tag size={10} className="mr-1.5 opacity-70" />
              {tag}
            </span>
          ))}
          {agent.tags.filter(t => t.trim() !== "").length > 3 && (
            <span className="inline-flex items-center px-2 py-1 rounded text-[10px] text-cia-gray-3 bg-transparent border border-gray-200">
              +{agent.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgentCard;