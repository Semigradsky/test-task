import { FC, useCallback, useRef, useState } from 'react'
import { observer } from 'mobx-react'
import { Flex, Grid } from 'antd'
import { Pie, PieConfig, Column, ColumnConfig } from '@ant-design/charts'

import { formatCurrency, formatCurrencyCompact, formatPercent } from 'shared/formatters';
import { useResizeObserver } from 'shared/hooks/useResizeObserver'

import { PersonsStore } from './personsStore'

type ChartData = {
  sex: 'Male' | 'Female';
  value: number;
}

type Props = {
  store: PersonsStore;
}

export const PersonsCharts: FC<Props> = observer(({ store }) => {
  const { lg } = Grid.useBreakpoint()

  const pieData: ChartData[] = [
    { sex: 'Male', value: store.malePercent },
    { sex: 'Female', value: store.femalePercent },
  ]

  const columnData: ChartData[] = [
    { sex: 'Male', value: store.maleSalary },
    { sex: 'Female', value: store.femaleSalary },
  ]

  const [containerWidth, setContainerWidth] = useState(0)

  const containerRef = useRef<HTMLElement>(null)
  const resizeObserverCallback: ResizeObserverCallback = useCallback((entries) => {
    setContainerWidth(entries[0].contentRect.width)
  }, [])

  useResizeObserver(containerRef, resizeObserverCallback)

  // Chart is badly working if initial width is 0, so reset it to some another value (42)
  const chartWidth = (lg ? containerWidth / 2 : containerWidth) || 42

  return (
    <Flex ref={containerRef} vertical={!lg}>
      {/* For some reason it is not enough to apply width to the chart.
          We need containers with the same width */}
      <div style={{ width: chartWidth }}>
        <Pie {...pieConfig} data={pieData} width={chartWidth} />
      </div>
      <div style={{ width: chartWidth }}>
        <Column {...columnConfig} data={columnData}  width={chartWidth} />
      </div>
    </Flex>
  )
})

const pieConfig: PieConfig = {
  colorField: 'sex',
  angleField: 'value',
  tooltip: false,
  label: {
    position: 'inside',
    text: ({ value }: ChartData) => formatPercent(value),
  },
}

const columnConfig: ColumnConfig = {
  xField: 'sex',
  yField: 'value',
  tooltip: false,
  label: {
    position: 'inside',
    formatter: (value: number) => formatCurrency(value),
  },
  axis: {
    y: {
      labelFormatter: (value: number) => formatCurrencyCompact(value),
    },
  },
}
