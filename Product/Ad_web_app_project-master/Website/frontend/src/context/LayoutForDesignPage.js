
import { createContext } from "react";
import { useState } from "react";
import { useReducer } from "react";

const LayoutForDesignPageContext = createContext({
    layoutArray: [],
    addToLayoutArray: (id) => {},
    deleteFromLayoutArray: (id) => {},
    functionForLocalStorage: () => {}
});

let layoutStorage = JSON.parse(localStorage.getItem("layout"));

let getStorage = localStorage.getItem("layout") ? layoutStorage : [];

 
export const LayoutForDesignPageProvider = ({children}) => {

    let [layoutArray, setLayoutArray] = useState(getStorage);

     //Add or Remove to local storage

     const functionForLocalStorage = () => {
        localStorage.setItem("layout", JSON.stringify(layoutArray));
    }

    //Add id to layout array

    const addToLayoutArray = (id) => {

       setLayoutArray((prevIds) => {
            return [...prevIds, id];
       });
    };

   
    //Remove id to layout array

    const deleteFromLayoutArray = (id) => {

        setLayoutArray((prevIds) => {
            return prevIds.filter((prevId) => prevId !== id);
        })
    };

   


    return (<LayoutForDesignPageContext.Provider value={{
        layoutArray: layoutArray,
        addToLayoutArray: addToLayoutArray,
        deleteFromLayoutArray: deleteFromLayoutArray,
        functionForLocalStorage: functionForLocalStorage
    }}>
        {children}
    </LayoutForDesignPageContext.Provider>)

};

export default LayoutForDesignPageContext;
