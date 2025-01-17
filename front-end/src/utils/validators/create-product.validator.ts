import * as Yup from "yup";

export const createProductSchema = Yup.object().shape({
  name: Yup.string()
    .required("O nome é obrigatório")
    .max(150, "O nome deve ter no máximo 150 caracteres"),
  description: Yup.string()
    .required("A descrição é obrigatória")
    .max(250, "A descrição deve ter no máximo 250 caracteres"),
  ean: Yup.string()
    .required("O EAN é obrigatório")
    .matches(/^\d{13}$/, "O EAN deve conter exatamente 13 dígitos numéricos"),
  price: Yup.string()
    .required("O preço é obrigatório")
    .test(
      "integer-part-length",
      "A parte inteira do preço deve ter no máximo 25 dígitos",
      (value) => {
        if (!value) return false;
        const [integerPart] = value.split(".");
        return integerPart.length <= 25;
      }
    )
    .test(
      "decimal-part-length",
      "A parte decimal do preço deve ter no máximo 2 dígitos",
      (value) => {
        if (!value) return false;
        const parts = value.split(".");
        return parts.length < 2 || parts[1].length <= 2;
      }
    )
    .matches(
      /^\d+(\.\d{1,2})?$/,
      "O preço deve ser um número com até 25 dígitos inteiros e 2 decimais"
    ),
  local: Yup.mixed()
    .required("O local é obrigatório")
    .oneOf(["Evento", "Loja"], `O local deve ser 'Evento' ou 'Loja'`),
  selectedFile: Yup.mixed()
    .nullable()
    .test(
      "is-file",
      "Você deve selecionar um arquivo válido",
      (value) => value === null || value instanceof File
    )
    .test(
      "is-png",
      "O arquivo deve ser uma imagem PNG",
      (value) => value === null || (value as File)?.type === "image/png"
    ),
  active: Yup.boolean()
    .required("O campo active é obrigatório")
    .typeError("O campo active deve ser verdadeiro ou falso"),
});
