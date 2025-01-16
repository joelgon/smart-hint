import { useEffect, useState } from "react";
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";
import { listProduct } from "../../services/api";
import { ProductEntity } from "../../services/api/interfaces";
import { Link } from "react-router-dom";

const Home = () => {
  const [page, setPage] = useState<number>(1);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<ProductEntity>>([]);

  const previus = async () => {
    const updatedPage = page - 1 <= 0 ? 1 : page - 1;
    setPage(updatedPage);
  };

  const next = async () => {
    const updatedPage = page + 1;
    setPage(updatedPage);
  };

  const itemTemplate = (data: ProductEntity) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={`${data.image_url}`}
            alt={data.name}
          />
          <div className="flex flex-column lg:flex-row justify-content-between align-items-center xl:align-items-start lg:flex-1 gap-4">
            <div className="flex flex-column align-items-center lg:align-items-start gap-3">
              <div className="flex flex-column gap-1">
                <div className="text-2xl font-bold text-900">{data.name}</div>
                <div className="text-700">{data.description}</div>
              </div>
              <div className="flex flex-column gap-2">
                <span className="flex align-items-center gap-2">
                  <span className="font-semibold">{data.ean}</span>
                </span>
              </div>
            </div>
            <div className="flex flex-row lg:flex-column align-items-center lg:align-items-end gap-4 lg:gap-2">
              <span className="text-2xl font-semibold">{data.price}</span>
              <Button
                icon="pi pi-pencil"
                label="Editar"
                disabled={false}
                severity="warning"
              ></Button>
              <Button
                icon="pi pi-trash"
                label="Excluir"
                disabled={false}
                severity="danger"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setDisableButton(true);

      try {
        const product = await listProduct(page);

        setProducts(product);
      } catch (error) {
        console.log(error);
      }

      setDisableButton(false);
    };

    fetchProducts();
  }, [page]);

  return (
    <>
      {/* <Button label="Filtrar" id="filterToggle" />

      <div className="filter-section" id="filterSection">
        <input type="text" placeholder="Pesquisar Produto..." />
        <Button label="Aplicar Filtro" />
      </div> */}

      <DataScroller
        value={products}
        itemTemplate={itemTemplate}
        rows={5}
        inline
        scrollHeight="500px"
        header={
          <div className="flex p-justify-between" >
              <h3>Consulte os seus Produtos cadastrados na sua Loja ou realize o cadastro de novos Produtos</h3>
            <Link
              to="/register"
              className="p-button p-component"
              style={{ textDecoration: "none" }}
            >
              Adicionar Produto
            </Link>
          </div>
        }
      />

      {/* <div className="pagination">
        <Button id="previus" label="&laquo; Anterior" onClick={() => previus()} disabled={disableButton}/>
        <Button id="next" label="Próximo &raquo;" onClick={() => next()} disabled={disableButton}/>
      </div> */}
    </>
  );
};

export default Home;
