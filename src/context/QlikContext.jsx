import React, { useState, useEffect, createContext } from 'react';
import { openSession } from '../utils/enigmaApp'

export const QlikContext = createContext(null)


const QlikProvider = ({ children }) => {
    const [app, setApp] = useState(null)

    useEffect(() => {
        openSession().then((qDoc) => {
            setApp(qDoc)
        })
        console.log('qDoc', openSession)
        return openSession
    }, [])

    return ( 
        <>
        {!app ? ( <div>Loading...</div>) : 
        (
        <QlikContext.Provider value={{ app }}>
            { children }
        </QlikContext.Provider>
        )
        }
        </>
     );
}
 
export { QlikProvider }