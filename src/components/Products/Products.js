import React, { useCallback, useReducer, useEffect } from 'react'

import ProductForm from './ProductForm'
import ProductList from './ProductList'
import Search from './Search'

const productsReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.products
    case 'ADD':
      return [...state, action.product]
    default:
      throw new Error('Error')
  }
}

const Products = () => {
  const [products, dispath] = useReducer(productsReducer, [])

  const searchProductsHandler = useCallback((products) => {
    dispath({ type: 'SET', products: products })
  }, [])

  const addProductHandler = (items) => {
    fetch(
      'https://react-hooks-8b516-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        body: JSON.stringify(items),
        headers: { 'Content-Type': 'application/json' },
      }
    ).then((res) => {
      res.json().then((responseData) => {
        dispath({ type: 'ADD', product: { id: responseData.name, ...items } })
      })
    })
  }

  const removeProductHandler = (id) => {
    const delProduct = products.find((item) => item.id === id)
    fetch(
      `https://react-hooks-8b516-default-rtdb.firebaseio.com/products/${delProduct.id}.json`,
      {
        method: 'DELETE',
      }
    )
      .then((res) => res.json())
      .then((responseData) => console.log(responseData))
  }

  useEffect(() => {
    fetch('https://react-hooks-8b516-default-rtdb.firebaseio.com/products.json')
      .then((res) => res.json())
      .then((responseData) => {
        const loadedProducts = []

        for (const item in responseData) {
          loadedProducts.push({
            id: item,
            title: responseData[item].title,
            amount: responseData[item].amount,
          })
        }

        dispath({ type: 'SET', products: loadedProducts })
      })
  }, [removeProductHandler])

  return (
    <div className="App">
      <ProductForm onAddProduct={addProductHandler} />

      <section>
        <Search searchProducts={searchProductsHandler} />
        <ProductList products={products} onRemoveItem={removeProductHandler} />
      </section>
    </div>
  )
}

export default Products
