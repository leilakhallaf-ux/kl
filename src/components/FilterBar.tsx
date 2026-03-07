import { useState, useEffect, useRef } from 'react';
import { ChevronDown, X } from 'lucide-react';

interface FilterBarProps {
  onFilterChange: (filters: Filters) => void;
  options: {
    advertisers: string[];
    vintages: number[];
    agencies: string[];
    distributors: string[];
    technologies: string[];
    topics: string[];
  };
}

export interface Filters {
  advertisers: string[];
  vintages: number[];
  agencies: string[];
  distributors: string[];
  technologies: string[];
  topics: string[];
}

interface DropdownProps {
  label: string;
  options: (string | number)[];
  selected: (string | number)[];
  onToggle: (value: string | number) => void;
  onClear: () => void;
}

function FilterDropdown({ label, options, selected, onToggle, onClear }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-4 py-2 rounded-sm border transition-all duration-300 flex items-center gap-2 ${
          selected.length > 0
            ? 'bg-brand-gold/20 border-brand-gold text-brand-gold'
            : 'bg-gray-900/50 border-gray-700 text-gray-300 hover:border-brand-gold/50'
        }`}
      >
        <span className="text-sm font-light">
          {label}
          {selected.length > 0 && ` (${selected.length})`}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-900 border border-brand-gold/30 rounded-sm shadow-xl z-50 max-h-96 overflow-y-auto">
          {selected.length > 0 && (
            <button
              onClick={onClear}
              className="w-full px-4 py-2 text-left text-sm text-brand-gold hover:bg-brand-gold/10 flex items-center gap-2 border-b border-gray-800"
            >
              <X className="w-3 h-3" />
              Tout effacer
            </button>
          )}
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-3 px-4 py-2 hover:bg-brand-gold/10 cursor-pointer transition-colors"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => onToggle(option)}
                className="w-4 h-4 rounded border-gray-600 text-brand-gold focus:ring-brand-gold focus:ring-offset-0 bg-gray-800"
              />
              <span className="text-sm text-gray-300">{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FilterBar({ onFilterChange, options }: FilterBarProps) {
  const [filters, setFilters] = useState<Filters>({
    advertisers: [],
    vintages: [],
    agencies: [],
    distributors: [],
    technologies: [],
    topics: [],
  });

  useEffect(() => {
    onFilterChange(filters);
  }, [filters]);

  const handleToggle = (category: keyof Filters, value: string | number) => {
    setFilters((prev) => {
      const currentValues = prev[category] as (string | number)[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      return { ...prev, [category]: newValues };
    });
  };

  const handleClear = (category: keyof Filters) => {
    setFilters((prev) => ({ ...prev, [category]: [] }));
  };

  const clearAllFilters = () => {
    setFilters({
      advertisers: [],
      vintages: [],
      agencies: [],
      distributors: [],
      technologies: [],
      topics: [],
    });
  };

  const hasActiveFilters = Object.values(filters).some((f) => f.length > 0);

  return (
    <div className="sticky top-0 z-40 bg-brand-black/95 backdrop-blur-sm border-b border-brand-gold/20 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-gray-400 font-light">Filtres :</span>

          <FilterDropdown
            label="Annonceur"
            options={options.advertisers}
            selected={filters.advertisers}
            onToggle={(value) => handleToggle('advertisers', value)}
            onClear={() => handleClear('advertisers')}
          />

          <FilterDropdown
            label="Millésime"
            options={options.vintages}
            selected={filters.vintages}
            onToggle={(value) => handleToggle('vintages', value)}
            onClear={() => handleClear('vintages')}
          />

          <FilterDropdown
            label="Agence"
            options={options.agencies}
            selected={filters.agencies}
            onToggle={(value) => handleToggle('agencies', value)}
            onClear={() => handleClear('agencies')}
          />

          <FilterDropdown
            label="Diffuseur"
            options={options.distributors}
            selected={filters.distributors}
            onToggle={(value) => handleToggle('distributors', value)}
            onClear={() => handleClear('distributors')}
          />

          <FilterDropdown
            label="Techno"
            options={options.technologies}
            selected={filters.technologies}
            onToggle={(value) => handleToggle('technologies', value)}
            onClear={() => handleClear('technologies')}
          />

          <FilterDropdown
            label="Thème"
            options={options.topics}
            selected={filters.topics}
            onToggle={(value) => handleToggle('topics', value)}
            onClear={() => handleClear('topics')}
          />

          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="ml-auto px-4 py-2 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold rounded-sm hover:bg-brand-gold/20 transition-colors duration-300 text-sm flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Tout effacer
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
