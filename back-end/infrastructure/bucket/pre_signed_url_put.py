from dotenv import load_dotenv
from typing import Dict
import os
import boto3

load_dotenv()

endpoint_url = os.getenv("S3_ENDPOINT")
network_endpoint_url = os.getenv("NETWORK_S3_ENDPOINT")

class PreSignedUrlPut:
    def __init__(self):
        self.s3 = boto3.client('s3', endpoint_url=network_endpoint_url)

    def execute(self, bucket_name: str, object_key: str, content_type: str) -> Dict[str, str]:
        try:
            pre_signed_url = self.s3.generate_presigned_url(
                ClientMethod='put_object',
                Params={
                    'Bucket': bucket_name,
                    'Key': object_key,
                    'ContentType': content_type,
                },
                ExpiresIn=3600,
            );
        
            url = f"{endpoint_url}/{bucket_name}/{object_key}";
        
            return {
                "pre_signed_url": pre_signed_url,
                "url": url
            }
        except Exception as e:
            print(e)
            raise RuntimeError("Não foi possível gerar a URL pré-assinada. Verifique os parâmetros e tente novamente.") from e
