import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CadastroVendedor from './CadastroVendedor';
import PaginaVendedor from './PerfilVendedor';
import CadastroProduto from './Produtos';


const router = createBrowserRouter([
  {
    path: "/",
    element: <CadastroVendedor />,
  },
  {
    path: "/perfilvendedor",
    element: <PaginaVendedor />,
  },
  {
    path: "/PaginaVendedor",
    element: <PaginaVendedor />,
  },
  {
    path: "/produtos",
    element: <CadastroProduto />,
  }
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)