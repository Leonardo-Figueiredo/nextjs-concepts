import { useRouter } from 'next/router'
// import { Container } from './styles'

const products: React.FC = () => {
  const router = useRouter()

  return <h1>{router.query.slug}</h1>
}

export default products