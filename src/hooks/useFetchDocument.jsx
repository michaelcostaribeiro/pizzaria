import { useCallback } from "react";
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";

export const useFetchDocument = () => {

    const fetchFlavor = useCallback(async (id) => {
        try{
            const flavorRef = doc(db,'flavors',id)
            const flavorSnap = await getDoc(flavorRef)
    
            console.log(flavorSnap)

            if(flavorSnap.exists()){
                return ({id:flavorSnap.id,...flavorSnap.data()});
            }

        }catch(firebaseError){
            console.log(`Error: ${firebaseError}`)
            return []
        }
    },[])

    return {
        fetchFlavor
    }

}

export default useFetchDocument;
