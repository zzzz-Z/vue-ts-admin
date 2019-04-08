import Ellipsis from '../Ellipsis';
import { Table } from '@/types/table';
import pick from 'lodash/pick';

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
  data!.attrs = pick(data!.attrs, ['id'])
  data!.props = props
  return <a-table {...data} />
}
