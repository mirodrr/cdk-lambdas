import json
import boto3

#Replace this with the lambda function that implements your agent api schema
def lambda_handler(event, context):

    print(event)
    return {
        "status": "success"
    }