
import { useQuery } from "@tanstack/react-query";

interface Result{
    numberOfResults: number
    breeds: string[]

}

async function fetchBreeds(animal :string){
    if(!animal.length) throw new Error("animal is required")
    const res = await fetch(`${import.meta.env.VITE_BREEDS_API}?animal=${animal}`)
    if (!res.ok) {
        throw new Error(`breeds ${animal} fetch not ok`);
    }
    const json = await res.json()
    return json
}

export default function (animal : string) : string[]{
    const { data, error, isLoading } = useQuery<Result>({ queryKey: ["breeds", animal], queryFn :()=>fetchBreeds(animal)})

    if(error || isLoading) return <string[]>[]
    return data?.breeds ?? <string[]>[]
   
}