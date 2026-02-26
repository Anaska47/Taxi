import React, { useState } from 'react';

interface Department {
    id: string;
    name: string;
    capital: string;
    path: string;
    labelX: number;
    labelY: number;
}

const departments: Department[] = [
    {
        id: '05',
        name: 'Hautes-Alpes',
        capital: 'Gap',
        labelX: 340,
        labelY: 95,
        path: 'M310,30 L360,20 L420,55 L430,90 L400,130 L360,145 L320,130 L290,100 Z',
    },
    {
        id: '04',
        name: 'Alpes-de-Haute-Provence',
        capital: 'Digne-les-Bains',
        labelX: 355,
        labelY: 210,
        path: 'M290,100 L360,145 L400,130 L430,90 L470,120 L480,175 L440,220 L390,250 L340,240 L300,205 L270,165 Z',
    },
    {
        id: '06',
        name: 'Alpes-Maritimes',
        capital: 'Nice',
        labelX: 490,
        labelY: 225,
        path: 'M440,220 L480,175 L520,160 L560,175 L570,215 L550,255 L510,270 L470,260 L445,240 Z',
    },
    {
        id: '84',
        name: 'Vaucluse',
        capital: 'Avignon',
        labelX: 200,
        labelY: 215,
        path: 'M130,160 L175,145 L230,155 L270,165 L275,200 L240,235 L195,245 L150,235 L120,205 Z',
    },
    {
        id: '13',
        name: 'Bouches-du-Rhône',
        capital: 'Marseille',
        labelX: 210,
        labelY: 320,
        path: 'M120,205 L150,235 L195,245 L240,235 L260,270 L245,310 L210,340 L165,350 L130,330 L100,295 L105,255 Z',
    },
    {
        id: '83',
        name: 'Var',
        capital: 'Toulon',
        labelX: 360,
        labelY: 330,
        path: 'M260,270 L300,205 L340,240 L390,250 L430,260 L445,240 L470,260 L480,300 L455,340 L400,360 L345,365 L290,350 L255,315 Z',
    },
];

const PacaMap: React.FC = () => {
    const [hovered, setHovered] = useState<string | null>(null);
    const [tooltip, setTooltip] = useState<{ x: number; y: number; dept: Department } | null>(null);

    const handleMouseEnter = (dept: Department, e: React.MouseEvent<SVGPathElement>) => {
        setHovered(dept.id);
        const rect = (e.currentTarget.closest('svg') as SVGSVGElement).getBoundingClientRect();
        setTooltip({ x: dept.labelX, y: dept.labelY - 30, dept });
    };

    const handleMouseLeave = () => {
        setHovered(null);
        setTooltip(null);
    };

    return (
        <div className="paca-map-container">
            <svg
                viewBox="80 10 510 375"
                className="paca-map-svg"
                aria-label="Carte interactive de la région PACA"
            >
                {/* Sea / Coastal gradient background */}
                <defs>
                    <linearGradient id="seaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="70%" stopColor="transparent" />
                        <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.6" />
                    </linearGradient>
                    <filter id="mapShadow">
                        <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="#1a365d" floodOpacity="0.2" />
                    </filter>
                </defs>

                {/* Coastal sea effect */}
                <rect x="80" y="300" width="510" height="90" fill="url(#seaGradient)" rx="8" />

                {/* Department paths */}
                {departments.map((dept, i) => {
                    const isHovered = hovered === dept.id;
                    const isOtherHovered = hovered !== null && !isHovered;
                    return (
                        <g
                            key={dept.id}
                            className="paca-dept-group"
                            style={{ animationDelay: `${i * 0.08}s` }}
                        >
                            <path
                                d={dept.path}
                                className="paca-dept-path"
                                fill={isHovered ? '#1a365d' : '#bfdbfe'}
                                stroke="#ffffff"
                                strokeWidth="2"
                                strokeLinejoin="round"
                                opacity={isOtherHovered ? 0.4 : 1}
                                filter={isHovered ? 'url(#mapShadow)' : undefined}
                                onMouseEnter={(e) => handleMouseEnter(dept, e)}
                                onMouseLeave={handleMouseLeave}
                                style={{
                                    transition: 'fill 0.3s ease, opacity 0.3s ease',
                                    cursor: 'pointer',
                                }}
                            />
                            <text
                                x={dept.labelX}
                                y={dept.labelY}
                                textAnchor="middle"
                                className="paca-dept-label"
                                fill={isHovered ? '#ffffff' : '#1e40af'}
                                fontSize="13"
                                fontFamily="'Inter', sans-serif"
                                fontWeight="800"
                                style={{ pointerEvents: 'none', transition: 'fill 0.3s ease', userSelect: 'none' }}
                            >
                                {dept.id}
                            </text>
                        </g>
                    );
                })}

                {/* Tooltip */}
                {tooltip && (
                    <g style={{ pointerEvents: 'none' }}>
                        <rect
                            x={tooltip.x - 62}
                            y={tooltip.y - 24}
                            width={124}
                            height={36}
                            rx={8}
                            fill="#0a0f1a"
                            opacity={0.97}
                        />
                        {/* Pointer triangle */}
                        <polygon
                            points={`${tooltip.x - 6},${tooltip.y + 12} ${tooltip.x + 6},${tooltip.y + 12} ${tooltip.x},${tooltip.y + 22}`}
                            fill="#0f2240"
                            opacity={0.97}
                        />
                        <text
                            x={tooltip.x}
                            y={tooltip.y - 6}
                            textAnchor="middle"
                            fill="white"
                            fontSize="9.5"
                            fontFamily="'Inter', sans-serif"
                            fontWeight="800"
                            letterSpacing="0.1em"
                            style={{ textTransform: 'uppercase' }}
                        >
                            {tooltip.dept.id} • {tooltip.dept.name}
                        </text>
                        <text
                            x={tooltip.x}
                            y={tooltip.y + 7}
                            textAnchor="middle"
                            fill="rgba(144,205,244,0.75)"
                            fontSize="8"
                            fontFamily="'Inter', sans-serif"
                            fontWeight="500"
                        >
                            {tooltip.dept.capital}
                        </text>
                    </g>
                )}
            </svg>

            {/* Bottom legend dots */}
            <div className="paca-map-legend">
                {departments.map((dept) => (
                    <div
                        key={dept.id}
                        className={`paca-legend-item ${hovered === dept.id ? 'active' : ''}`}
                        onMouseEnter={() => setHovered(dept.id)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        <span className="paca-legend-dot"></span>
                        <span className="paca-legend-text">{dept.id}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PacaMap;
