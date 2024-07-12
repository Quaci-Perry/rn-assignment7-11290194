import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${productId}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error(error));
  }, [productId]);

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

  if (!product) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <TouchableOpacity onPress={() => addToCart(product)} style={styles.addButton}>
        <Image source={require('./assets/Plus.png')} style={styles.plusIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  productPrice: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#000', // Adjust button background color as needed
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
  },
  plusIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff', // Adjust icon color as needed
  },
});

export default ProductDetailScreen;
