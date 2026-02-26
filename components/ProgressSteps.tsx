import React from 'react';

interface ProgressStepsProps {
    currentStep: number;
    steps: string[];
}

const ProgressSteps: React.FC<ProgressStepsProps> = ({ currentStep, steps }) => {
    const progressWidth = ((currentStep - 1) / (steps.length - 1)) * 100;

    return (
        <div className="progress-container">
            <div
                className="progress-bar"
                style={{ '--progress-width': `${progressWidth}%` } as React.CSSProperties}
            ></div>
            {steps.map((label, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;

                return (
                    <div key={index} className="step-item">
                        <div className={`step-dot ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                            {isCompleted ? '✓' : stepNumber}
                        </div>
                        <span className={`step-label ${isActive ? 'active' : ''}`}>
                            {label}
                        </span>
                    </div>
                );
            })}
        </div>
    );
};

export default ProgressSteps;
