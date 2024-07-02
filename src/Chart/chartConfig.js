// src/Chart/chartConfig.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement, // Add this line
  BubbleController, // Add this line
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement, // Add this line
  BubbleController, // Add this line
  Title,
  Tooltip,
  Legend
);

export { ChartJS };
