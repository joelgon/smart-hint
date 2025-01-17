import axios, { AxiosResponse } from "axios";
import { v4 as randomUUID } from "uuid";
import {
  ICreateProductProps,
  ProductCreated,
  ProductEntity,
} from "./interfaces";

const server = axios.create({
  baseURL: process.env.REACT_APP_BACK_END_URL ?? "http://localhost:8000",
});

export const listProduct = async (
  page = 1,
  limit = 20,
  search?: string
): Promise<Array<ProductEntity>> => {
  const searchQuery = search ? `&search=${search}` : "";
  const response = await server.get<
    any,
    AxiosResponse<Array<ProductEntity>, any>,
    undefined
  >(`api/products?page=${page}&limit=${limit}${searchQuery}`, {
    headers: { trace_id: randomUUID() },
  });

  return response.data;
};

export const createProduct = async (
  body: ICreateProductProps
): Promise<ProductCreated> => {
  const response = await server.post<
    any,
    AxiosResponse<ProductCreated, any>,
    ICreateProductProps
  >("api/products", body, { headers: { trace_id: randomUUID() } });

  return response.data;
};

export const putObject = async (url: string, data: any) => {
  await server.put(url, data);
};

export const updatedProject = async (
  id: number,
  product: ICreateProductProps
) => {
  await server.patch(`api/products/${id}`, product, {
    headers: { trace_id: randomUUID() },
  });
};

export const deleteProduct = async (id: number) => {
  await server.delete(`api/products/${id}`, {
    headers: { trace_id: randomUUID() },
  });
};
