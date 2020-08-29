import { ChartProps } from '@superset-ui/chart';
import { DonutPieProps } from '../DonutPie';

type TQueryData = {
  [key: string]: number | string;
};

/*type TMetric = {
  label: string;
};



type TFormData = {
  queryFields: { metrics: string };
  metrics: TMetric[];
};

const convertDataForRecharts = (
  periodColumn: string,
  xAxisColumn: string,
  valueColumn: string,
  data: TQueryData[],
) => {
  // Group by period (temporary map)
  const groupedData = data.reduce((acc, cur) => {
    const period = cur[periodColumn] as string;
    const periodData = acc.get(period) || [];
    periodData.push(cur);
    acc.set(period, periodData);
    return acc;
  }, new Map<string, TQueryData[]>());

  let resultData: TQueryData[] = [];
  let counter = 0;
  groupedData.forEach((val, key) => {
    // Sort for waterfall Desc
    val.sort((a, b) => (a[periodColumn] as number) - (b[periodColumn] as number));
    // Calc total per period
    const sum = val.reduce((acc, cur) => acc + (cur[valueColumn] as number), 0);
    // Push total per period to the end of period values array
    val.push({
      [xAxisColumn]: key,
      [periodColumn]: '__TOTAL__',
      [valueColumn]: sum,
    });
    // Remove first period and leave only last one
    if (counter++ === 0) {
      // eslint-disable-next-line no-param-reassign
      val = [val[val.length - 1]];
    }
    resultData = resultData.concat(val);
  });
  return resultData;
};

const createReChartsBarValues = (
  rechartsData: TQueryData[],
  valueColumn: keyof TQueryData,
  periodColumn: keyof TQueryData,
): TDonutPieChartData[] =>
  // Create ReCharts values array of deltas for bars
  rechartsData.map((cur: TQueryData, index: number) => {
    let totalSumUpToCur = 0;
    for (let i = 0; i < index; i++) {
      // Ignore calculation on period column
      if (rechartsData[i][periodColumn] !== '__TOTAL__' || i === 0) {
        totalSumUpToCur += rechartsData[i][valueColumn] as number;
      }
    }

    if (cur[periodColumn] === '__TOTAL__') {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      return {
        ...cur,
        __TOTAL__: true,
        [valueColumn]: [0, totalSumUpToCur || cur[valueColumn]],
      } as TDonutPieChartData;
    }

    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    return {
      ...cur,
      [valueColumn]: [totalSumUpToCur, totalSumUpToCur + (cur[valueColumn] as number)],
    } as TDonutPieChartData;
  });
*/
export default function transformProps(chartProps: ChartProps): DonutPieProps {
  const { width, height, queryData } = chartProps;

  //const { metrics } = formData as TFormData;

  //const valueColumn = 'TAXI_IN';
  let data = queryData.data as TQueryData[];
  //const rechartsData = convertDataForRecharts(periodColumn, xAxisColumn, valueColumn, data);

  //const resultData = createReChartsBarValues(rechartsData, valueColumn, periodColumn);

  return {
    dataKey: 'TAXI_IN',
    width,
    height,
    data,
    headerText: 'Hi',
  };
}
