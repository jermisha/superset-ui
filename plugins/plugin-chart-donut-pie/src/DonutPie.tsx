import React, { useState, createRef, FC } from 'react';
import styled from '@superset-ui/style';
import { t } from '@superset-ui/translation';
import { PieChart, Pie, Cell, RechartsFunction } from 'recharts';

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

const COLORS = ['#0088FE', '#00C49F', '#0066FE', '#FFBB28', '#FF8042'];

const DonutPie: FC<DonutPieProps> = ({ dataKey, data, height, width, onClick }) => {
  const rootElem = createRef<HTMLDivElement>();
  const [count, setCount] = useState(0);
  const [notification, setNotification] = useState<string | null>(null);
  const closeNotification = () => setNotification(null);
  onClick = (e, index) => {
    console.log(e);
    console.log(index);
    setCount(index);
    console.log(count);
    setNotification(t('Bar was clicked, filter will be emitted on a dashboard'));
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
              innerRadius={50}
              fill="#8884d8"
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
