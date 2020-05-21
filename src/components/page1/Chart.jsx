import React, { useState, useEffect, useContext } from 'react';
import { def } from '../../defs/def';
import { updateData } from'../../utils/updateData';
import { QlikContext } from '../../context/QlikContext';
import LineChart from './buildChart';


const Chart = () => {
    const { app } = useContext(QlikContext)
    const [data, setData] = useState([])

    useEffect(() => {
        const init = async () => {
            const model = await app.createSessionObject(def)
            const layout = await model.getLayout()
            const props = await model.getProperties()
            console.log('props', props)
            props.qHyperCubeDef.qInitialDataFetch = [
               {
                 qTop: 0,
                 qLeft: 0,
                 qWidth: layout.qHyperCube.qSize.qcx,
                 qHeight: layout.qHyperCube.qSize.qcy,
               }
             ]
             layout.qHyperCube.qDataPages = await model.getHyperCubeData(
               '/qHyperCubeDef',
               props.qHyperCubeDef.qInitialDataFetch
             )
             setData(updateData(layout))
       }
       init()
   }, [app])


    return ( 
        <>
        <h1>Page 1</h1>
        {data.length > 0 && <LineChart data={data} /> }
        <br/>
      </>
     );
}
 
export default Chart;