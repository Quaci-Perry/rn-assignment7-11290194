import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error(error));
  }, []);

  const addToCart = async (product) => {
    const cart = await AsyncStorage.getItem('cart');
    const cartItems = cart ? JSON.parse(cart) : [];
    const productExists = cartItems.find(item => item.id === product.id);
    if (!productExists) {
      cartItems.push(product);
      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
      alert('Item added to cart');
    } else {
      alert('Item already in cart');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/Logo.png')} style={styles.logo} />
        <View style={styles.rightIcons}>
          <TouchableOpacity onPress={() => { /* search functionality */ }}>
            <Image source={require('./assets/Search.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* listview functionality */ }}>
            <Image source={require('./assets/Listview.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { /* filter functionality */ }}>
            <Image source={require('./assets/Filter.png')} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require('./assets/shoppingBag.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.title}>OUR STORY</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
              <Image source={{ uri: item.image }} style={styles.productImage} />
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price}</Text>
              <TouchableOpacity onPress={() => addToCart(item)} style={styles.addButton}>
                <Image source={require('./assets/Plus.png')} style={styles.plusIcon} />
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        )}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: 'contain',
  },
  rightIcons: {
    flexDirection: 'row',
  },
  icon: {
    width: 25,
    height: 25,
    marginLeft: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  productContainer: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    alignItems: 'center',
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 15,
    alignItems: 'center',
    width: 20,
  },
  plusIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
});

export default HomeScreen;
