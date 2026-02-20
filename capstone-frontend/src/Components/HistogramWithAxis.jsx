import { Histogram } from './Histogram'

export const HistogramWithAxis = ({ width = 275, height = 215, title, data }) => (
  <Histogram width={width} height={height} data={data} title={title} />
)
