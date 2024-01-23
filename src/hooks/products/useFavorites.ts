import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import * as Api from "@/api";

export const useFavorites = () => {
  const queryClient = useQueryClient();

  const { data: favoritesProducts, isLoading: isFetchingProducts } = useQuery(["get/favorites"], {
    queryFn: () => Api.products.getFavoritesProducts()
  });

  const { mutate: toggleFavorites } = useMutation({
    mutationFn: (productId: string) => Api.products.toggleFavorites(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(["get/favorites"]);
    }
  });

  const favoritesProductsIdx = favoritesProducts?.map(p => p.id);
  const favoritesTotalCount = favoritesProducts ? favoritesProducts.length : 0;

  return { favoritesProductsIdx, toggleFavorites, favoritesTotalCount, isFetchingProducts, favoritesProducts };
};
