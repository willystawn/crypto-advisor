import React from 'react';
import type { Recommendation } from '../types';
import { CheckCircleIcon, LightBulbIcon } from './Icons';

interface ResultCardProps {
  recommendation: Recommendation;
}

export default function ResultCard({ recommendation }: ResultCardProps): React.ReactNode {
  return (
    <div className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl animate-fade-in w-full">
        {/* Header with Frequency */}
        <div className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/20 relative">
            <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {recommendation.frequency}
            </span>
            <p className="text-sm text-blue-300 font-semibold">Recommendation</p>
            <p className="text-2xl font-bold text-white mt-1">Action Plan</p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
            {/* Actions Section */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-slate-200">To-Do</h3>
                </div>
                <ul className="space-y-3">
                    {recommendation.actions.map((action, index) => (
                        <li key={index} className="flex items-start gap-3">
                            <CheckCircleIcon />
                            <span className="flex-1 text-slate-300">{action}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Separator */}
            <div className="border-t border-slate-700/80"></div>

            {/* Reasoning Section */}
            <div>
                <div className="flex items-center gap-3 mb-3">
                    <LightBulbIcon />
                    <h3 className="text-lg font-semibold text-slate-200">Why?</h3>
                </div>
                <blockquote className="border-l-4 border-yellow-500 pl-4 space-y-2 text-slate-400">
                    {recommendation.reasoning.map((point, index) => (
                        <p key={index}>{point}</p>
                    ))}
                </blockquote>
            </div>
        </div>
        
        {/* Animation Style */}
        <style>
        {`
            @keyframes fade-in {
                from { opacity: 0; transform: scale(0.95) translateY(10px); }
                to { opacity: 1; transform: scale(1) translateY(0); }
            }
            .animate-fade-in {
                animation: fade-in 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
            }
        `}
        </style>
    </div>
  );
}