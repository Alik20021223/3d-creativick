export enum REQUEST_URL {
  ADD_SHOPPING_CART_ITEM = '/dashboard/user/cart/insert-product',
  GET_SHOPPING_CART = '/dashboard/user/cart',
  GET_ORDERS = '/dashboard/user/orders/paginate',
  GET_FAVORITES = '/dashboard/user/profile/liked/products',
  ADD_FAVORITE = '/rest/products/',
  DELETE_SHOPPING_CART = 'dashboard/user/cart/product/delete',
  DELETE_ALL_SHOPPING_CART = '/dashboard/user/cart/delete',
  PROFILE = '/dashboard/user/profile/show',
  PROFILE_UPDATE = '/dashboard/user/profile/update',
}
