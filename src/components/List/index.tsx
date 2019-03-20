import Breadcrumb from '../Breadcrumb';
import Table from './table';


const IList = ({ data }: any) => {
  return (
    <div id='list-content'>
      <Breadcrumb />
      <Table {...data} />
    </div>
  )
}
export default IList
