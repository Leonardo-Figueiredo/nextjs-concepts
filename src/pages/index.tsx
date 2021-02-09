import { GetServerSideProps } from 'next'
import IProduct from '@/models/IProduct'
import { Title } from '@/styles/pages/Home'
import SEO from '@/components/SEO'

interface HomeProps {
  recommendedProducts: IProduct[]
}

export default function Home({ recommendedProducts }: HomeProps) {
  return (
    <div>
      <SEO
        title="DevCommerce the Beast"
        image="AppleCode.jpg"
        shouldExcludeTitleSuffix
      />

      <Title>Products</Title>

      <ul>
        {recommendedProducts.map(product => 
          <li key={product.id}>
            <p>{product.title}</p>
          </li>
        )}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.API_URL}/recommended`)
  const recommendedProducts = await response.json()

  return {
    props: {
      recommendedProducts
    }
  }
}
