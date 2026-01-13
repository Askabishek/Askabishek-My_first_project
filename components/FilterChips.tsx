import React from 'react';
import { FilterType } from '../types';

interface FilterChipsProps {
  currentFilter: FilterType;
  setFilter: (filter: FilterType) => void;
  counts: { all: number; pending: number; completed: number };
}

export const FilterChips: React.FC<FilterChipsProps> = ({ currentFilter, setFilter, counts }) => {
  const chips = [
    { label: 'All', value: FilterType.ALL, count: counts.all },
    { label: 'Pending', value: FilterType.PENDING, count: counts.pending },
    { label: 'Done', value: FilterType.COMPLETED, count: counts.completed },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
      {chips.map((chip) => {
        const isActive = currentFilter === chip.value;
        return (
          <button
            key={chip.value}
            onClick={() => setFilter(chip.value)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap
              ${isActive 
                ? 'bg-secondaryContainer text-onPrimaryContainer border border-transparent shadow-sm' 
                : 'bg-transparent text-secondary border border-outline/30 hover:bg-surfaceContainerHigh'
              }
            `}
          >
            {isActive && <span className="material-symbols-outlined text-[18px]">check</span>}
            <span>{chip.label}</span>
            <span className={`text-xs ml-1 px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/50' : 'bg-outline/10'}`}>
              {chip.count}
            </span>
          </button>
        );
      })}
    </div>
  );
};