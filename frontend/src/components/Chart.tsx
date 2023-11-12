import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { VaultData } from "./Vault/Vault";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const options: ChartOptions<"line"> = {
  layout: {
    autoPadding: true,
  },
  responsive: true,
  plugins: {
    tooltip: {
      position: "nearest",
    },
    legend: {
      display: false,
    },
  },
  scales: {
    // x: {
    //   display: false,
    // },
    y: {
      display: false,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

function calculateData(vaults: VaultData[]): ChartData<"line"> {
  let prevAmount = vaults.reduce(
    (acc, { money }) => acc + (money?.[0]?.amount || 0),
    0
  );
  const data = new Array<[string, number]>(13)
    .fill(["", 0])
    .map<[string, number]>((v, i) => {
      const d = DateTime.local().plus({ months: i });

      const amount =
        prevAmount +
        vaults.reduce((acc, v) => {
          return acc + (v.increments?.fixed?.amount || 0);
        }, 0);

      prevAmount = amount;

      return [d.toFormat("MMMM"), amount * 1.5];
    });
  console.log(data);

  return {
    labels: data.map((item) => item[0]),
    datasets: [
      {
        label: "Dataset 1",
        data: data.map((item) => item[1]),
        borderColor: "green",
        backgroundColor: "green",
        cubicInterpolationMode: "monotone",
      },
      // {
      //   label: "Dataset 2",
      //   data: labels.map((_, i) => i * 1600 + Math.random() * 100),
      //   borderColor: "rgb(255, 99, 132)",
      //   backgroundColor: "rgba(255, 99, 132, 0.5)",
      //   cubicInterpolationMode: "monotone",
      // },
    ],
  };
}

interface Props {
  vaults: VaultData[];
}

export function Chart({ vaults }: Props) {
  // return <Line options={options} data={data} />;

  const [data, setData] = useState<ChartData<"line">>({ datasets: [] });

  useEffect(() => {
    setData(calculateData(vaults));
  }, [vaults]);

  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{
          backgroundColor: "#111",
          minHeight: "200px",
          height: "40dvh",
          borderRadius: "8px",
          padding: "16px",
        }}
      >
        <Line options={options} data={data} />
      </div>
    </div>
  );
}
