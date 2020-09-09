import { ChartProps } from '@superset-ui/chart';
import { DonutPieProps } from '../DonutPie';

type TQueryData = {
  [key: string]: number | string;
};

export default function transformProps(chartProps: ChartProps): DonutPieProps {
  const { width, height, formData, queryData } = chartProps;
  const { colorScheme, donut, groupby, metric, colorPicker, showLegend } = formData;
  let data = queryData.data as TQueryData[];
  console.log("**********************************")
  console.log(groupby)
  return {
    dataKey: metric.label,
    width,
    height,
    data,
    isDonut: donut,
    baseColor: colorPicker,
    colorScheme,
    showLegend,
    groupby: groupby[0]
  };
}
