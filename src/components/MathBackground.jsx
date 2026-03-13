import React, { useMemo } from 'react'

const SYMBOLS = [
  '∑', '∫', '∂', 'π', '√', '±', '×', '÷', '∞', '≈', '≠', '≤', '≥', 'α', 'β', 'γ', 'Δ', 'θ', 'λ', 'μ', 'σ', 'ω', '∇', 'ℏ',
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  'E=mc²', 'F=ma', 'PV=nRT', 'E=ℏω', '∇·E=ρ/ε₀', 'a²+b²=c²', 'e^(iπ)+1=0', 'ΔxΔp≥ℏ/2', 'λ=h/p', 'KE=½mv²'
]

const ITEM_COUNT = 50

// Stable random (same each render)
const seededRandom = (seed) => {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

const MathBackground = () => {
  const items = useMemo(() => {
    return Array.from({ length: ITEM_COUNT }, (_, i) => ({
      id: i,
      symbol: SYMBOLS[i % SYMBOLS.length],
      left: seededRandom(i * 2) * 100,
      startY: seededRandom(i * 6) * 120,
      rotation: (seededRandom(i * 3) - 0.5) * 20,
      delay: seededRandom(i * 4) * 6,
      duration: 18 + seededRandom(i * 5) * 14,
    }))
  }, [])

  return (
    <div
      className="math-bg overflow-hidden pointer-events-none"
      aria-hidden
    >
      {items.map(({ id, symbol, left, startY, rotation, delay, duration }) => (
        <span
          key={id}
          className="math-bg-item"
          style={{
            left: `${left}%`,
            '--r': `${rotation}deg`,
            '--start-y': `${startY}vh`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        >
          {symbol}
        </span>
      ))}
    </div>
  )
}

export default MathBackground
