import { Link } from "react-router-dom"

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

export default function( { pet } :{pet: Pet}){
    return (
            <Link to={`/pet-details/${pet.id}`} state={{pet}}>
        <div className="border-black border flex flex-col sm:flex-row gap-2 rounded-lg m-2 p-3 animate-fade-in-right backdrop-opacity-40">
            {/* {JSON.stringify(pet)} */}
            <img src={pet.images[0]} alt={pet.name} className="rounded-md max-w-40"/>
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl">{pet.name}</h1>
                <div className="flex sm:justify-between flex-col sm:flex-row">
                    <p><strong>Animal: </strong>{pet.animal}</p>
                    <p><strong>Breed: </strong>{pet.breed}</p>
                    <p><strong>City: </strong>{pet.city}</p>
                    <p><strong>State: </strong>{pet.state}</p>
                </div>
                <p><strong>Description: </strong> <em>{pet.description.substring(0,100)}</em></p>
            </div>
            
        </div>
        </Link>
    )
}