import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';

function PieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetching data from the World Bank API
    axios
      .get('https://api.worldbank.org/v2/country/all/indicator/SP.POP.TOTL?format=json')
      .then((response) => {
        const worldBankData = response.data[1]; // Population data is in the second array

        // Filter out data with missing population values and map it for chart usage
        const filteredData = worldBankData
          .filter(item => item.value !== null)
          .slice(0, 10); // Limiting data to 10 entries for simplicity

        const totalPopulation = filteredData.reduce((acc, item) => acc + item.value, 0);

        // Transform the data for pie chart
        const chartData = filteredData.map(item => ({
          name: item.date, // Year
          y: (item.value / totalPopulation) * 100 // Percentage contribution
        }));

        setData(chartData);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Population Contribution by Year'
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    series: [
      {
        name: 'Population Share',
        colorByPoint: true,
        data: data
      }
    ]
  };

  return (
    <div className="App">
      <h1>Highcharts Pie Chart</h1>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}

export default PieChart;
