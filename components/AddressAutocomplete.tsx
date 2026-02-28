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
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({ label, placeholder, name, value, onChange, error }) => {
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

    const fetchAddresses = async (query: string) => {
        if (!query || query.length < 3) {
            setSuggestions([]);
            return;
        }

        // We try to prioritize addresses in the VAR (83) and PACA region, but allow all of France
        try {
            const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5&autocomplete=1`);
            const data = await response.json();
            if (data && data.features) {
                setSuggestions(data.features);
                setShowSuggestions(true);
            }
        } catch (e) {
            console.error("Erreur lors de la recherche d'adresse", e);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e); // Propagate up
        fetchAddresses(e.target.value);
    };

    const handleSelectSuggestion = (suggestion: AddressFeature) => {
        // Create a synthetic event to trigger the original onChange handler
        const syntheticEvent = {
            target: { name, value: suggestion.properties.label }
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
        setShowSuggestions(false);
    };

    return (
        <div className="space-y-2 relative" ref={wrapperRef}>
            <label className="text-[10px] uppercase tracking-widest text-white/40 font-bold">
                {label}
            </label>
            <input
                type="text"
                name={name}
                value={value}
                onChange={handleInputChange}
                onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                placeholder={placeholder}
                className={`w-full bg-white/5 border-b ${error ? 'border-red-500' : 'border-white/10'} py-3 px-4 text-white focus:outline-none focus:border-gold transition-colors`}
                autoComplete="off"
            />
            {error && <p className="text-red-400 text-xs">{error}</p>}

            {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-50 w-full bg-[#1a1a2e] border border-white/10 shadow-2xl rounded-b-md max-h-60 overflow-y-auto mt-1 backdrop-blur-md">
                    {suggestions.map((suggestion) => (
                        <li
                            key={suggestion.properties.id}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            className="px-4 py-3 cursor-pointer hover:bg-white/10 text-sm text-white/90 border-b border-white/5 last:border-b-0 transition-colors"
                        >
                            <div className="font-medium text-white">{suggestion.properties.name}</div>
                            <div className="text-xs text-white/50">{suggestion.properties.postcode} {suggestion.properties.city}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AddressAutocomplete;
