import { ChartProps } from '@superset-ui/chart';
import { DonutPieProps } from '../DonutPie';

type TMetric = {
  label: string;
};

type TFormData = {
  queryFields: { metric: string };
  metrics: TMetric[];
};
type TQueryData = {
  [key: string]: number | string;
};

export default function transformProps(chartProps: ChartProps): DonutPieProps {
  const { width, height, formData, queryData } = chartProps;
  const { metric } = formData;

  let data = queryData.data as TQueryData[];
  let dataKey = metric.label;
  return {
    dataKey,
    width,
    height,
    data,
  };
}
