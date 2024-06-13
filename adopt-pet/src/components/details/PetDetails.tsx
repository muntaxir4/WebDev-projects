import {  useParams,useLocation} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ImageCarousel from "../ui-elements/ImageCarousel";
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

async function getPet(id: number){
    if(!id) throw new Error("id is required")
    const res = await fetch(`${import.meta.env.VITE_PETS_API}?id=${id}`)
    if (!res.ok) {
        throw new Error(`${id} fetch not ok`);
    }
    const json = await res.json()
    console.log("petid",json)
    return json
}

export default function(){
    const {id} = useParams()
    console.log("id",id)
    const {state }= useLocation()
    let {pet} : {pet : Pet | undefined} = state || {}
    console.log("pet",pet)
    if(!pet){
         const { data, error, isLoading } = useQuery({ queryKey: ["pet", id], queryFn :()=>getPet(Number(id))})
        if(isLoading) return <h2>Loading...</h2>
        if(error) return <h2>Error fetching data, {`${error}`} </h2>
        pet=data.pets[0]
        // console.log("petid data",pet)

    }
    if(pet)
    return (
<div className="overflow-hidden">
    
        <div className="border-black border-2 flex flex-col gap-2 rounded-lg m-2 p-3  backdrop-opacity-40 animate-fade-in-right">
            {/* {JSON.stringify(pet)} */}
            <ImageCarousel images={pet.images.map(image=>{
                return "https"+image.substring(4)
            })}/>
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl text-center"><strong>{pet.name}</strong></h1>
                <div className="flex flex-col">
                    <p><strong>Animal: </strong>{pet.animal}</p>
                    <p><strong>Breed: </strong>{pet.breed}</p>
                    <p><strong>City: </strong>{pet.city}</p>
                    <p><strong>State: </strong>{pet.state}</p>
                </div>
                <p><strong>Description: </strong> <em>{pet.description}</em></p>
            </div>           
        </div>
        </div>
    )
}