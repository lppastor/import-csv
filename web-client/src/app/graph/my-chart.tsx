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

const chartData = [
  {
    month: 'January',
    'import-01': 186,
    'import-02': 305,
    'import-03': 237,
    'import-04': 100,
  },
  {
    month: 'February',
    'import-01': 140,
    'import-02': 220,
    'import-03': 250,
    'import-04': 120,
  },
  {
    month: 'March',
    'import-01': 150,
    'import-02': 240,
    'import-03': 300,
    'import-04': 160,
  },
  {
    month: 'April',
    'import-01': 200,
    'import-02': 230,
    'import-03': 250,
    'import-04': 170,
  },
  {
    month: 'May',
    'import-01': 200,
    'import-02': 180,
    'import-03': 260,
    'import-04': 150,
  },
  {
    month: 'June',
    'import-01': 250,
    'import-02': 190,
    'import-03': 280,
    'import-04': 200,
  },
]

const chartConfig = {
  'import-01': {
    label: 'import-1',
    color: 'hsl(var(--chart-1))',
  },
  'import-02': {
    label: 'import-2',
    color: 'hsl(var(--chart-2))',
  },
  'import-03': {
    label: 'import-3',
    color: 'hsl(var(--chart-3))',
  },
  'import-04': {
    label: 'import-4',
    color: 'hsl(var(--chart-4))',
  },
} satisfies ChartConfig

export function MyChart() {
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
            data={chartData}
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
