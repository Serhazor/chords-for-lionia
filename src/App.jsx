import React, { useState } from 'react';

const App = () => {
  const [inputChords, setInputChords] = useState('Am, F, C, G, Dm, E');
  const [semitones, setSemitones] = useState(0);

  const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const noteAliases = {
    'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#'
  };

  const transposeNote = (note, steps) => {
    const normalizedNote = noteAliases[note] || note;
    const index = notes.indexOf(normalizedNote);
    if (index === -1) return note;
    const newIndex = (index + steps + 12) % 12;
    return notes[newIndex];
  };

  const transposeChord = (chord, steps) => {
    chord = chord.trim();
    if (!chord) return '';
    
    const chordRegex = /^([A-G][#b]?)(.*)/;
    const match = chord.match(chordRegex);
    
    if (!match) return chord;
    
    const [, rootNote, suffix] = match;
    const transposedRoot = transposeNote(rootNote, steps);
    return transposedRoot + suffix;
  };

  const parseAndTranspose = () => {
    if (!inputChords.trim()) return [];
    
    const chordArray = inputChords.split(',').map(c => c.trim()).filter(c => c);
    return chordArray.map(chord => transposeChord(chord, semitones));
  };

  const transposedChords = parseAndTranspose();

  const handleTranspose = (direction) => {
    setSemitones(prev => prev + direction);
  };

  const reset = () => {
    setSemitones(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 p-4 sm:p-8">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Manrope:wght@400;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Manrope', sans-serif;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -100% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        
        .chord-tag {
          animation: fadeInUp 0.4s ease-out backwards;
        }
        
        .title-gradient {
          background: linear-gradient(135deg, #92400e 0%, #ea580c 50%, #dc2626 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        .btn-transpose {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .btn-transpose::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .btn-transpose:active::before {
          width: 300px;
          height: 300px;
        }
        
        .btn-transpose:active {
          transform: scale(0.95);
        }
        
        .semitone-display {
          transition: all 0.3s ease;
        }
        
        .input-field {
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }
        
        .input-field:focus {
          border-color: #ea580c;
          box-shadow: 0 0 0 4px rgba(234, 88, 12, 0.1);
        }
        
        .chord-container {
          display: grid;
          gap: 0.75rem;
          grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
        }
        
        @media (max-width: 640px) {
          .chord-container {
            grid-template-columns: repeat(auto-fit, minmax(70px, 1fr));
          }
        }
      `}</style>
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 fade-in-up">
          <h1 className="text-5xl sm:text-7xl font-bold mb-3 title-gradient" 
              style={{ fontFamily: "'DM Serif Display', serif" }}>
            Трансаккорды
          </h1>
          <p className="text-amber-800 text-lg sm:text-xl font-semibold">
            Аккорды, которые раньше были нотами
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-10 border-4 border-amber-200/50 fade-in-up" 
             style={{ animationDelay: '0.1s' }}>
          
          {/* Input Section */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-amber-900 mb-3 uppercase tracking-wide">
              Напиши (через запятую) аккорды (например: Am, F, C, G)
            </label>
            <textarea
              value={inputChords}
              onChange={(e) => setInputChords(e.target.value)}
              placeholder="Am, F, C, G, Dm, E"
              className="input-field w-full px-5 py-4 text-lg rounded-2xl bg-amber-50/50 outline-none resize-none"
              rows="3"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            />
          </div>

          {/* Transpose Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => handleTranspose(-1)}
              className="btn-transpose w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold text-3xl sm:text-4xl shadow-lg hover:shadow-2xl hover:from-orange-600 hover:to-red-700"
              aria-label="Transpose down"
            >
              −
            </button>
            
            <div className="text-center px-6">
              <div className="semitone-display text-5xl sm:text-6xl font-bold text-amber-900 mb-1" 
                   style={{ fontFamily: "'DM Serif Display', serif" }}>
                {semitones > 0 ? '+' : ''}{semitones}
              </div>
              <div className="text-sm font-semibold text-amber-700 uppercase tracking-wide">
                Полутона
              </div>
            </div>
            
            <button
              onClick={() => handleTranspose(1)}
              className="btn-transpose w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 text-white font-bold text-3xl sm:text-4xl shadow-lg hover:shadow-2xl hover:from-orange-600 hover:to-red-700"
              aria-label="Transpose up"
            >
              +
            </button>
          </div>

          {/* Reset Button */}
          {semitones !== 0 && (
            <div className="text-center mb-8">
              <button
                onClick={reset}
                className="px-6 py-3 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-semibold text-sm uppercase tracking-wide transition-all duration-300 shadow-md hover:shadow-lg"
              >
                ВЕРНУТЬ ОРИГИНАЛ
              </button>
            </div>
          )}

          {/* Transposed Chords Display */}
          {transposedChords.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-amber-900 uppercase tracking-wide">
                  {semitones === 0 ? 'Оригинальные аккорды' : 'В новой тональности'}
                </h2>
                {semitones !== 0 && (
                  <span className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                    {semitones > 0 ? `+${semitones}` : semitones} полутона
                  </span>
                )}
              </div>
              
              <div className="chord-container">
                {transposedChords.map((chord, index) => (
                  <div
                    key={index}
                    className="chord-tag px-4 py-5 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 text-white text-center shadow-lg"
                    style={{ 
                      animationDelay: `${index * 0.05}s`,
                      fontFamily: "'DM Serif Display', serif"
                    }}
                  >
                    <div className="text-2xl sm:text-3xl font-bold">
                      {chord}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-amber-700 text-sm font-medium fade-in-up" 
             style={{ animationDelay: '0.2s' }}>
          Идеально для начинающих, потом уже будет проще...
        </div>
      </div>
    </div>
  );
};

export default App;
