'use client'

import {useFavorites} from '@/hooks/products/useFavorites'

import ProductsList from '@/components/modules/Products/ProductsList/ProductsList'
import PageSpinner from '@/components/ui/PageSpinner/PageSpinner'

const Favorites = () => {
  const {isFetchingProducts, favoritesProducts} = useFavorites()
  
  if(isFetchingProducts) return <PageSpinner isLoading={isFetchingProducts} />
  
  return <div><h1>Favorites page</h1>
  {favoritesProducts?.length ? <ProductsList products={favoritesProducts} /> : 'there is no products'}
  </div>
}

export default Favorites