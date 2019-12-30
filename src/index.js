import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => <div>
    <HookSwitcher />
</div>

const HookSwitcher = () => {

    const [ color, setColor ] = useState('white')

    return (
        <div style={{ padding: '10px', backgroundColor: color }}>
            <button onClick={()=>setColor('black')}>Dark</button>
            <button onClick={()=>setColor('white')}>Light</button>
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));