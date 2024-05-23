import {  useParams,useLocation} from "react-router-dom";
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

export default function(){
    const {id} = useParams()
    console.log("id",id)
    const {state }= useLocation()
    const {pet} : {pet : Pet} = state
    return (
        <div className="border-black border-2 flex flex-col gap-2 rounded-lg m-2 p-3 animate-fade-in-right backdrop-opacity-40">
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
    )
}