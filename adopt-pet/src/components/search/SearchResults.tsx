// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PetContainer from "./PetContainer";

interface Search{
    location: string
    animal: string
    breed: string
}

interface Pet {
    id: number
    name: string
    animal: string
    breed: string
    city: string
    state: string
    description: string
    images: string[]

}

interface Result{
    numberOfResults: number
    pets: Pet[]

}

async function getPets(animal: string, breed :string){
    if(!animal.length) throw new Error("animal is required")
    const res = await fetch(`${import.meta.env.VITE_PETS_API}?animal=${animal}&breed=${breed}`)
    if (!res.ok) {
        throw new Error(`${animal+ " and " + breed} fetch not ok`);
    }
    const json = await res.json()
    console.log("result",json)
    return json
}

export default function({search } : {search :Search}){
    console.log("search",search)
    const { data, isSuccess, error, isLoading } = useQuery<Result>({ queryKey: ["search", search.animal,search.breed], queryFn :()=>getPets(search.animal,search.breed)})


    return (
        
        <div className="flex flex-col">
            {error && (<h2>Error fetching data, {`${error}`}</h2>)}
            {isLoading && <h2>Loading...</h2>}
            {isSuccess && (!data.numberOfResults ? (<h2>No results Found</h2>):
                data.pets?.map((pet: Pet) => (
                    <PetContainer key={pet.id} pet={pet} />
                ))
            )}
            
        </div>
    )
}