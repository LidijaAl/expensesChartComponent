function updateChart() {
  async function fetchData() {
    const url = "data.json";
    const response = await fetch(url);
    const datapoints = await response.json();
    return datapoints;
  };

  fetchData().then(datapoints => {
    const dayOfWeek = datapoints.map(
      function (index) {
        return index.day;
      })
    const percentage = datapoints.map(
      function (index) {
        return index.amount;
      })
    myChart.config.data.labels = dayOfWeek;
    myChart.config.data.datasets[0].data = percentage;
    myChart.update();
  })
}

updateChart()
const data = {
  labels: "",
  datasets: [{
    label: '',
    data: [18, 12, 6, 9, 12, 3, 9],
    backgroundColor: [
      'hsl(10, 79%, 65%)',
      'hsl(10, 79%, 65%)',
      'hsl(186, 34%, 60%)',
      'hsl(10, 79%, 65%)',
      'hsl(10, 79%, 65%)',
      'hsl(10, 79%, 65%)',
      'hsl(10, 79%, 65%)'
    ],
    hoverBackgroundColor:[
      'hsla(10, 79%, 65%, 0.7)',
      'hsla(10, 79%, 65%, 0.7)',
      'hsla(186, 34%, 60%, 0.7)',
      'hsla(10, 79%, 65%, 0.7)',
      'hsla(10, 79%, 65%, 0.7)',
      'hsla(10, 79%, 65%, 0.7)',
      'hsla(10, 79%, 65%, 0.7)'
    ],

    borderRadius: 3
  }]
};
//tooltip
const titleTooltip = (tooltipItems) => {

  return "";
}


// config 
const config = {
  type: 'bar',
  data,
  options: {
    onHover: (event, chartElement) => {
      event.native.target.style.cursor = chartElement[0] ? "pointer" : "default";
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: {
          display: false
        },
        grid: {
          drawBorder: false,
          drawOnChartArea: false,
          drawTicks: false

        },

      },
      x: {
        ticks: {
          padding: 20,
          color: "grey",
          font: {
            family: "'DM Sans', sans-serif",
            size: 14
          }
        },
        grid: {
          drawBorder: false,
          drawOnChartArea: false,
          drawTicks: false
        }
      },

    },
    plugins: {

      tooltip: {
        yAlign: "bottom",
        caretSize: 0,
        caretPadding: 10,
        displayColors: false,
        bodyFont: {
          size: 16
        },
        callbacks: {
          title: titleTooltip,
          label: function (context) {
            let label = context.dataset.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      },

      legend: {
        labels: {
          boxWidth: 0,
        }
      }
    }
    
  }
};

// render init block
const myChart = new Chart(
  document.getElementById('myChart'),
  config
);