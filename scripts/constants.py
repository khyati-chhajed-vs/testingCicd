SERVICE_NAMES = {
    "vianaar":"vianaar"
}

CUSTOM_HEADERS = [
    {
        "in": "header",
        "name": "Host",
        "schema": {
                "type": "string"
        },
        "required": False
    },
    {
        "in": "header",
        "name": "Authorization",
        "schema": {
                "type": "string"
        },
        "required": False
    },
    {
        "in": "header",
        "name": "service_name",
        "schema": {
                "type": "string"
        },
        "required": False
    },
    {
        "in": "header",
        "name": "useridfromtoken",
        "schema": {
                "type": "string"
        },
        "required": False
    }

]

CORS = {
    "Access-Control-Allow-Origin": {
        "type": "string"
    },
    "Access-Control-Allow-Methods": {
        "type": "string"
    },
    "Access-Control-Max-Age": {
        "type": "string"
    },
    "Access-Control-Allow-Headers": {
        "type": "string"
    },
    "Access-Control-Expose-Headers": {
        "type": "string"
    },
    "Custom-head": {
        "type": "string"
    }
}


OPTIONS_METHOD = {
    "consumes": ["application/json"],
    "parameters": [],
    "responses": {
        "200": {
            "description": "200 response",
            "headers": {
                "Access-Control-Allow-Origin": {
                    "type": "string"
                },
                "Access-Control-Allow-Methods": {
                    "type": "string"
                },
                "Access-Control-Allow-Headers": {
                    "type": "string"
                },
            }
        }
    },
    "x-amazon-apigateway-integration": {
        "responses": {
            "default": {
                "statusCode": "200",
                "responseParameters": {
                    "method.response.header.Access-Control-Allow-Methods": "'GET,OPTIONS,PATCH,PUT,POST,DELETE'",
                    "method.response.header.Access-Control-Allow-Headers": "'*'",
                    "method.response.header.Access-Control-Allow-Origin": "'*'"
                }
            }
        },
        "requestTemplates": {
            "application/json": "{\"statusCode\": 200}"
        },
        "passthroughBehavior": "when_no_match",
        "type": "mock"
    }
}
