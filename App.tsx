import React, { useState, useCallback, useRef } from 'react';
import { getAirdropRecommendation } from './services/geminiService';
import type { Recommendation } from './types';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import ResultCard from './components/ResultCard';
import { SparklesIcon, ExclamationTriangleIcon, AIBrainIcon } from './components/Icons';

const examples = ["ZkSync daily transactions", "LayerZero bridging", "Starknet wallet activity"];

export default function App(): React.ReactNode {
  const [projectDescription, setProjectDescription] = useState<string>('');
  const [result, setResult] = useState<Recommendation | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const isLoadingRef = useRef(isLoading);
  isLoadingRef.current = isLoading;

  const fetchRecommendation = useCallback(async (description: string) => {
    if (isLoadingRef.current) return;
    if (!description.trim()) {
      setError('Please describe the project or task first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const apiResult = await getAirdropRecommendation(description);
      setResult(apiResult);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchRecommendation(projectDescription);
  }, [projectDescription, fetchRecommendation]);

  const handleExampleClick = useCallback((prompt: string) => {
    setProjectDescription(prompt);
    fetchRecommendation(prompt);
  }, [fetchRecommendation]);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-slate-900 text-slate-200 font-sans">
      {/* Left Panel: Input */}
      <div className="w-full lg:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
        <div className="w-full max-w-md mx-auto">
          <Header />
          <main className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="project-description" className="block text-lg font-medium text-slate-300 mb-2">
                  Project, Protocol, or Airdrop Task
                </label>
                <p className="text-sm text-slate-400 mb-4">
                  Enter a project name (e.g., "ZkSync", "LayerZero") or describe a task to get an AI-powered airdrop strategy.
                </p>
                <textarea
                  id="project-description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="e.g., 'How to get the ZkSync airdrop?' or 'Starknet wallet interactions'"
                  className="w-full h-48 p-3 bg-slate-800 border-2 border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none placeholder-slate-500 hide-scrollbar"
                  disabled={isLoading}
                  aria-describedby="form-help"
                />
              </div>
              
              <div>
                <p className="text-xs text-slate-500 mb-2 uppercase font-semibold tracking-wider">Or try an example:</p>
                <div className="flex flex-wrap gap-2">
                  {examples.map(ex => (
                    <button
                        key={ex}
                        type="button"
                        onClick={() => handleExampleClick(ex)}
                        disabled={isLoading}
                        className="px-3 py-1 text-sm bg-slate-700/50 text-slate-300 rounded-full hover:bg-slate-700 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {ex}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || !projectDescription.trim()}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-blue-500"
              >
                {isLoading ? (
                  <>
                    <LoadingSpinner />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <SparklesIcon />
                    <span>Get Recommendation</span>
                  </>
                )}
              </button>
            </form>
          </main>
        </div>
      </div>

      {/* Right Panel: Output */}
      <div className={`w-full lg:w-1/2 bg-slate-800/40 flex justify-center p-6 sm:p-8 lg:p-12 border-t-2 lg:border-t-0 lg:border-l-2 border-slate-700/50 lg:h-screen lg:overflow-y-auto ${!result ? 'items-center' : 'lg:items-start'}`}>
        <div className="w-full max-w-md py-8">
          {isLoading && (
            <div className="flex flex-col items-center justify-center text-center text-slate-400">
              <LoadingSpinner />
              <p className="mt-4 text-lg font-medium">AI is thinking...</p>
              <p className="text-sm">Analyzing your request.</p>
            </div>
          )}
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 p-6 rounded-lg flex flex-col items-center gap-4 text-center">
              <ExclamationTriangleIcon />
              <p className="font-semibold">Analysis Failed</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          {!isLoading && !error && result && (
            <ResultCard recommendation={result} />
          )}
          {!isLoading && !error && !result && (
            <div className="text-center text-slate-500">
              <AIBrainIcon />
              <h2 className="mt-6 text-xl font-semibold text-slate-400">Ready for your strategy?</h2>
              <p className="mt-2">Your AI-powered airdrop plan will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}