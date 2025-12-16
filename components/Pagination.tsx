import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-4 mt-12 mb-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2.5 rounded-xl border border-prompty-pale/50 bg-prompty-pale text-prompty-black hover:bg-prompty-hover hover:border-prompty-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:border-gray-700 disabled:text-gray-400 transition-all duration-200 shadow-md shadow-prompty-pale/20"
      >
        <ChevronLeft size={20} />
      </button>
      
      <span className="text-sm font-medium text-gray-400 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
        Page <span className="text-prompty-pale font-bold">{currentPage}</span> sur <span className="text-prompty-white font-bold">{totalPages}</span>
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2.5 rounded-xl border border-prompty-pale/50 bg-prompty-pale text-prompty-black hover:bg-prompty-hover hover:border-prompty-hover disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-700 disabled:border-gray-700 disabled:text-gray-400 transition-all duration-200 shadow-md shadow-prompty-pale/20"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;