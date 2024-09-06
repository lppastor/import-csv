'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '~/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '~/components/ui/popover'

type Props = {
  importList: string[]
  includedImports: string[]
  toggleSelect: (id: string) => void
}

export function ImportFilter({
  importList,
  includedImports,
  toggleSelect,
}: Props) {
  const [open, setOpen] = React.useState(false)
  const selected = includedImports

  const isSelected = (id: string) => selected.includes(id)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-[250px] justify-between'
        >
          <span>Selecione as importações...</span>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[250px] p-0'>
        <Command>
          <CommandInput placeholder='Pesquisar importação...' />
          <CommandList>
            <CommandEmpty>Nenhuma importação encontrada!</CommandEmpty>
            <CommandGroup>
              {importList.map((importData) => (
                <CommandItem
                  className='cursor-pointer'
                  key={importData}
                  value={importData}
                  onSelect={(currentValue) => {
                    toggleSelect(currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      isSelected(importData) ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {importData}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
