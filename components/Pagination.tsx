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
    <div className="flex justify-center items-center space-x-4 mt-16 mb-12">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-3 rounded-lg border border-gray-200 bg-white text-cia-main hover:bg-gray-50 hover:border-cia-main/50 disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-200 transition-all duration-200 shadow-sm"
      >
        <ChevronLeft size={20} />
      </button>
      
      <div className="text-sm font-heading font-medium text-cia-gray-1 bg-white px-6 py-3 rounded-lg border border-gray-200 tracking-wide shadow-sm">
        PAGE <span className="text-cia-main font-bold mx-1">{currentPage}</span> / <span className="text-cia-text font-bold mx-1">{totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-3 rounded-lg border border-gray-200 bg-white text-cia-main hover:bg-gray-50 hover:border-cia-main/50 disabled:opacity-30 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:border-gray-200 transition-all duration-200 shadow-sm"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;