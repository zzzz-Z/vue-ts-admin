import { Column } from '@/types/column';
import Ellipsis from '../Ellipsis';
import { Table } from '@/types/table';

export const ITable = ({ data, props }: FC<Table>) => {

  const defalutProps = { size: 'middle', rowKey: (r: any, i: any) => i }
  props = { ...defalutProps, ...props }
  props.columns = (props.columns as Column[]).map((r) => {
    r.align = props.align
    if (!r.customRender && props.tooptip) {
      r.customRender = (text) => (
        typeof text === 'string' ?
          <Ellipsis length={props.tooptip} str={text} /> :
          text
      )
    }
    return r
  })

  data = { ...data, props }

  return <a-table {...data} />
}
