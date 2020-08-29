import React, { useEffect, createRef, FC } from 'react';
import styled from '@superset-ui/style';
import { PieChart, Pie } from 'recharts';

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
  data?: TDonutPieChartData[]; // please add additional typing for your data here
  headerText: string;
  dataKey: string;
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

const DonutPie: FC<DonutPieProps> = ({ dataKey, data, height, width }) => {
  const rootElem = createRef<HTMLDivElement>();

  useEffect(() => {
    const root = rootElem.current as HTMLElement;
    console.log('Plugin element', root);
  });

  return (
    <Styles ref={rootElem} height={height} width={width}>
      <div>
        <PieChart width={600} height={600}>
          <Pie
            data={data}
            cx={200}
            cy={200}
            dataKey="TAXI_IN"
            startAngle={180}
            endAngle={0}
            label
            labelLine={false}
            outerRadius={200}
            fill="#8884d8"
          />
        </PieChart>
      </div>
    </Styles>
  );
};

export default DonutPie;
