<<<<<<< HEAD
import { fireBaseDB } from '../config/firebaseConfig';
import { Product } from '../types/types';
import { ref, get } from 'firebase/database';

const productsRef = ref(fireBaseDB, 'products');

const fetchProducts = async (): Promise<Product[]> => {
  const snapshot = await get(productsRef);
  const data = snapshot.val();
  
  const products: Product[] = [];
  if (data) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        products.push({ ...data[key] });
      }
    }
  }
  
  return products;
=======
import axios from 'axios';
import { Product } from '../types/types';

const databaseUrl = process.env.EXPO_PUBLIC_FIREBASE_DATABASE_URL as string;

const fetchProducts = async (): Promise<Product[]> => {
  if (!databaseUrl) {
    console.error('EXPO_PUBLIC_FIREBASE_DATABASE_URL is not defined');
    throw new Error('Firebase database URL is not configured');
  }

  try {
    // Ensure we don't end up with a double slash
    const baseUrl = databaseUrl.replace(/\/$/, '');
    const url = `${baseUrl}/products.json`;

    console.log('Fetching products from:', url);

    const response = await axios.get(url, {
      timeout: 10000, // 10 second timeout
    });
    
    console.log('Products fetched successfully, status:', response.status);
    const data = response.data;

    const products: Product[] = [];
    if (data) {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          products.push({ ...data[key] });
        }
      }
    }

    console.log(`Loaded ${products.length} products`);
    return products;
  } catch (error: any) {
    console.error('Error fetching products:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status,
    });
    throw error;
  }
>>>>>>> d9764fa (updated readme)
};

export { fetchProducts };