import { BrowserRouter, Link , Routes, Route,Outlet} from "react-router-dom"
import { QueryClient,QueryClientProvider } from "@tanstack/react-query"
import SearchPage from "./search/SearchPage"
import PetDetails from "./details/PetDetails"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

function Layout(){

  return(
    <div className="bg-gradient-to-r from-sky-100 to-sky-300 p-2 w-full flex flex-col justify-between"
        style={{height:'max(100%,100vh)'}}
        >
          <Link to="/"> <h1 className=" text-5xl text-center p-16">Adopt A Pet!</h1></Link>
          <Outlet/>
          <footer className="text-center"> Made by muntaxir4 </footer>
    </div>
  )
}

function App(){
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>   
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<SearchPage />} />
            <Route path="pet-details/:id" element={<PetDetails/>} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>

  )
}
export default App