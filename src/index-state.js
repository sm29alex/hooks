import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>
    <HookSwitcher />
</div>

const HookSwitcher = () => {

    const [ color, setColor ] = useState('white')
    const [ fontSize, setFontSize ] = useState(14);

    return (
        <div style={{ padding: '10px', backgroundColor: color, fontSize: `${fontSize}px` }}>
            Happy new year!!!
            <button 
                onClick={()=>setColor('black')}>
                Dark
            </button>
            <button 
                onClick={()=>setColor('white')}>
                Light
            </button>
            <button
                onClick={() => setFontSize( (s) => s+1 )}>
                Increment Size
            </button>
            <button
                onClick={() => setFontSize( (s) => s-1 )}>
                Decrement Size
            </button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));