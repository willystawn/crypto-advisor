import React from 'react';
import { RobotIcon } from './Icons';

export default function Header(): React.ReactNode {
  return (
    <header className="text-left">
        <div className="flex items-center gap-4">
            <div className="inline-block bg-slate-800 p-3 rounded-full border-2 border-slate-700">
                <RobotIcon />
            </div>
            <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                    Airdrop Advisor
                </h1>
                <p className="mt-1 text-md text-slate-400">
                    Your AI guide for maximizing airdrop rewards.
                </p>
            </div>
        </div>
    </header>
  );
}