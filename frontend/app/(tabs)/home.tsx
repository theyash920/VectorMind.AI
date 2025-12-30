import { useEffect, useState } from 'react';
import { Product, ProductCategory } from '@/types/types';
import { fetchProducts } from '@/services/productService';
<<<<<<< HEAD
import { Text, View,Image, FlatList,StatusBar   } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import {router} from "expo-router";
=======
import { Text, View, Image, FlatList, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { GestureHandlerRootView, TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
>>>>>>> d9764fa (updated readme)
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-root-toast';
import { useCart } from '@/components/CartContext';
import Banner from '@/components/Banner';
import SearchArea from '@/components/SearchArea';

const Home = () => {

  const { addToCart } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [shownProducts, setShownProducts] = useState<Product[]>([]);
  const [productCategories, setProductCatgories] = useState<ProductCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
<<<<<<< HEAD
  
=======

>>>>>>> d9764fa (updated readme)

  useEffect(() => {
    const uniqueCategories = Array.from((productCategories)).map((category) => ({
      id: category.id,
      selected: selectedCategory === category.id,
    }));
    setProductCatgories(uniqueCategories);

    if (selectedCategory === 'All') {
      setShownProducts(products);
    } else {
      const filteredProducts = products.filter((product) => product.category === selectedCategory);
      setShownProducts(filteredProducts);
    }

  }, [selectedCategory]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
<<<<<<< HEAD
        
=======
>>>>>>> d9764fa (updated readme)

        const categories = productsData.map((product) => product.category);
        categories.unshift('All');
        const uniqueCategories = Array.from(new Set(categories)).map((category) => ({
          id: category,
          selected: selectedCategory === category,
        }));

        setProducts(productsData);
        setShownProducts(productsData);
        setProductCatgories(uniqueCategories);

<<<<<<< HEAD

      } catch (err) {
        setError("Error fetching products"+err);
=======
      } catch (err) {
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

<<<<<<< HEAD
  const addButton = (name:string) => {
=======
  const addButton = (name: string) => {
>>>>>>> d9764fa (updated readme)
    addToCart(name, 1);
    Toast.show(`${name} added to cart`, {
      duration: Toast.durations.SHORT,
    });
  };

  return (
    <GestureHandlerRootView>
      <StatusBar barStyle="light-content" backgroundColor="#222222" />
<<<<<<< HEAD
      <SafeAreaView className='w-full h-full'>
        <FlatList 
            horizontal={false}
            columnWrapperStyle={{ justifyContent: 'space-between', marginLeft: 15, marginRight: 15 }}
            numColumns={2} 
            keyExtractor={(item, index) => index.toString()}
            data= {shownProducts}

            renderItem={({item}) => (
              <View 
                className='w-[48%] mt-2 bg-white rounded-2xl p-2 flex justify-between'>
                <TouchableOpacity

                  onPress={() => { 
                    
                    router.push( { pathname: '/details', params: {name: item.name, 
                      image_url: item.image_url,
                      type: item.category, 
                      price: item.price,
                      rating: item.rating,
                      description: item.description,}} ) 
                    }
                  }
                >
                  <Image 
                    source= {{ uri: item.image_url}}
                    className='w-full h-32 rounded-2xl'
                  />
                  <Text
                    className="text-[#242424] text-lg font-[Sora-SemiBold] ml-1 mt-2"
                  >{item.name}
                  </Text>
                  <Text
                    className="text-[#A2A2A2] text-sm font-[Sora-Regular] ml-1 mt-1"
                  >{item.category}
                  </Text>
                </TouchableOpacity>

                <View 
                  className="flex-row justify-between ml-1 mt-4 mb-2"
                >
                  <Text
                    className="text-[#050505] text-xl font-[Sora-SemiBold] "
                  >
                    ${item.price}
                  </Text>
                  
                    <TouchableOpacity
                      onPress = {() => addButton(item.name)}
                    >
                      <View
                        className='mr-2 p-2 -mt-1 bg-app_orange_color rounded-xl'
                      >
                        <AntDesign name="plus" size={20} color="white" />
                      </View>
                    </TouchableOpacity>

                  </View>
                


              </View>
          )}
          
          ListHeaderComponent={() => (
          <View className='flex'>
            <SearchArea />
            <Banner />
            
            <View
              className='flex items-center'
            >
              <FlatList 
                className='mt-6 w-[90%] mb-2'
                data = {productCategories}
                horizontal={true}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => setSelectedCategory(item.id)}
                  >
                    <Text
                      className={`text-sm mr-4 font-[Sora-Regular] p-3 rounded-lg 
=======
      <SafeAreaView className='w-full h-full bg-[#F9F9F9]'>
        <FlatList
          horizontal={false}
          columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 20 }}
          contentContainerStyle={{ paddingBottom: 100 }}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          data={shownProducts}
          showsVerticalScrollIndicator={false}

          renderItem={({ item }) => (
            <View
              className='w-[48%] mt-4 bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex justify-between'>
              <TouchableOpacity
                onPress={() => {
                  router.push({
                    pathname: '/details', params: {
                      name: item.name,
                      image_url: item.image_url,
                      type: item.category,
                      price: item.price,
                      rating: item.rating,
                      description: item.description,
                    }
                  })
                }
                }
              >
                <Image
                  source={{ uri: item.image_url || 'https://via.placeholder.com/150' }}
                  className='w-full h-36 rounded-xl bg-gray-100'
                  resizeMode="cover"
                />
                <Text
                  className="text-[#242424] text-lg font-[Sora-SemiBold] mt-3"
                  numberOfLines={1}
                >{item.name}
                </Text>
                <Text
                  className="text-[#A2A2A2] text-xs font-[Sora-Regular] mt-1"
                >{item.category}
                </Text>
              </TouchableOpacity>

              <View
                className="flex-row justify-between items-center mt-4 mb-1"
              >
                <Text
                  className="text-[#2F2D2C] text-lg font-[Sora-SemiBold]"
                >
                  $ {item.price}
                </Text>

                <TouchableOpacity
                  onPress={() => addButton(item.name)}
                  className='bg-app_orange_color p-2.5 rounded-xl active:opacity-80'
                >
                  <AntDesign name="plus" size={18} color="white" />
                </TouchableOpacity>

              </View>
            </View>
          )}

          ListHeaderComponent={() => (
            <View className='flex'>
              <SearchArea />
              <Banner />

              <View
                className='flex items-center'
              >
                <FlatList
                  className='mt-6 w-[90%] mb-2'
                  data={productCategories}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => setSelectedCategory(item.id)}
                    >
                      <Text
                        className={`text-sm mr-4 font-[Sora-Regular] px-4 py-2.5 rounded-xl overflow-hidden
>>>>>>> d9764fa (updated readme)
                        ${item.selected ? 'text-white' : 'text-[#313131]'}
                        ${item.selected ? 'bg-app_orange_color ' : 'bg-[#EDEDED] '}
                        `}
                      >{item.id}
<<<<<<< HEAD
                    </Text>
                  </TouchableOpacity>
                )}
              />

            </View>

          </View>

=======
                      </Text>
                    </TouchableOpacity>
                  )}
                />

              </View>

            </View>

>>>>>>> d9764fa (updated readme)
          )}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Home