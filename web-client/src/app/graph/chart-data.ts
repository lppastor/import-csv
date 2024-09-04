// Define the type for the data objects
interface ImportData {
  month: string
  [key: string]: string | number // Allow other keys with string values
}

export function filterImports(
  data: ImportData[],
  includedImports: string[]
): Partial<ImportData>[] {
  return data.map((obj) => {
    const filteredImports: Partial<ImportData> = {
      month: obj.month,
    }

    includedImports.forEach((key) => {
      if (obj.hasOwnProperty(key)) {
        filteredImports[key] = obj[key]
      }
    })

    return filteredImports
  })
}

export const chartData: ImportData[] = [
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

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

export function generateChartConfig(includedImports: string[]): ChartConfig {
  const baseLabel = 'import-'
  const baseColorVar = '--chart-'

  return includedImports.reduce((config, key, index) => {
    config[key] = {
      label: `${baseLabel}${index + 1}`,
      color: `hsl(var(${baseColorVar}${index + 1}))`,
    }
    return config
  }, {} as ChartConfig)
}
