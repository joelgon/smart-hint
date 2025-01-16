import { useState } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { createProductSchema } from "../../utils/validators/create-product.validator";
import { ICreateProductProps } from "../../services/api/interfaces";
import { ValidationError } from "yup";
import { createProduct, putObject } from "../../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate()

  const [errors, setErrors] = useState<
    Partial<Record<keyof ICreateProductProps, string>>
  >({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [ean, setEan] = useState<string>("");
  const [price, setPrice] = useState<string>("0");
  const [description, setDescription] = useState<string>("");
  const [local, setLocal] = useState<"Evento" | "Loja">("Evento");
  const [active, setActive] = useState<boolean>(true);

  const formatCurrency = (value: string) => {
    if (!value) return "";
    const numericValue = Number(value.replace(/\D/g, "").replace(",", "."));
    const formattedValue = (numericValue / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formattedValue;
  };

  const handleInputChange = (value: string) => {
    setPrice(formatCurrency(value));
  };

  const requestCreateProduct = async () => {
    try {
      const product: ICreateProductProps = {
        name,
        description,
        local,
        ean,
        price: Number(price.replace(/\D/g, "").replace(",", ".")) / 100,
      };

      await createProductSchema.validate(
        { ...product, selectedFile },
        { abortEarly: false }
      );

      const { pre_signed_url } = await createProduct(product);

      await putObject(pre_signed_url, selectedFile)

      navigate("/");
    } catch (error) {
      console.log(error);
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

        <FloatLabel className="w-full mb-4">
          <InputText
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite o nome do produto"
            className={`w-full ${errors.name ? "p-invalid" : ""}`}
          />
          <label htmlFor="name">Nome do Produto</label>
          {errors.name && <small className="p-error">{errors.name}</small>}
        </FloatLabel>

        <FloatLabel className="w-full mb-4">
          <FileUpload
            id="image"
            name="image"
            auto
            onSelect={(e) => setSelectedFile(e.files[0])}
            chooseLabel="Selecionar Imagem PNG"
            className="w-full"
            accept=".png"
          />
          {(errors as any).selectedFile && (
            <small className="p-error">{(errors as any).selectedFile}</small>
          )}
        </FloatLabel>

        <FloatLabel className="w-full mb-4">
          <InputText
            id="ean"
            name="ean"
            value={ean}
            onChange={(e) => setEan(e.target.value.replace(/\D/g, ""))}
            placeholder="Digite o EAN"
            maxLength={13}
            className={`w-full ${errors.ean ? "p-invalid" : ""}`}
          />
          <label htmlFor="ean">EAN</label>
          {errors.ean && <small className="p-error">{errors.ean}</small>}
        </FloatLabel>

        <FloatLabel className="w-full mb-4">
          <InputText
            id="price"
            value={price}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="0,00"
            className={`w-full ${errors.price ? "p-invalid" : ""}`}
          />
          <label htmlFor="price">Preço</label>
        </FloatLabel>
        {errors.price && <small className="p-error">{errors.price}</small>}

        <FloatLabel className="w-full mb-4">
          <InputTextarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite a descrição"
            maxLength={250}
            rows={5}
            cols={30}
            className={`w-full ${errors.description ? "p-invalid" : ""}`}
            autoResize
          />
          <label htmlFor="description">Descrição</label>
        </FloatLabel>
        {errors.description && (
          <small className="p-error">{errors.description}</small>
        )}

        <div className="flex flex-wrap gap-3 mb-4">
          <div className="flex align-items-center">
            <RadioButton
              inputId="event"
              name="event"
              value="Evento"
              onChange={(e) => setLocal(e.value)}
              checked={local === "Evento"}
            />
            <label htmlFor="ingredient1" className="ml-2">
              Evento
            </label>
          </div>

          <div className="flex align-items-center">
            <RadioButton
              inputId="store"
              name="store"
              value="Loja"
              onChange={(e) => setLocal(e.value)}
              checked={local === "Loja"}
            />
            <label htmlFor="ingredient2" className="ml-2">
              Loja
            </label>
          </div>
        </div>

        <div className="p-field mb-4">
          <Checkbox
            inputId="active"
            name="active"
            checked={active}
            onChange={(e) => setActive(!active)}
            className="mr-2"
          />
          <label htmlFor="active">Ativo</label>
        </div>

        <Button
          label="Cadastrar Produto"
          type="button"
          className="w-full"
          onClick={requestCreateProduct}
        />
      </div>
    </div>
  );
};

export default Register;
