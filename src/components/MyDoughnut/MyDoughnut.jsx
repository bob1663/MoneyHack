import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);
const MyDoughnut = (props) => {
  const label = props.data.map((l) => l.category);
  const value = props.data.map((l) => l.value);
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataIndex = context.dataIndex;
            const value = context.chart.data.datasets[0].data[dataIndex];
            return `${value} ГРН`;
          },
          /* title:()=>null, */
        },
        displayColors: false,
      },
    },
  };
  const data = {
    labels: label,
    datasets: [
      {
        data: value,
        backgroundColor: props.hover.map((hovered) =>
          hovered ? props.background : "rgba(0, 0, 0, 0.1)"
        ),
        hoverBackgroundColor: props.background,
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.7)",
      },
    ],
  };
  return (
    <div className="piechart-test">
      <Doughnut data={data} options={options} />
    </div>
  );
};
export default MyDoughnut;
