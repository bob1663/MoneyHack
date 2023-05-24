import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = (props) => {


  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: props.title,
      },
    },
  };

  const labels = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
  ];
  const numbers = [1,2,3,4,5,6,7,8,9,10,11,12];
  const values = props.data.map((r) => {
    if (r.time.substring(0, 4) == props.year) {
      return{
        value: r.value,
        month: r.time
      }
    }
    else return null;
  }).filter((r) => r !== null);
  const values2=numbers.map((i)=> {
        let boole = false;
        let objret={}
        values.map((r) => {
          if (r.month.substring(5, 7) == i) {
            boole = true;
            objret={
              value: r.value,
              month: i
            }
          }
        })
        if (!boole) {
          return {
            value: 0,
            month: i
          }
        }
        else{
          return objret;
        }
      }
    )
  const values3 = values2.sort((a, b) => a.month - b.month);
  const values4 =values3.map((r)=>r.value)
    const data = {
    labels,
    datasets: [
      {
        data: values4,
        borderColor: props.lineColor,
        borderWidth: 4,
        pointBackgroundColor: props.pointBackgroundColor,
      },
    ],
  };
  return <Line options={options} data={data} />;
};

export default LineChart;
