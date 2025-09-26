import { useCallback } from "react";
import { db } from "../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const useFetchDocuments = () => {
    const fetchFlavors = useCallback(async () => {
        const flavorsColRef = collection(db,'flavors');

        try{

            const snapshot = await getDocs(flavorsColRef);

            const flavorsList = snapshot.docs.map(doc => ({
                
                id:doc.id,
                ...doc.data()
            }));
            return flavorsList

        }catch(error){
            console.log('error: ', error);
            return []
        }
    },[])

    return {
        fetchFlavors
    }

}

export default useFetchDocuments;
