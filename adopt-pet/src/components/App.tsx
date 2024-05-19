import { BrowserRouter, Link , Routes, Route} from "react-router-dom"
import SearchPage from "./search/SearchPage"
import PetDetails from "./details/PetDetails"

function App(){
  return (
    <BrowserRouter>
      <div className="bg-gradient-to-r from-sky-100 to-sky-300 p-2"
    style={{height:'max(100%,100vh)'}}>
      <Link to="/"> <h1 className=" text-5xl text-center p-16">Adopt A Pet!</h1></Link>
      
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/pet-details/:id" element={<PetDetails/>} />
      </Routes>
      
    </div>
    </BrowserRouter>

  )
}
export default App