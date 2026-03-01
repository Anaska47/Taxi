import React, { useState, useEffect, useRef } from 'react';

interface AddressFeature {
    properties: {
        id: string;
        label: string;
        score: number;
        name: string;
        postcode: string;
        city: string;
        context: string;
        type: string;
    };
}

interface AddressAutocompleteProps {
    label: string;
    placeholder: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    variant?: 'dark' | 'light';
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ label, placeholder, name, value, onChange, error, variant = 'dark' }) => {
    const [suggestions, setSuggestions] = useState<AddressFeature[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    const fetchAddresses = async (query: string) => {
        if (!query || query.length < 3) {
            setSuggestions([]);
            return;
        }

        try {
            const url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5&autocomplete=1`;
            const response = await fetch(url);

            if (!response.ok) throw new Error("API call failed");

            const data = await response.json();

            if (data && data.features) {
                setSuggestions(data.features);
                setShowSuggestions(true);
            }
        } catch (e) {
            setSuggestions([]);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange(e);

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            fetchAddresses(value);
        }, 300);
    };

    const handleSelectSuggestion = (suggestion: AddressFeature) => {
        const syntheticEvent = {
            target: { name, value: suggestion.properties.label }
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
        setShowSuggestions(false);
    };

    const isLight = variant === 'light';

    return (
        <div className="space-y-2 relative" ref={wrapperRef}>
            <label className={`text-[10px] uppercase tracking-widest font-bold ${isLight ? 'text-gray-400' : 'text-white/40'}`}>
                {label}
            </label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={handleInputChange}
                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                placeholder={placeholder}
                className={isLight ?
                    `w-full bg-[#f7f9fc] border ${error ? 'border-red-500' : 'border-gray-200'} rounded-lg py-4 px-5 text-gray-900 focus:outline-none focus:border-navy transition-all` :
                    `w-full bg-white/5 border-b ${error ? 'border-red-500' : 'border-white/10'} py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors`
                }
                autoComplete="off"
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}

            {showSuggestions && suggestions.length > 0 && (
                <ul className={`absolute z-[100] w-full border shadow-2xl rounded-xl max-h-64 overflow-y-auto mt-2 backdrop-blur-md ${isLight ? 'bg-white border-gray-100' : 'bg-[#1a1a2e] border-white/10'}`}>
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.properties.id}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            className={`px-5 py-4 cursor-pointer border-b last:border-b-0 transition-colors ${isLight ? 'hover:bg-gray-50 border-gray-50' : 'hover:bg-white/10 border-white/5'}`}
                        >
                            <div className={`font-bold text-sm ${isLight ? 'text-navy' : 'text-white'}`}>{suggestion.properties.name}</div>
                            <div className={`text-xs ${isLight ? 'text-gray-400' : 'text-white/50'}`}>{suggestion.properties.postcode} {suggestion.properties.city}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressAutocomplete;
