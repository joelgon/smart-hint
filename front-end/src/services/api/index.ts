import axios, { AxiosResponse } from "axios";
import { v4 as randomUUID } from "uuid";
import {
  ICreateProductProps,
  ProductCreated,
  ProductEntity,
} from "./interfaces";

const server = axios.create({ baseURL: process.env.REACT_APP_BACK_END_URL });

const listProduct = async (
  page = 1,
  limit = 20
): Promise<Array<ProductEntity>> => {
  const response = await server.get<
    any,
    AxiosResponse<Array<ProductEntity>, any>,
    undefined
  >(`api/products?page=${page}&limit=${limit}`, {
    headers: { trace_id: randomUUID() },
  });

  return response.data;
};

const createProduct = async (
  body: ICreateProductProps
): Promise<ProductCreated> => {
  const response = await server.post<
    any,
    AxiosResponse<ProductCreated, any>,
    ICreateProductProps
  >("api/products", body, { headers: { trace_id: randomUUID() } });

  return response.data;
};

const putObject = async (url: string, data: any) => {
    await server.put(url, data);
}

export { listProduct, createProduct, putObject };
