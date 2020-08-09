import React, {useEffect, useState} from 'react';
import './App.css';
import Chart from './components/chart'
import dataSet from './utils/MOCK_DATA'

function App() {
  const [data, setData] = useState(dataSet)
  const width = 600
  let dimensions = {
    width: width,
    height: width * 0.5,
    margin: {
      top: 35,
      right: 10,
      bottom: 50,
      left: 50,
    },
  }
  useEffect(() => {
    setData(dataSet)
    console.log(data)
  }, [data])

  return (
        <div className="App">
            <Chart width={width} height={500} dataSet={data} dimensions={dimensions} />
        </div>
  );
}

export default App;
