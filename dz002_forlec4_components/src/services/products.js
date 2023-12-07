import axios from "axios";

export default async function getProducts() {
    try {
        const response = await axios.get('/products.json');
        const productsArray = response.data
        return productsArray
      } catch (error) {
        console.log(error);
        throw error
      }
}