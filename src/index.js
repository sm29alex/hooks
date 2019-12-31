import React, { useState, Component, useEffect, useCallback, useMemo } from 'react';
import ReactDOM from 'react-dom';

const App = () => {

    const [value,setValue] = useState(1);
    const [visible, setVisible] = useState(true);

    if (visible) {
        return (
            <div>
                <button onClick={ () => setValue( (value) => value + 1 ) }>Increment</button>
                <button onClick={ () => setVisible(false) }>Hide</button>
                {/* <ClassCounter value={value} /> */}
                {/* <HookCounter value={value} /> */}
                {/* <Notification /> */}
                <PlanetInfo id={value} />
            </div>
        )
    } else {
        return <button onClick={ () => setVisible(true) }>Show</button>
    }
};

class ClassCounter extends Component {

    componentDidMount() {
        console.log('mount');
    }

    componentDidUpdate() {
        console.log('update');
    }

    componentWillUnmount() {
        console.log('unmount');
    }

    render(){
        
        return (
            <p>{ this.props.value }</p>
        );
    }
}

const HookCounter = ( {value} ) => {

    useEffect(
        ()  => { 
            console.log('hook effect up');
            return () => console.log('hook effect down'); 
        }
        , [ value ]
    )

    useEffect( () => console.log('* component did mount ') , []);
    useEffect( () => console.log('* component did update '));
    useEffect( () => () => console.log('* component will unmount '), []);

    return <p>{value}</p>
}

const Notification = () => {

    const [ visible, setVisible ] = useState(true);
    useEffect(
        () => { 
            const timeOut = setTimeout(() => setVisible(false), 5000);
            return () => clearTimeout(timeOut); 
        }
        , []
    )

    return (
        <div>
            { visible && <p>Notification</p> }
        </div>
    )
}

const getPlanet = (id) => { 
    return fetch(`https://swapi.co/api/planets/${id}/`)
            .then( res => res.json() )
            .then( data => data );
};


const useRequest = (request) => {

    const initialState = useMemo( () => {
        return {
            data: null,
            loading: true,
            error: null
            }
    } , []) ;

    const [dataState, setDataState] = useState(initialState);
    useEffect(() => {
        setDataState(initialState);
        let canseled = false;
        request()
            .then( data => !canseled && setDataState({
                data,
                loading: false,
                error: null
            }) )
            .catch( error => !canseled && setDataState({
                data: null,
                loading: false,
                error
            }));
        return () => canseled = true;
    }, [ request, initialState ] );
    
    return dataState;

}

const usePlanetInfo = (id) => {
    const request = useCallback(() => getPlanet(id), [ id ]);
    return useRequest(request);
}

const PlanetInfo = (id) => {

    const { data, loading, error } = usePlanetInfo(id);

    if (error){
        return <div> Nothing </div>
    }

    if (loading) {
        return <div> loading ..... </div>
    }
    
    return <div>{id} -- {data && data.name}</div>
}

ReactDOM.render(<App />, document.getElementById('root'));