from abc import ABC, abstractmethod

class DeleteProductInterface(ABC):
    @abstractmethod
    def execute(id: int) -> None:
        pass