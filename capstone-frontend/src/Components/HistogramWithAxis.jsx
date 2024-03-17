import { data } from "./data";
import { Histogram } from "./Histogram";

export const HistogramWithAxis = ({ width = 200, height = 200 }) => (
  <Histogram width={width} height={height} data={data} />
);
