import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

function BarChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetching data from the World Bank API
    axios
      .get('https://api.worldbank.org/v2/country/WLD/indicator/SP.POP.TOTL?format=json')
      .then((response) => {
        const worldBankData = response.data[1]; // Population data is in the second array

        // Filter out data with missing population values
        const chartData = worldBankData
          .filter(item => item.value !== null)
          .slice(0, 10) // Limiting to the last 10 entries for simplicity
          .reverse() // Reverse to show data in chronological order
          .map(item => ({
            name: item.date, // Year
            y: item.value, // Population
          }));

        setData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const options = {
    chart: {
      type: 'line'
    },
    title: {
      text: 'Population Growth Over the Years'
    },
    xAxis: {
      categories: data.map(item => item.name),
      title: {
        text: 'Year'
      }
    },
    yAxis: {
      title: {
        text: 'Population'
      }
    },
    series: [
      {
        name: 'Population',
        data: data.map(item => item.y)
      }
    ]
  };

  return (
    <div className="BarChart">
      <h1>Highcharts Line Chart</h1>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default BarChart;
