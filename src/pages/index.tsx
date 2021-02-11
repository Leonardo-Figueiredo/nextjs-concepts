import { GetServerSideProps } from 'next'
import Link from 'next/link'
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { Document} from 'prismic-javascript/types/documents'
import { client } from '@/libg/prismic'
import { Title } from '@/styles/pages/Home'
import SEO from '@/components/SEO'

interface HomeProps {
  recommendedProducts: Document[]
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
            <Link href={`/catalog/products/${product.uid}`}>
              <a>{PrismicDOM.RichText.asText(product.data.title)}</a>
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product')
  ])

  return {
    props: {
      recommendedProducts: recommendedProducts.results
    }
  }
}
