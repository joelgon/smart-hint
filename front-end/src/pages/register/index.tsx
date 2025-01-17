import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationError } from "yup";

import { createProductSchema } from "../../utils/validators/create-product.validator";
import { ICreateProductProps } from "../../services/api/interfaces";
import { createProduct, putObject } from "../../services/api";
import ProductForm from "../../components/product-form";

const Register = () => {
  const navigate = useNavigate();

  const [errors, setErrors] = useState<
    Partial<Record<keyof ICreateProductProps, string>>
  >({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [product, setProduct] = useState<ICreateProductProps>({
    active: true,
    description: "",
    ean: "",
    local: "Evento",
    name: "",
    price: 0,
  });

  const requestCreateProduct = async () => {
    try {
      const newProduct = { ...product }
      await createProductSchema.validate(
        { ...newProduct, selectedFile },
        { abortEarly: false }
      );

      const { pre_signed_url } = await createProduct(newProduct);

      await putObject(pre_signed_url, selectedFile);

      navigate("/");
    } catch (error) {
      if (error instanceof ValidationError) {
        const fieldErrors: Partial<Record<keyof ICreateProductProps, string>> =
          {};

        error.inner.forEach((err) => {
          if (err.path)
            fieldErrors[err.path as keyof ICreateProductProps] = err.message;
        });

        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div className="w-full h-full flex justify-content-center">
      <div className="w-full h-full max-width-700 flex flex-column justify-content-center align-items-center ">
        <h1>Cadastro de Produto</h1>

        <ProductForm
          btnLabel="Cadastrar Produto"
          errorsState={[errors, setErrors]}
          productState={[product, setProduct]}
          cb={requestCreateProduct}
          selectedFileState={[selectedFile, setSelectedFile]}
          isUploadFile={true}
        />
      </div>
    </div>
  );
};

export default Register;
