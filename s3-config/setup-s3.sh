#!/bin/bash

# Criação do bucket
awslocal s3 mb s3://my-bucket

# Configuração de CORS
awslocal s3api put-bucket-cors --bucket my-bucket --cors-configuration '{
  "CORSRules": [
    {
      "AllowedOrigins": ["*"],
      "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
      "AllowedHeaders": ["*"],
      "ExposeHeaders": ["ETag"],
      "MaxAgeSeconds": 3000
    }
  ]
}'