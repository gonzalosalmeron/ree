import { SetStateAction } from 'react'

import Label from '@/components/ui/label'

export default function ValuePicker({
  value,
  setValue,
}: {
  value: keyof ApiValue
  setValue: React.Dispatch<SetStateAction<keyof ApiValue>>
}) {
  const types = [
    'Energía Activa',
    'Energía Generada',
    'Energía Reactiva Inductiva',
    'Energía Inductiva Generada',
    'Energía Capacitiva Generada',
    'Energía Reactiva Capacitiva',
    'Cualificador de Energía Activa Importada',
    'Cualificador de Energía Activa Exportada',
    'Cualificador de Energía Inductiva Importada',
    'Cualificador de Energía Inductiva Exportada',
    'Cualificador de Energía Capacitiva Exportada',
    'Cualificador de Energía Capacitiva Importada',
    'Potencia Activa Total',
  ]

  return (
    <Label className='w-full text-sm'>
      Data Type:
      <select
        onChange={(e: any) => setValue(e.target.value)}
        className='input-style'
      >
        {types.map((type, i) => (
          <option key={i} value={type} defaultValue={value}>
            {type}
          </option>
        ))}
      </select>
    </Label>
  )
}
