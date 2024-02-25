import { Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function OrderTableFilters() {
  return (
    <form action="" className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros</span>
      <Input placeholder="Id do pedido" className="h-8 w-auto" />
      <Input placeholder="Nome do Cliente" className="h-8 w-[320px]" />
      <Select defaultValue="all">
        <SelectTrigger className="h-8 w-[100px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos Status</SelectItem>
          <SelectItem value="pending">Pendente</SelectItem>
          <SelectItem value="canceled">Cancelado</SelectItem>
          <SelectItem value="processing">Em preparo</SelectItem>
          <SelectItem value="delivering">Em entrega</SelectItem>
          <SelectItem value="delivered">Entregue</SelectItem>
        </SelectContent>
      </Select>

      <Button variant="secondary" size="xs" type="submit">
        <Search className="mr-2 h-4 w-4" /> Filtrar resultados
      </Button>

      <Button variant="outline" size="xs" type="button">
        <X className="mr-2 h-4 w-4" /> Remover filtros
      </Button>
    </form>
  )
}
