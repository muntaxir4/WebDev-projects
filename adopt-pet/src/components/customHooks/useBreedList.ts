
import  { useState, useEffect } from 'react';

export default function (animal : string) : string[]{
    const [breeds, setBreeds] = useState<string[]>([]);

    useEffect(() => {
        if(!animal.length) return
        async function fetchBreeds(){
            const res = await fetch(`${import.meta.env.VITE_BREEDS_API}?animal=${animal}`)
            if (!res.ok) {
                throw new Error(`breeds ${animal} fetch not ok`);
            }
            const json = await res.json()
            setBreeds(json.breeds);
        }
        fetchBreeds();
        console.log(animal,breeds)
    }, [animal]);
   
    return !breeds? (<string[]>[])  :breeds;
}