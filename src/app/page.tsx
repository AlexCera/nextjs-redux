"use client"
import { decrement, increment } from '@/redux/features/counterSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useGetUsersQuery, useGetUserByIdQuery } from '@/redux/services/user.services'

function HomePage() {

  const counter = useAppSelector(state => state.counterReducer.counter)
  const dispatch = useAppDispatch()

  const { data, error, isLoading, isFetching } = useGetUsersQuery(null);

  if (isLoading || isFetching) {
    return (
      <main className='flex justify-center items-center px-4 min-h-screen'>
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Cargando...</span>
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className='flex justify-center items-center px-4 min-h-screen'>
        <div className="flex p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          <svg aria-hidden="true" className="flex-shrink-0 inline w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
          <span className="sr-only">Danger</span>
          <div>
            <h1>Ocurrio un error inesperado</h1>
            <ul className="mt-1.5 ml-4 list-disc list-inside">
              <li>Revisar tu conexión a internet</li>
            </ul>
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className='px-4'>
      <div className='flex justify-center items-center mt-4 mb-20'>

        <div className="w-3/6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <h1 className='text-center'>
            <span className="bg-yellow-100 text-yellow-800 font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300 text-2xl">{counter}</span>
          </h1>

          <span className='flex justify-center gap-x-8 mt-4'>
            <button onClick={() => dispatch(decrement())}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Disminuir
              </span>
            </button>

            <button onClick={() => dispatch(increment())}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Aumentar
              </span>
            </button>
          </span>

        </div>
      </div>

      <section className="grid grid-cols-3 gap-4">
        {
          data?.map((user, index) => (
            <div key={index} className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col items-center py-4">
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
                <div className="flex mt-3 space-x-3 md:mt-3">
                  <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add friend</a>
                  <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">Message</a>
                </div>
              </div>
            </div>
          ))
        }
      </section>
    </div>
  )
}

export default HomePage