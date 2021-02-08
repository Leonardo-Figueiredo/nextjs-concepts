import { GetServerSideProps } from 'next'
import { useEffect, useState } from 'react'
import useFetch from 'use-http'
import { Title } from '../styles/pages/Home'

interface IProduct {
  id: string
  title: string
}

interface HomeProps {
  recommendedProducts: IProduct[]
}


export default function Home({ recommendedProducts }: HomeProps) {
  useEffect(() => {
    async function fetchRecommendedProducts() {
      
    }
    fetchRecommendedProducts()
  }, [])

  // if (loading) return <Title>Carregando...</Title>

  // if (error) return <Title>Erro ao carregar a página, tente novamente mais tarde.</Title>

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

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended')
  const recommendedProducts = await response.json()

  return {
    props: {
      recommendedProducts
    }
  }
}
