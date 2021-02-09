import { GetStaticProps } from "next"
import IProduct from "../models/IProduct"

interface Top10Props {
  products: IProduct[]
}

export default function Top10({ products }: Top10Props) {
  return (
    <div>
      <h1>Top 10</h1>

      <ul>
        {products.map(product => 
          <li key={product.id}>
            <p>{product.title}</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context) => {
  const response = await fetch(`${process.env.API_URL}/products`)
  const products = await response.json()

  return {
    props: {
      products,
    },
    revalidate: 5,
  }
}
