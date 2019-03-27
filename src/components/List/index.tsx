import Breadcrumb from '../Breadcrumb';
import ITable from './table';


const List = ({ data }: any) => {
  return (
    <div id='list-content'>
      <Breadcrumb />
      <ITable {...data} />
    </div>
  )
}
export default List
