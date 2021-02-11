import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { Document} from 'prismic-javascript/types/documents'
import { client } from "@/libg/prismic"

interface ProductProps {
  product: Document
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const router = useRouter()

  if (router.isFallback) return <h1>Carregando...</h1>

  return (
    <div>
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>

      <img 
        src={product.data.thumbnail.url} 
        alt={product.data.thumbnail.alt}
        width="300"
      />

      <div dangerouslySetInnerHTML={{ 
        __html: PrismicDOM.RichText.asHtml(product.data.description)
      }}>    
      </div>

      <p>Price: ${product.data.price}</p>
    </div>
  )
}

export default Product

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params

  const product = await client().getByUID('product', String(slug), {})

  return {
    props: {
      product
    },
    revalidate: 5,
  }
}
