import React, { useState } from 'react'

export const Counter = () => {
    const [count, setCount] = useState(0)
    return (
        <div>
            <h3>Edited count and the edit src/App.tsx, state is preserved</h3>
            <button onClick={() => setCount((count) => count + 1)}>Count - {count}</button>
        </div>
    )
}
