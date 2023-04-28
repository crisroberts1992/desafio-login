export function productsView(req, res) {
    res.render('products', { pageTitle: 'Productos' }) //el archivo "products" lo busca en la carperta /views
  }