import { ProductEntity } from "../services/api/interfaces";

export type IProduct = Pick<ProductEntity, 'name' | 'id' | 'ean' | 'created_at'>