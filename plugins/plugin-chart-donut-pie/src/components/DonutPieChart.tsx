/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, { createRef, FC, useState } from 'react';
//import { t } from '@superset-ui/translation';
import styled from '@superset-ui/style';
import {
  PieChart,
  Pie,
  //Cell,
  ContentRenderer,
  Label,
  //Percentage
} from 'recharts';
//import DonutPieTick from './DonutPieTick';
//import { valueFormatter } from './utils';
//import DonutPieBar from './DonutPieBar';
//import DonutPieLegend from './DonutPieLegend';

type TDonutPieStylesProps = {
  height: number;
  width: number;
};

export type TDonutPieValue = [number, number];

export type TDonutPieChartData = {
  [key: string]: string | boolean | number | TDonutPieValue;
};
export type TDonutPieChartProps = {
  xAxisDataKey?: string;
  dataKey: string;
  error?: string;
  height: number;
  resetFilters?: Function;
  onBarClick?: Function;
  width: number;
  content?: React.ReactElement<any> | ContentRenderer<Label>;
  data?: TDonutPieChartData[];
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

const Error = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.gridUnit * 4}px;
  border-radius: ${({ theme }) => theme.gridUnit * 2}px;
  color: ${({ theme }) => theme.colors.warning.dark1};
  background-color: ${({ theme }) => theme.colors.warning.light1};
`;

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
/*
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;

//{ cx, cy, midAngle, innerRadius, outerRadius, percent, index, }
const renderCustomizedLabel = () => {
 
  let cx =200;
  let cy =200;
  let midAngle  = 15; 
  let innerRadius = 40; 
  let outerRadius =80;
  let percent = 25;
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
*/

const DonutPieChart: FC<TDonutPieChartProps> = ({
  onBarClick = () => {},
  xAxisDataKey,
  dataKey,
  data,
  height,
  width,
  error,
}) => {
  const rootElem = createRef<HTMLDivElement>();
  const [notification, setNotification] = useState<string | null>(null);

  const closeNotification = () => setNotification(null);

  return (
    <Styles ref={rootElem} height={height} width={width}>
      {notification && <Notification onClick={closeNotification}>{notification}</Notification>}
      {error ? (
        <Error>{error}</Error>
      ) : (
        <div>
          {/*<DonutPieLegend />*/}
          <PieChart width={600} height={600}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              dataKey="TAXI_IN"
              startAngle={360}
              endAngle={0}
              label //={renderCustomizedLabel}
              labelLine={false}
              outerRadius={200}
              fill="#8884d8"
            >
              {/*  data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />) */}
            </Pie>
          </PieChart>
          {/*
        
        
 
        
        
        
        
        
        
        
        <BarChart
            margin={{ bottom: 100, top: 20 }}
            width={width - 20}
            height={height - 100}
            data={data}
            barCategoryGap={0}
          >
            <CartesianGrid vertical={false} />
            <XAxis dataKey={xAxisDataKey} dy={30} angle={45} tick={DonutPieTick} interval={0} />
            <YAxis tickFormatter={valueFormatter} />
            <Tooltip />
            <Bar
              dataKey={dataKey}
              shape={props => <DonutPieBar {...props} numberOfBars={data?.length} />}
              onClick={handleBarClick}
            >
              <LabelList dataKey={dataKey} position="top" content={renderLabel} />
            </Bar>
          </BarChart>*/}
        </div>
      )}
    </Styles>
  );
};

export default DonutPieChart;

/*


import React, { PureComponent } from 'react';
import {
  PieChart, Pie, Sector, Cell,
} from 'recharts';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/c9pL8k61/';

  render() {
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
    );
  }
}

*/
