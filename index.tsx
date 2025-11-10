// FIX: Import React and ReactDOM to resolve 'Cannot find name' errors.
import React from 'react';
import ReactDOM from 'react-dom/client';

// All components are in this single file, no imports/exports needed.
// TypeScript types have been removed.

const Die = ({ isRolling, result }) => {
  const dieContent = isRolling ? '...' : (result !== null ? result : '🎲');

  return (
    <div className="w-40 h-40 sm:w-48 sm:h-48 perspective-1000 mb-4 z-10">
      <div
        className={`w-full h-full relative transform-style-preserve-3d ${
          isRolling ? 'animate-roll' : ''
        }`}
      >
        <div className="absolute w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 rounded-3xl shadow-2xl shadow-indigo-500/30 border-2 border-indigo-400/50">
          <span 
            className="text-6xl sm:text-7xl font-bold text-white tracking-tighter transition-opacity duration-300" 
            style={{ textShadow: '0 0 15px rgba(255,255,255,0.5)' }}
          >
            {dieContent}
          </span>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [result, setResult] = React.useState(null);
  const [isRolling, setIsRolling] = React.useState(false);

  const handleRoll = React.useCallback(() => {
    if (isRolling) return;

    setIsRolling(true);
    setResult(null); // Clear previous result to show rolling state

    // Set a timeout to match the animation duration
    setTimeout(() => {
      const newResult = Math.floor(Math.random() * 10) + 1;
      setResult(newResult);
      setIsRolling(false);
    }, 2000); // Must match the 2s animation time
  }, [isRolling]);

  return (
    <main className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4 font-sans overflow-hidden">
      <div className="text-center mb-8 z-10">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
          Rolador de Dado D10 3D
        </h1>
        <p className="text-slate-400 mt-2 max-w-md">
          Clique no botão para rolar o dado virtual de 10 lados e ver a mágica acontecer.
        </p>
      </div>

      <Die isRolling={isRolling} result={result} />
      
      <div className="flex flex-col items-center w-full max-w-xs z-10">
         <div className="h-24 flex items-center justify-center">
            {result !== null && !isRolling && (
                <p className="text-8xl font-bold text-cyan-300 animate-pulse" style={{textShadow: '0 0 20px rgba(56, 189, 248, 0.5)'}}>
                    {result}
                </p>
            )}
         </div>
        
        <button
          onClick={handleRoll}
          disabled={isRolling}
          className="w-full px-8 py-4 bg-indigo-600 text-white font-bold text-lg rounded-lg shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transform hover:scale-105 transition-all duration-300 ease-in-out disabled:bg-slate-700 disabled:shadow-none disabled:cursor-not-allowed disabled:transform-none"
        >
          {isRolling ? 'Rolando...' : 'Rolar o Dado'}
        </button>
      </div>

      <footer className="absolute bottom-4 text-slate-500 text-sm z-10">
        Criado com React, Tailwind CSS & Gemini
      </footer>
    </main>
  );
};

// Rendering the app
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);