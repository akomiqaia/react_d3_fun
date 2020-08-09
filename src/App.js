import React, {useEffect, useState} from 'react';
import './App.css';
import Chart from './components/chart'
import dataSet from './utils/MOCK_DATA'

function App() {
  const [data, setData] = useState(dataSet)
  useEffect(() => {
    setData(dataSet)
    console.log(data)
  }, [])

  return (
    <div className="App">
            <Chart width={500} height={500} dataSet={data} />
        </div>
  );
}

export default App;
