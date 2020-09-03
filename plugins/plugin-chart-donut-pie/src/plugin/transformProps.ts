import { ChartProps } from '@superset-ui/chart';
import { DonutPieProps } from '../DonutPie';

type TQueryData = {
  [key: string]: number | string;
};

export default function transformProps(chartProps: ChartProps): DonutPieProps {
  const { width, height, formData, queryData } = chartProps;
  const { metric } = formData;

  let data = queryData.data as TQueryData[];
  let dataKey = metric.label;
  let isDonut = formData.donut;
  console.log(chartProps);
  return {
    dataKey,
    width,
    height,
    data,
    isDonut,
  };
}
