import { GetServerSideProps } from "next"
import Link from 'next/link'
import { useRouter } from "next/router"
import { ChangeEvent, FormEvent, useCallback, useState } from "react"
import Prismic from 'prismic-javascript'
import PrismicDOM from 'prismic-dom'
import { Document} from 'prismic-javascript/types/documents'
import { client } from "@/libg/prismic"

interface SearchProps {
  searchResults: Document[]
}

const Search: React.FC<SearchProps> = ({ searchResults }) => {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSearch = useCallback((event: FormEvent) => {
    event.preventDefault()
    
    router.push(
      `/search?q=${encodeURIComponent(searchTerm)}`
    )

    setSearchTerm('')
  }, [searchTerm])

  const handleChangeSearchTerm = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
    }, 
  [])

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChangeSearchTerm}
        />

        <button type="submit">Search</button>
      </form>

      <ul>
        {searchResults.map(product => 
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

export default Search

export const getServerSideProps: GetServerSideProps<SearchProps> = async (context) => {
  const { q: query } = context.query

  if (!query) return { props: { searchResults: [] } }

  const searchResults = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
    Prismic.Predicates.fulltext('my.product.title', String(query))
  ])

  return {
    props: { 
      searchResults: searchResults.results
    }
  }
}
