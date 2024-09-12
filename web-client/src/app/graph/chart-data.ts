// Define the type for the data objects
export interface ImportData {
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

// export const chartData: ImportData[] = [
//   {
//     month: 'January',
//     'Import 01': 186,
//     'Import 02': 305,
//     'Import 03': 237,
//     'Import 04': 100,
//   },
//   {
//     month: 'February',
//     'Import 01': 140,
//     'Import 02': 220,
//     'Import 03': 250,
//     'Import 04': 120,
//   },
//   {
//     month: 'March',
//     'Import 01': 150,
//     'Import 02': 240,
//     'Import 03': 300,
//     'Import 04': 160,
//   },
//   {
//     month: 'April',
//     'Import 01': 200,
//     'Import 02': 230,
//     'Import 03': 250,
//     'Import 04': 170,
//   },
//   {
//     month: 'May',
//     'Import 01': 200,
//     'Import 02': 180,
//     'Import 03': 260,
//     'Import 04': 150,
//   },
//   {
//     month: 'June',
//     'Import 01': 250,
//     'Import 02': 190,
//     'Import 03': 280,
//     'Import 04': 200,
//   },
// ]

interface ChartConfig {
  [key: string]: {
    label: string
    color: string
  }
}

export function generateChartConfig(includedImports: string[]): ChartConfig {
  const baseLabel = 'Import '
  const baseColorVar = '--chart-'

  return includedImports.reduce((config, key, index) => {
    config[key] = {
      label: `${baseLabel}${index + 1}`,
      color: `hsl(var(${baseColorVar}${index + 1}))`,
    }
    return config
  }, {} as ChartConfig)
}
