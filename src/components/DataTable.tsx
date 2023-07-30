import { useEffect, useState } from 'react'
import AddButton from "./AddButton";
import Link from "next/link";
import Searchbar from "./Searchbar";
import Welcome from "./WelcomeTitle";
import {useDispatch,useSelector} from 'react-redux';
import { deleteUser } from '@/redux/actions';
import {toast} from 'react-toastify';


const DataTable = (props:any) => {

  const [searchItem, setSearchItem] = useState('');

  const users = useSelector((state:any) => state.users);

const dispatch = useDispatch();

  const handleDelete = (user:any) => {
    if(window.confirm('Do you want to remove?')){
        dispatch(deleteUser(user.id))
        toast.success('Signature removed successfully')
    }
       
  };

  const handleSearch = (query: string) => {
    setSearchItem(query);
  };

  const filteredUserList = users.filter((item: any) =>
    item.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  useEffect(() => {
    // This effect will run only on the client-side
    // It can be left empty or you can add any client-side specific logic here
  }, []);

  return (
    // props.user.loading ? <div><h1>Loading....</h1></div> :
    //   props.user.errmessage ? <div><h2>{props.user.errmessage}</h2></div> :
      <div >
        <Welcome/>
          <div  className='flex items-center justify-between'>
          <Searchbar onSearch={handleSearch} /> 
          <AddButton />
          </div>
          <div className="flex flex-col mr-28 ml-28 mt-2">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-black ">
                      <tr>
                        
                        <th
                          scope="col"
                          className="px-14 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-10 py-3  text-center text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Date Collected
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Mobile
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Signature
                        </th>
                        <th
                          scope="col"
                          className="px-36 py-3 text-center text-xs font-medium text-white uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredUserList.map((item: any) => (
                        <tr key={item.id}  >
                          
                          <td className="px-6 py-2 whitespace-nowrap">
                            <div className="flex items-center">
                              <div>
                                <div className="text-sm ml-6 font-medium text-gray-900">{item.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-center text-gray-900">{item.date}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="text-sm text-center text-gray-900">{item.mobile}</div>
                          </td>
                          <div className="flex-shrink-0 h-15 w-20 mt-6 ml-6">
                            <img className="h-15 w-20" src={item.signature} alt="signature" />
                          </div>
                          <td className="px-6 py-4  whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex items-center justify-items-center ml-14 ">
                            <Link href={`/userview?id=${item.id}`}>
                                <button
                                  className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline"
                                  type="submit"
                                >
                                  View
                                </button>
                              </Link>
                              <Link href={`/updateform?id=${item.id}`}>
                                <button
                                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded focus:outline-none focus:shadow-outline"
                                  type="submit"
                                >
                                  Edit
                                </button>
                              </Link>
                              <button
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                                onClick={() => { handleDelete(item) }}
                              >
                                Delete
                              </button>
                            </div>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
}

export default DataTable;