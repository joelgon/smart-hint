from pydantic import BaseModel
from typing import Optional
from shared.enum.sort_enum import SortOrderEnum

class ListQueryParams(BaseModel):
    page: Optional[int] = 1
    limit: Optional[int] = 10
    sort: Optional[SortOrderEnum] = SortOrderEnum.ASC
    search: Optional[str] = None

    def offset(self) -> int:
        return (self.page - 1) * self.limit
