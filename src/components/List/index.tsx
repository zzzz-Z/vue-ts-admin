import Breadcrumb from '../Breadcrumb';
import Table from './table';


const List = ({ data }: any) => {
  return (
    <div id='list-content'>
      <Breadcrumb />
      <Table {...data} />
    </div>
  )
}
export default List
