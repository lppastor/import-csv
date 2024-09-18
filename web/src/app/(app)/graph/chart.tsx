'use client'

import { CartesianGrid, Line, LineChart, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '~/components/ui/chart'
import { ImportData, filterImports, generateChartConfig } from './chart-data'

export function Chart({
  includedImports,
  chartData,
  importList,
}: {
  includedImports: string[]
  chartData: ImportData[]
  importList: string[]
}) {
  const filteredChartData = filterImports(chartData, includedImports)
  const chartConfig: ChartConfig = generateChartConfig(includedImports)

  function getHslColor(num: string) {
    const calculatedNume = parseInt(num) * 45

    return `hsl(${calculatedNume} 80% 60%)`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de Importações</CardTitle>
        {/* <CardDescription>Janeiro - Junho 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={filteredChartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
            {/* <Line
              dataKey='Import 1'
              type='monotone'
              stroke='hsl(220 70% 50%)'
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey='Import 2'
              type='monotone'
              stroke='hsl(160 60% 45%)'
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey='Import 3'
              type='monotone'
              stroke='hsl(30 80% 55%)'
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey='Import 4'
              type='monotone'
              stroke='hsl(0 70% 50%)'
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey='Import 5'
              type='monotone'
              stroke='hsl(330 70% 50%)'
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey='Import 6'
              type='monotone'
              stroke='hsl(290 70% 50%)'
              strokeWidth={2}
              dot={true}
            /> */}

            {importList.map((importName) => (
              <Line
                key={importName}
                dataKey={importName}
                type='monotone'
                stroke={getHslColor(importName.split(' ')[1])}
                strokeWidth={2}
                dot={true}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
