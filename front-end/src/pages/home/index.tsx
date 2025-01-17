import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { DataScroller } from "primereact/datascroller";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { ValidationError } from "yup";

import { listProduct, updatedProject } from "../../services/api";
import {
  ICreateProductProps,
  ProductEntity,
} from "../../services/api/interfaces";
import { Dialog } from "primereact/dialog";
import ProductForm from "../../components/product-form";
import { createProductSchema } from "../../utils/validators/create-product.validator";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [products, setProducts] = useState<Array<ProductEntity>>([]);
  const [product, setProduct] = useState<ProductEntity | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ICreateProductProps, string>>
  >({});

  const openModal = (id: string) => {
    setVisible(true);

    const selectedProduct = products.find(
      (product) => product.id.toString() === id
    );
    if (selectedProduct) setProduct(structuredClone(selectedProduct));
  };

  const requestUpdateProduct = async (updatedProduct: ProductEntity | null) => {
    try {
      if (!updatedProduct) return;

      const productUpdate: ICreateProductProps = {
        active: updatedProduct.active,
        description: updatedProduct.description,
        ean: updatedProduct.ean,
        local: updatedProduct.local,
        name: updatedProduct.name,
        price: updatedProduct.price,
      };

      await createProductSchema.validate(
        { ...productUpdate, selectedFile: null },
        {
          abortEarly: false,
        }
      );

      await updatedProject(updatedProduct.id, productUpdate);

      const newProducts = products.map((p) =>
        p.id.toString() === updatedProduct.id.toString()
          ? { ...p, ...productUpdate }
          : p
      );
      setProducts(newProducts);

      setVisible(false);
    } catch (error) {
      console.log("catch caralho", JSON.stringify(error));
      if (error instanceof ValidationError) {
        const fieldErrors: Partial<Record<keyof ICreateProductProps, string>> =
          {};

        error.inner.forEach((err) => {
          if (err.path)
            fieldErrors[err.path as keyof ICreateProductProps] = err.message;
        });

        setErrors(fieldErrors);
      }
      setVisible(false);
    }
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
                id={data.id.toString()}
                icon="pi pi-pencil"
                label="Editar"
                disabled={false}
                severity="warning"
                onClick={(e) => openModal(e.currentTarget.id)}
              />
              <Button
                icon="pi pi-trash"
                label="Excluir"
                disabled={false}
                severity="danger"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    setPage(1);
  }, [search]);

  useEffect(() => {
    const fetchProducts = async () => {
      setDisableButton(true);

      const response = await listProduct(page, 20, search);

      if (response.length < 20) setLastPage(true);
      else setLastPage(false);

      setProducts(response);

      setDisableButton(false);
    };

    fetchProducts();
  }, [page, search]);

  return (
    <div className="w-full">
      <div className="w-full mb-4 flex align-items-center w-full gap-2">
        <InputText
          id="name"
          name="name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Digite o nome do produto"
          className="flex-1"
        />
      </div>

      <DataScroller
        value={products}
        itemTemplate={itemTemplate}
        rows={20}
        inline
        scrollHeight="600px"
        header={
          <div className="flex p-justify-between">
            <h3>
              Consulte os seus Produtos cadastrados na sua Loja ou realize o
              cadastro de novos Produtos
            </h3>
            <Link
              to="/register"
              className="p-button p-component"
              style={{ textDecoration: "none" }}
            >
              Adicionar Produto
            </Link>
          </div>
        }
        className="w-full h-full"
      />

      <div className="flex justify-content-center align-items-center mt-1">
        <Button
          icon="pi pi-chevron-left"
          disabled={page === 1 || disableButton}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="mr-2"
        />
        <Button
          icon="pi pi-chevron-right"
          iconPos="right"
          className="mr-2"
          disabled={disableButton || lastPage}
          onClick={() => setPage((prev) => prev + 1)}
        />
      </div>
      <Dialog
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="w-full h-full flex flex-column justify-content-center align-items-center ">
          <ProductForm
            btnLabel="Atualizar Produto"
            errorsState={[errors, setErrors]}
            productState={[
              product as ICreateProductProps,
              setProduct as Dispatch<SetStateAction<ICreateProductProps>>,
            ]}
            cb={requestUpdateProduct}
            selectedFileState={[null, null]}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default Home;
