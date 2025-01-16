import {create} from "zustand";

// Zustand is a state-management Library
// Handles global state-management
export const useProductStore = create((set)=>({
    products: [],
    setProducts : (products)=> set({products}),
    createProducts: async (newProduct)=>{
       console.log(newProduct);

        if(!newProduct.name || !newProduct.image || !newProduct.price){
            return {success: false, message: "Please fill in all fields"};
        }
        const res = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct),
        });

        const data = await res.json();
        set((state)=> ({products:[ ...state.products, data.data]}));
        return {success: true, message: "Product created succesfully"};
    },
    fetchProducts: async () =>{
        const res = await fetch("/api/products");
        const data = await res.json();
        set({products: data.data});
    },
    deleteProduct : async (id)=>{
        const res = await fetch(`/api/products/${id}`,{
            method: "DELETE",
        });
        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        set((state)=> ({products: state.products.filter((product)=> product._id !== id)}));
        return {success: true, message: data.message};
    },
    updateProduct : async (id, initialProduct)=>{
        const res = await fetch(`/api/products/${id}`,{
            method: "PUT",
            headers : {"Content-Type": "application/json" },
            body: JSON.stringify(initialProduct),
        });

        const data = await res.json();
        if(!data.success) return {success: false, message: data.message};

        set((state)=> ({products: state.products.map((product)=> product._id === id ? data.data : product)}));  //Not returning updated data
        return {success: true, message: "Product updated Successfully"};
    }
}));