import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import { Title } from '../styles/pages/Home'

interface IProduct {
  id: string
  title: string
}

export default function Home() {
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([])
  const { get, loading, error, response } = useFetch('http://localhost:3333')

  useEffect(() => {
    async function fetchRecommendedProducts() {
      await get('/recommended')
      if (response.ok) setRecommendedProducts(await response.json())
    }
    fetchRecommendedProducts()
  }, [])

  if (loading) return <Title>Carregando...</Title>

  if (error) return <Title>Erro ao carregar a página, tente novamente mais tarde.</Title>

  return (
    <div>
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
