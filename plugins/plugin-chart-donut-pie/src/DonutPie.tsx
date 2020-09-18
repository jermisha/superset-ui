import React, { useState, createRef, FC } from 'react';
import styled from '@superset-ui/style';
import { t } from '@superset-ui/translation';
import { PieChart, Pie, Cell, RechartsFunction, PieLabelRenderProps } from 'recharts';
import { CategoricalColorNamespace } from '@superset-ui/color';
import { getNumberFormatter, NumberFormats } from '@superset-ui/number-format';
import DonutPieLegend from './DonutPieLegend';

const PieConstants = {
  WIDTH: 800,
  HEIGHT: 800,
  CX: 300,
  CY: 300,
  OUTER_RADIUS: 250,
  INNER_RADIUS: 100,
};

type TDonutPieStylesProps = {
  height: number;
  width: number;
};
export type TDonutPieValue = [number, number];

export type TDonutPieChartData = {
  [key: string]: string | boolean | number | TDonutPieValue;
};
export type DonutPieProps = {
  height: number;
  width: number;
  data?: TDonutPieChartData[];
  dataKey: string;
  donut?: boolean;
  onClick?: RechartsFunction;
  colorScheme: string;
  baseColor: string;
  showLegend: boolean;
  showLabels: boolean;
  labelsOutside: boolean;
  groupby: string;
  pieLabelType: string;
  numberFormat: string;
};

export type TLegendProps = {
  data?: TDonutPieChartData[];
  colorFn: Function;
  groupby: string;
};
const Notification = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  color: ${({ theme }) => theme.colors.info.dark1};
  background-color: ${({ theme }) => theme.colors.info.light1};
`;

const Styles = styled.div<TDonutPieStylesProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  overflow-y: scroll;
  h3 {
    /* You can use your props to control CSS! */
    font-size: ${({ theme }) => theme?.typography?.sizes?.xxl};
    font-weight: bold;
  }
`;

const DonutPie: FC<DonutPieProps> = ({
  dataKey,
  data,
  height,
  width,
  onClick,
  donut,
  colorScheme,
  showLegend,
  showLabels,
  labelsOutside,
  groupby,
  pieLabelType,
  numberFormat,
}) => {
  const rootElem = createRef<HTMLDivElement>();
  const [count, setCount] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const closeNotification = () => setNotification(null);
  const colorFn = CategoricalColorNamespace.getScale(colorScheme);

  const RADIAN = Math.PI / 180;
  const customizedLabel = (s: PieLabelRenderProps) => {
    let innerRadius = s.innerRadius ? +s.innerRadius : 0;
    let outerRadius = s.outerRadius ? +s.outerRadius : 200;
    let cx = s.cx ? +s.cx : 200;
    let cy = s.cy ? +s.cy : 200;
    let percent = s.percent ? +s.percent : 200;
    let midAngle = s.midAngle ? +s.midAngle : 200;

    let radius = labelsOutside
      ? outerRadius * 1.1
      : innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    const numberFormatter = getNumberFormatter(numberFormat);
    const percentFormatter = getNumberFormatter(NumberFormats.PERCENT_2_POINT);
    return (
      <text
        x={x}
        y={y}
        fill={labelsOutside ? 'green' : 'white'}
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {pieLabelType === 'key' && `${s[groupby]}`}
        {pieLabelType === 'value' && `${numberFormatter(s.value)}`}
        {pieLabelType === 'percent' && `${percentFormatter(percent)}`}
        {pieLabelType === 'key_value' && `${s[groupby]}: ${numberFormatter(s.value)}`}
        {pieLabelType === 'key_percent' && `${s[groupby]}: ${percentFormatter(percent)}`}
        {pieLabelType === 'key_value_percent' &&
          `${s[groupby]}: ${numberFormatter(s.value)} (${percentFormatter(percent)})`}
      </text>
    );
  };
  onClick = (e, index) => {
    setCount(index);
    console.log(count);
    setNotification(t('Sector was clicked, filter will be emitted on a dashboard'));
  };
  return (
    <Styles ref={rootElem} height={height} width={width}>
      {notification && <Notification onClick={closeNotification}>{notification}</Notification>}
      {showLegend && <DonutPieLegend data={data} colorFn={colorFn} groupby={groupby} />}
      {
        <div>
          <PieChart width={PieConstants.WIDTH} height={PieConstants.HEIGHT}>
            <Pie
              data={data}
              cx={PieConstants.CX}
              cy={PieConstants.CY}
              dataKey={dataKey}
              startAngle={360}
              endAngle={0}
              outerRadius={PieConstants.OUTER_RADIUS}
              innerRadius={donut ? PieConstants.INNER_RADIUS : 0}
              labelLine={false}
              label={showLabels ? customizedLabel : false}
              onClick={onClick}
              isAnimationActive={false}
            >
              {data &&
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={colorFn(index)} />)}
            </Pie>
          </PieChart>
        </div>
      }
    </Styles>
  );
};

export default DonutPie;
