import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { FileUpload } from "primereact/fileupload";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { ICreateProductProps } from "../services/api/interfaces";
import { Dispatch, SetStateAction } from "react";
import formatCurrency from "../utils/function/format-currency";

const ProductForm = ({
  productState,
  errorsState,
  selectedFileState,
  cb,
  btnLabel,
  isUploadFile = false,
}: {
  productState: [
    ICreateProductProps,
    Dispatch<SetStateAction<ICreateProductProps>>
  ];
  errorsState: [
    Partial<Record<keyof ICreateProductProps, string>>,
    Dispatch<SetStateAction<Partial<Record<keyof ICreateProductProps, string>>>>
  ];
  selectedFileState: [
    File | null,
    Dispatch<SetStateAction<File | null>> | null
  ];
  cb: (p: any) => Promise<void>;
  btnLabel: string;
  isUploadFile?: boolean;
}) => {
  const [product, setProduct] = productState;
  const [errors] = errorsState;
  const [, setSelectedFile] = selectedFileState;

  const updateState = async () => {
    await cb(product);
  };

  return (
    <>
      <FloatLabel className="w-full mb-4">
        <InputText
          id="name"
          name="name"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          placeholder="Digite o nome do produto"
          className={`w-full ${errors.name ? "p-invalid" : ""}`}
        />
        <label htmlFor="name">Nome do Produto</label>
        {errors.name && <small className="p-error">{errors.name}</small>}
      </FloatLabel>

      {isUploadFile && setSelectedFile && (
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
      )}

      <FloatLabel className="w-full mb-4">
        <InputText
          id="ean"
          name="ean"
          value={product.ean}
          onChange={(e) =>
            setProduct({ ...product, ean: e.target.value.replace(/\D/g, "") })
          }
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
          value={formatCurrency((product.price).toString())}
          onChange={(e) =>
            {
              const price = e.target.value.replace(/[^0-9.]/g, "").slice(0, -2) + "." + e.target.value.replace(/[^0-9.]/g, "").slice(-2)
              
              setProduct({
                ...product,
                price: Number(price),
              });
            }
          }
          placeholder="0,00"
          className={`w-full ${errors.price ? "p-invalid" : ""}`}
        />
        <label htmlFor="price">Preço</label>
        {errors.price && <small className="p-error">{errors.price}</small>}
      </FloatLabel>

      <FloatLabel className="w-full mb-4">
        <InputTextarea
          id="description"
          name="description"
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          placeholder="Digite a descrição"
          maxLength={250}
          rows={5}
          cols={30}
          className={`w-full ${errors.description ? "p-invalid" : ""}`}
          autoResize
        />
        <label htmlFor="description">Descrição</label>
        {errors.description && (
          <small className="p-error">{errors.description}</small>
        )}
      </FloatLabel>

      <div className="flex flex-wrap gap-3 mb-4">
        <div className="flex align-items-center">
          <RadioButton
            inputId="event"
            name="event"
            value="Evento"
            onChange={(e) => setProduct({ ...product, local: e.value })}
            checked={product.local === "Evento"}
          />
          <label htmlFor="event" className="ml-2">
            Evento
          </label>
        </div>

        <div className="flex align-items-center">
          <RadioButton
            inputId="store"
            name="store"
            value="Loja"
            onChange={(e) => setProduct({ ...product, local: e.value })}
            checked={product.local === "Loja"}
          />
          <label htmlFor="store" className="ml-2">
            Loja
          </label>
        </div>
      </div>

      <div className="p-field mb-4">
        <Checkbox
          inputId="active"
          name="active"
          checked={product.active}
          onChange={(e) => setProduct({ ...product, active: product.active })}
          className="mr-2"
        />
        <label htmlFor="active">Ativo</label>
      </div>

      <Button
        label={btnLabel}
        type="button"
        className="w-full"
        onClick={updateState}
      />
    </>
  );
};

export default ProductForm;
