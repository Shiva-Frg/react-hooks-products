import React, { useState, useEffect, useRef } from 'react'

import Card from '../UI/Card'

import './Search.css'

const Search = React.memo((props) => {
  const [searchItem, setSearchItem] = useState('')
  const { searchProducts } = props
  const InputRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchItem === InputRef.current.value) {
        const query =
          searchItem.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${searchItem}"`

        fetch(
          'https://react-hooks-8b516-default-rtdb.firebaseio.com/products.json' +
            query
        )
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

            searchProducts(loadedProducts)
          })
      }
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [searchItem, searchProducts, InputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>جست و جو</label>
          <input
            ref={InputRef}
            type="text"
            value={searchItem}
            onChange={(event) => setSearchItem(event.target.value)}
          />
        </div>
      </Card>
    </section>
  )
})

export default Search
