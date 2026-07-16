import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import { Link } from 'react-router-dom'
function Product({ product }) {
  return (
    <Card className="my-3 rounded">
      <Link to={`/product/${product._id}`}>
      <Card.Img src={product.image} style={{marginTop: '10px', height: '150px', objectFit: 'contain'}} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} className="text-dark">
          <Card.Title as="h4">
            {product.product_name}
          </Card.Title>
        </Link>
       <Card.Text as="div">
        {`${product.rating} rating from ${product.num_reviews} reviews`} 
        </Card.Text>
        <Card.Text as="div">Rs. {product.price}</Card.Text>
         <Card.Text as="div">
          <Rating value={product.rating} text={`${product.num_reviews} reviews`} />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Product
