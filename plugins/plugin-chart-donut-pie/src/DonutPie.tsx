import React, { useState,  createRef, FC } from 'react';
import styled from '@superset-ui/style';
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

const DonutPie: FC<DonutPieProps> = ({ dataKey, data, height, width, onClick }) => {
  const rootElem = createRef<HTMLDivElement>();
  const [count, setCount] = useState(0);
 
  onClick = (e, index) => {
    console.log(e)
    console.log(index)
    setCount(index)
    console.log(count)
  }
  return (
    <Styles ref={rootElem} height={height} width={width}>
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
            fill="#8884d8"
            onClick={onClick}
          >
            {
              data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % 3]} />
              ))
            }
          </Pie>
        </PieChart>
      </div>
    </Styles>
  );
};

export default DonutPie;
