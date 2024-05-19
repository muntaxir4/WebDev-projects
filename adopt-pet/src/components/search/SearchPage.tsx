import { useState } from 'react'
import SearchResults from './SearchResults'
import useBreedList from '../customHooks/useBreedList'

interface Search{
  location: string
  animal: string
  breed: string
}

const animals = ["bird", "cat", "dog", "rabbit", "reptile"]

function SearchPage() {
  const [search, setSearch] = useState<null | Search>(null);
  const [location, setLocation] = useState("")
  const [animal, setAnimal] = useState("")
  const [breed, setBreed] = useState("")
  const breeds= useBreedList(animal)


  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const obj={
      location: event.currentTarget.location.value,
      animal: event.currentTarget.animal.value,
      breed: event.currentTarget.breed.value,
    }
    console.log("obj",obj)
    setSearch(obj);
  }

  return (
    <div className="flex md:flex-row flex-col ">
        <div className="m-2 p-3 md:ml-8 rounded-md border-black border md:w-72 flex-initial flex-shrink-0 md:self-start backdrop-opacity-40">
          <form className="m-2" onSubmit={handleSearch}>
            <div className="sm:col-span-3 m-2">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-90 "
              >
                Location
              </label>
              <div className="mt-2">
                <select
                  id="location"
                  name="location"
                  value={location}
                  disabled={true}
                  onChange={(e) => setLocation(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                </select>
              </div>
            </div>
            <div className="sm:col-span-3 m-2">
              <label
                htmlFor="animal"
                className="block text-sm font-medium leading-6 text-gray-90 "
              >
                Animal
              </label>
              <div className="mt-2">
                <select
                  id="animal"
                  name="animal"
                  value={animal}
                  onChange={(e) => {setAnimal(e.target.value); setBreed("Select")}}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select</option>
                  {animals.map((animal, ind) => (
                    <option key={ind} value={animal}>
                      {animal}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="sm:col-span-3 m-2">
              <label
                htmlFor="breed"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Breeds
              </label>
              <div className="mt-2">
                <select
                  id="breed"
                  name="breed"
                  value={breed}
                  onChange={(e) => setBreed(e.target.value)}
                  disabled={!breeds.length}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option value="">Select</option>
                  {breeds.map((breed, ind) => (
                    <option key={ind} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button type="button" className="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
              <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Search</button>
            </div>
          </form>
        </div>  
        <div className="flex-auto m-2">
          {search ? 
          <SearchResults search={search} /> :
          <h2 className="text-center">Results will appear here.</h2>}
          
        </div>
      </div>
  );
}

export default SearchPage;
