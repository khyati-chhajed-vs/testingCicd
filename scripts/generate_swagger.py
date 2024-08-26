import json
import argparse
import constants

parser = argparse.ArgumentParser(description='Swagger generator')
parser.add_argument('--env', action="store", dest='env', default='dev')
args = parser.parse_args()

with open('./swagger/header.json') as user_file:
    file_contents = json.load(user_file)

file_contents['paths'] = {}

with open('./swagger/vianaar.json') as vianaar:
    vianaar_json = json.load(vianaar)


final_files = {}
final_files.update(vianaar_json)

uris = list(final_files)
env_name = args.env
print(env_name)

for uri in uris:
    apis_info = final_files[uri]
    api_methods = list(apis_info)
    # Determine the service_name based on the uri
    if uri in vianaar_json:
        print("uri in vianaar", uri)
        service_name = constants.SERVICE_NAMES["vianaar"]
    service_identifier = env_name == "prod" and "alb_arn" or service_name

    for api_method in api_methods:
        api_path = "http://" + "${stageVariables." + service_identifier + "}" + uri
        print("uriss", uri)

        apis_info[api_method]["produces"] = ["application/json"]
        if "parameters" in apis_info[api_method]:
            apis_info[api_method]["parameters"] += constants.CUSTOM_HEADERS
            for param in apis_info[api_method]["parameters"]:
                if "schema" in param and "allOf" in param["schema"]:
                    param["schema"].pop("allOf")
        else:
            apis_info[api_method]["parameters"] = constants.CUSTOM_HEADERS

        if "200" in apis_info[api_method]["responses"]:
            apis_info[api_method]["responses"]["200"]["headers"] = constants.CORS
        else:
            apis_info[api_method]["responses"]["200"] = {}
            apis_info[api_method]["responses"]["200"]["headers"] = constants.CORS

        if "400" in apis_info[api_method]["responses"]:
            apis_info[api_method]["responses"]["400"]["headers"] = constants.CORS
        else:
            apis_info[api_method]["responses"]["400"] = {}
            apis_info[api_method]["responses"]["400"]["headers"] = constants.CORS

        if "201" in apis_info[api_method]["responses"]:
            apis_info[api_method]["responses"]["201"]["headers"] = constants.CORS
        else:
            apis_info[api_method]["responses"]["201"] = {}
            apis_info[api_method]["responses"]["201"]["headers"] = constants.CORS

        if "204" in apis_info[api_method]["responses"]:
            apis_info[api_method]["responses"]["204"]["headers"] = constants.CORS
        else:
            apis_info[api_method]["responses"]["204"] = {}
            apis_info[api_method]["responses"]["204"]["headers"] = constants.CORS

        if "401" in apis_info[api_method]["responses"]:
            apis_info[api_method]["responses"]["401"]["headers"] = constants.CORS
        else:
            apis_info[api_method]["responses"]["401"] = {}
            apis_info[api_method]["responses"]["401"]["headers"] = constants.CORS

        if "404" in apis_info[api_method]["responses"]:
            apis_info[api_method]["responses"]["404"]["headers"] = constants.CORS
        else:
            apis_info[api_method]["responses"]["404"] = {}
            apis_info[api_method]["responses"]["404"]["headers"] = constants.CORS

        if "403" in apis_info[api_method]["responses"]:
            apis_info[api_method]["responses"]["403"]["headers"] = constants.CORS
        else:
            apis_info[api_method]["responses"]["403"] = {}
            apis_info[api_method]["responses"]["403"]["headers"] = constants.CORS

        if "409" in apis_info[api_method]["responses"]:
            apis_info[api_method]["responses"]["409"]["headers"] = constants.CORS
        else:
            apis_info[api_method]["responses"]["409"] = {}
            apis_info[api_method]["responses"]["409"]["headers"] = constants.CORS

        if "500" in apis_info[api_method]["responses"]:
            apis_info[api_method]["responses"]["500"]["headers"] = constants.CORS
        else:
            apis_info[api_method]["responses"]["500"] = {}
            apis_info[api_method]["responses"]["500"]["headers"] = constants.CORS

        # Check if the URI contains 'admin', 'login', or 'registration' to exclude security
        # if 'admin' not in uri and 'login' not in uri and 'registration' not in uri:
        #     apis_info[api_method]["security"] = [{"authorizer": []}]

        apis_info[api_method]["x-amazon-apigateway-integration"] = {
            "type": "http",
            "httpMethod": api_method.upper(),
            "uri": api_path,
            "responses": {
                "200": {
                    "statusCode": "200",
                    "responseParameters": {
                        "method.response.header.Access-Control-Allow-Origin": "'*'",
                        "method.response.header.Custom-head": "'afzal'"
                    }
                },
                "400": {
                    "statusCode": "400",
                    "responseParameters": {
                        "method.response.header.Access-Control-Allow-Origin": "'*'",
                        "method.response.header.Custom-head": "'afzal'"
                    }
                },
                "201": {
                    "statusCode": "201",
                    "responseParameters": {
                        "method.response.header.Access-Control-Allow-Origin": "'*'",
                        "method.response.header.Custom-head": "'afzal'"
                    }
                },
                "204": {
                    "statusCode": "204",
                    "responseParameters": {
                        "method.response.header.Access-Control-Allow-Origin": "'*'",
                        "method.response.header.Custom-head": "'afzal'"
                    }
                },
                "401": {
                    "statusCode": "401",
                    "responseParameters": {
                        "method.response.header.Access-Control-Allow-Origin": "'*'",
                        "method.response.header.Custom-head": "'afzal'"
                    }
                },
                "404": {
                    "statusCode": "404",
                    "responseParameters": {
                        "method.response.header.Access-Control-Allow-Origin": "'*'",
                        "method.response.header.Custom-head": "'afzal'"
                    }
                },
                "403": {
                    "statusCode": "403",
                    "responseParameters": {
                        "method.response.header.Access-Control-Allow-Origin": "'*'",
                        "method.response.header.Custom-head": "'afzal'"
                    }
                },
                "409": {
                    "statusCode": "409",
                    "responseParameters": {
                        "method.response.header.Access-Control-Allow-Origin": "'*'",
                        "method.response.header.Custom-head": "'afzal'"
                    }
                },
                "500": {
                    "statusCode": "500",
                    "responseParameters": {
                        "method.response.header.Access-Control-Allow-Origin": "'*'",
                        "method.response.header.Custom-head": "'afzal'"
                    }
                }
            },
            "requestParameters": {
                "integration.request.header.service_name": "'" + service_name.upper() + "'",
                "integration.request.header.Host": "stageVariables.WebappPublicRestEndpoint",
                "integration.request.header.Authorization": "method.request.header.Authorization",
                "integration.request.header.useridfromtoken": "context.authorizer.userId"
            },
            "passthroughBehavior": "when_no_match"
        }

        integrationParams = apis_info[api_method]["x-amazon-apigateway-integration"]["requestParameters"]
        for param in apis_info[api_method]["parameters"]:
            if param["in"] == "path":
                integrationParams[f"integration.request.path.{param['name']}"] = f"method.request.path.{param['name']}"
            elif param["in"] == "query":
                print("param in query", param)
                integrationParams[f"integration.request.querystring.{param['name']}"] = f"method.request.querystring.{param['name']}"

    apis_info["options"] = constants.OPTIONS_METHOD
    file_contents['paths'][uri] = apis_info

# file_contents['securityDefinitions'] = {
#     "authorizer": {
#         "type": "apiKey",
#         "name": "Authorization",
#         "in": "header",
#         "x-amazon-apigateway-authtype": "custom",
#         "x-amazon-apigateway-authorizer": {
#             "type": "request",
#             "authorizerUri": "arn:aws:apigateway:ap-south-1:lambda:path/2015-03-31/functions/arn:aws:lambda:ap-south-1:954938141736:function:dehurdle-agw-authorizer-dev/invocations",
#             #"authorizerResultTtlInSeconds": 300,
#             "identitySource": "method.request.header.Authorization"
#         }
#     }
# }

with open('./swagger/master-swagger.json', "w") as swagger:
    json.dump(file_contents, swagger)

print("Successfully generated master-swagger file in './swagger/master-swagger.json'")


# Run - python3 generate_swagger.py # default dev
# Run - python3 generate_swagger.py --env prod