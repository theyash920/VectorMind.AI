<<<<<<< HEAD
import {Text, View,StatusBar,ScrollView,TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react';
import { GestureHandlerRootView} from 'react-native-gesture-handler'
=======
import { Text, View, StatusBar, ScrollView, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler'
>>>>>>> d9764fa (updated readme)
import React from 'react'
import PageHeader from '@/components/PageHeader'
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Product } from '@/types/types';
import { fetchProducts } from '@/services/productService';
import ProductList from '@/components/CartProductList';
import { useCart } from '@/components/CartContext';
import Toast from 'react-native-root-toast';
import { router } from 'expo-router';

const Order = () => {

<<<<<<< HEAD
  const { cartItems, SetQuantityCart,emptyCart } = useCart();
=======
  const { cartItems, SetQuantityCart, emptyCart } = useCart();
>>>>>>> d9764fa (updated readme)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const calculateTotal = (products: Product[], quantities: { [key: string]: number }): number => {
    return products.reduce((total, product) => {
      const quantity = quantities[product.name] || 0;
      return total + product.price * quantity;
    }, 0);
  };

  useEffect(() => {
    const total = calculateTotal(products, cartItems);
    setTotalPrice(total);
<<<<<<< HEAD
  }, [cartItems,products]);
=======
  }, [cartItems, products]);
>>>>>>> d9764fa (updated readme)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();

        setProducts(productsData);
      } catch (err) {
<<<<<<< HEAD
        setError("Error fetching products"+err);
=======
        setError("Error fetching products" + err);
>>>>>>> d9764fa (updated readme)
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  const orderNow = () => {
    emptyCart();
    Toast.show('Order placed successfully!', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
    });
    router.push('/thankyou')
  };

  return (
    <GestureHandlerRootView
      className='bg-[#F9F9F9] w-full h-full'
    >
      <StatusBar backgroundColor="white" />
      <PageHeader title="Order" showHeaderRight={false} bgColor='#F9F9F9' />

      <View className='h-full flex-col justify-between'>

        <View className='h-[75%]'>
          <ProductList products={products} quantities={cartItems} setQuantities={SetQuantityCart} totalPrice={totalPrice} />
        </View>
<<<<<<< HEAD
        
        <View
            className='bg-white rounded-tl-3xl rounded-tr-3xl px-7 pt-3 pb-6'
          > 
          <View
            className='flex-row justify-between items-center'
          >
            <View className='flex-row items-center'>
              <Ionicons name="wallet-outline" size={24} color="#C67C4E" />
              <View>
                <Text
                        className="text-[#242424] text-base font-[Sora-SemiBold] pb-1 ml-3"
                  >Cash/Wallet
                </Text>
                <Text
                        className="text-app_orange_color text-sm font-[Sora-SemiBold] ml-3"
                  >$ {totalPrice === 0 ? 0 : totalPrice+1} 
=======

        <View
          className='bg-white rounded-t-[30px] px-8 pt-6 pb-10 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]'
        >
          <View
            className='flex-row justify-between items-center mb-6'
          >
            <View className='flex-row items-center'>
              <View className='bg-[#FFF5EE] p-2 rounded-full mr-3'>
                <Ionicons name="wallet-outline" size={24} color="#C67C4E" />
              </View>
              <View>
                <Text
                  className="text-[#242424] text-base font-[Sora-SemiBold]"
                >Total Amount
                </Text>
                <Text
                  className="text-app_orange_color text-lg font-[Sora-Bold]"
                >$ {totalPrice === 0 ? 0 : (totalPrice + 1).toFixed(2)}
>>>>>>> d9764fa (updated readme)
                </Text>
              </View>

            </View>

<<<<<<< HEAD
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />

          </View>
            
          <TouchableOpacity 
                className={`${totalPrice=== 0 ? 'bg-[#EDEDED]' : 'bg-app_orange_color' }  2-full rounded-2xl items-center justify-center mt-6 py-3`}
                disabled={totalPrice === 0}
                onPress={orderNow}
              >
                <Text className="text-xl color-white font-[Sora-Regular]">Order</Text> 
          </TouchableOpacity> 
        
=======
          </View>

          <TouchableOpacity
            className={`${totalPrice === 0 ? 'bg-[#F0F0F0]' : 'bg-app_orange_color shadow-lg shadow-orange-200'} w-full rounded-2xl items-center justify-center py-4 active:opacity-90`}
            disabled={totalPrice === 0}
            onPress={orderNow}
          >
            <Text className={`text-lg font-[Sora-SemiBold] ${totalPrice === 0 ? 'text-gray-400' : 'text-white'}`}>
              Checkout
            </Text>
          </TouchableOpacity>

>>>>>>> d9764fa (updated readme)
        </View>

      </View>

    </GestureHandlerRootView>
  )
}

export default Order