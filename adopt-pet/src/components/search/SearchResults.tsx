import { useState, useEffect } from "react";
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

export default function({search } : {search :Search}){
    const [data, setData] = useState<Partial<Result>>({});
    useEffect(()=>{
        console.log("search",search)
        if(!search.animal.length) return
        async function getPets(){
            const res = await fetch(`${import.meta.env.VITE_PETS_API}?animal=${search.animal}&breed=${search.breed}`)
            if (!res.ok) {
                throw new Error(`${JSON.stringify(search)} fetch not ok`);
            }
            const json = await res.json()
            console.log("result",json)
            setData(json)
        }
        getPets()
    },[search])
    return (
        <div className="flex flex-col">
            {!data.numberOfResults ? (<h2>No results Found</h2>):
                data.pets?.map((pet: Pet) => (
                    <PetContainer key={pet.id} pet={pet} />
                ))
            }
        </div>
    )
}