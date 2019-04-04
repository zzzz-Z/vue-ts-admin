import Ellipsis from '../Ellipsis';
import { Table } from '@/types/table';

export const ITable = ({ data, props }: FC<Table>) => {
  let key = 0
  const { columns, tooptip, align } = props!
  props!.rowKey = () => key++
  props!.columns = columns.map((r) => {
    r.align = align
    if (!r.customRender && tooptip) {
      r.customRender = (text) => (
        typeof text === 'string' ?
          <Ellipsis length={tooptip} str={text} /> :
          text
      )
    }
    return r
  })
  data = { ...data, props }
  return <a-table {...data} />
}
