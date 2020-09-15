import React from 'react';
//import { t } from '@superset-ui/translation';
import styled from '@superset-ui/style';
import { TLegendProps } from './DonutPie';

const Legend = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: no-wrap;
  & > * {
    margin-left: 10px;
  }
`;

const LegendItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: no-wrap;
`;

const LegendIcon = styled.div`
  margin-right: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

const LegendLabel = styled.div`
  line-height: 0;
  font-size: ${({ theme }) => theme?.typography?.sizes?.l};
`;

const DonutPieLegend = (p: TLegendProps) => (
  <Legend data-test-id="legend">
    {p.data &&
      p.data.map((item, index) => (
        <LegendItem key={`legend-${index}`}>
          <LegendIcon color={p.colorFn(index)} />
          <LegendLabel>{item[p.groupby]}</LegendLabel>
        </LegendItem>
      ))}
  </Legend>
);

export default DonutPieLegend;
