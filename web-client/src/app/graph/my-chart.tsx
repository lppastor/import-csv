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
import { chartData, filterImports, generateChartConfig } from './chart-data'

export function MyChart({ includedImports }: { includedImports: string[] }) {
  const filteredChartData = filterImports(chartData, includedImports)
  const chartConfig: ChartConfig = generateChartConfig(includedImports)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráfico de Importações</CardTitle>
        <CardDescription>Janeiro - Junho 2024</CardDescription>
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
            <Line
              dataKey='import-01'
              type='monotone'
              stroke='hsl(220 70% 50%)'
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey='import-02'
              type='monotone'
              stroke='hsl(160 60% 45%)'
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey='import-03'
              type='monotone'
              stroke='hsl(30 80% 55%)'
              strokeWidth={2}
              dot={true}
            />
            <Line
              dataKey='import-04'
              type='monotone'
              stroke='hsl(0 70% 50%)'
              strokeWidth={2}
              dot={true}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
