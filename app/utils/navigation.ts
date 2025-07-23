export const routes = {
  home: '/',
  shop: '/shop',
  product: (id: string) => `/products/${id}`,
  cart: '/cart',
  checkout: '/checkout',
  account: '/account',
  login: '/login',
  signup: '/signup',
};
