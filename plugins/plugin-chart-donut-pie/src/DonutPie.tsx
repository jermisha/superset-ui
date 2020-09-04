import React, { useState, createRef, FC } from 'react';
import styled from '@superset-ui/style';
import { t } from '@superset-ui/translation';
import { PieChart, Pie, Cell, RechartsFunction, PieLabelRenderProps } from 'recharts';

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
  isDonut?: boolean;
  onClick?: RechartsFunction;
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const customizedLabel = (s: PieLabelRenderProps) => {
  console.log(s);
  let innerRadius = s.innerRadius ? +s.innerRadius : 0;
  let outerRadius = s.outerRadius ? +s.outerRadius : 200;
  let cx = s.cx ? +s.cx : 200;
  let cy = s.cy ? +s.cy : 200;
  let percent = s.percent ? +s.percent : 200;
  let midAngle = s.midAngle ? +s.midAngle : 200;

  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DonutPie: FC<DonutPieProps> = ({ dataKey, data, height, width, onClick, isDonut }) => {
  const rootElem = createRef<HTMLDivElement>();
  const [count, setCount] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const closeNotification = () => setNotification(null);
  onClick = (e, index) => {
    console.log(e);
    console.log(index);
    setCount(index);
    console.log(count);
    setNotification(t('Sector was clicked, filter will be emitted on a dashboard'));
  };
  return (
    <Styles ref={rootElem} height={height} width={width}>
      {notification && <Notification onClick={closeNotification}>{notification}</Notification>}
      {
        <div>
          <PieChart width={600} height={600}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              dataKey={dataKey}
              startAngle={360}
              endAngle={0}
              outerRadius={200}
              innerRadius={isDonut ? 80 : 0}
              fill="#8884d8"
              label //={customizedLabel}
              onClick={onClick}
            >
              {data &&
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % 3]} />)}
            </Pie>
          </PieChart>
        </div>
      }
    </Styles>
  );
};

export default DonutPie;
