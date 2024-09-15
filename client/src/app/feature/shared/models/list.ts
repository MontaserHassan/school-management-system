import { Expose } from "class-transformer"

export class list {
  @Expose()
  totalPages?: number;
  @Expose()
  currentPage?: number;
  @Expose()
  limit?: number;
  @Expose()
  skip?: number;
}
