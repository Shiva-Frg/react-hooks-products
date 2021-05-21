import React from 'react'

import './ProductList.css'

const ProductList = (props) => {
  return (
    <section className="product-list">
      <h2>محصولات</h2>
      <ul>
        {props.products.map((item) => (
          <li key={item.id}>
            <span>{item.title}</span>
            <span>{item.amount}x</span>
            <button
              className="delete-button"
              onClick={props.onRemoveItem.bind(this, item.id)}
            >
              حذف
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProductList
