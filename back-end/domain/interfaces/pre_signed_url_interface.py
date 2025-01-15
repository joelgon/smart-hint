from abc import ABC, abstractmethod
from typing import Dict

class PreSignedUrlInterface(ABC):
    @abstractmethod
    def execute(self, bucket_name: str, object_key: str, content_type: str) -> Dict[str, str]:
        pass;