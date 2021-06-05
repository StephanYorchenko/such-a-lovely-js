import json
import re
import os
from enum import Enum
from collections import defaultdict

import yaml


class SwaggerJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if 'serialize' in dir(obj):
            return obj.serialize()
        return json.JSONEncoder.default(self, obj)


class SwaggerModel(object):
    def __init__(self, model_name, model_data):
        self.name = model_name
        self.type = None
        self.enum = None
        self.example = None
        self.format = None
        self.properties = {}

        self.name, self.is_required = Swagger.check_sign(self.name, Swagger.REQUIRED_SIGN)
        self.name, self.is_nullable = Swagger.check_sign(self.name, Swagger.NULLABLE_SIGN)
        self.name, self.is_array = Swagger.check_sign(self.name, Swagger.ARRAY_SIGN)

        if type(model_data) is dict:
            self.type = 'object'
            for key, value in model_data.items():
                model = SwaggerModel(key, value)
                self.properties[model.name] = model
            return

        if type(model_data) is str:
            link_name, is_link = Swagger.check_sign(model_data, Swagger.LINK_SIGN, True)
            if is_link:
                if not link_name in Swagger.models:
                    exit(f'Model ${link_name} does not exist yet. Maybe you messed up the order.')

                self.type = Swagger.models[link_name].type
                self.properties = Swagger.models[link_name].properties
                return

            self.enum, model_data = Swagger.check_enum(model_data)
            self.example, model_data = Swagger.check_example(model_data)

            if model_data == 'file':
                model_data = 'string'
                self.format = 'binary'

            self.type = model_data
            return

        exit(f'Data type {type(model_data)} of "{self.name}: {model_data}" is incorrect. Allowed types: {dict}, {str}.')

    def serialize(self):
        data = {
            'type': self.type,
        }

        if self.type == 'object':
            data['properties'] = dict([(model.name, model) for model in self.properties.values()])
            required_list = [model.name for model in self.properties.values() if model.is_required]
            if required_list:
                data['required'] = required_list

        if self.is_nullable:
            data['nullable'] = True

        if self.enum:
            data['enum'] = self.enum

        if self.example:
            data['example'] = self.example

        if self.format:
            data['format'] = self.format

        if self.is_array:
            data = {
                'type': 'array',
                'items': data,
            }

        return data

    def __repr__(self):
        return json.dumps(self, cls=SwaggerJSONEncoder)


class SwaggerParameter(object):
    def __init__(self, source, name, type, is_reuired, enum=None):
        self.source = source
        self.type = type
        self.name = name
        self.is_reuired = is_reuired
        self.enum = enum

    def serialize(self):
        data = {
            'in': self.source,
            'name': self.name,
            'schema': {
                'type': self.type,
            },
            'required': self.is_reuired,
        }

        if self.enum:
            data['schema']['enum'] = self.enum
        return data

    def __repr__(self):
        return json.dumps(self, cls=SwaggerJSONEncoder)


class SwaggerHandler(object):
    def __init__(self, section_name, handler_method, handler_path, handler_data):
        self.section = section_name
        self.method = handler_method
        self.path = handler_path
        self.request = SwaggerModel('schema', handler_data['request']) if 'request' in handler_data else None
        self.multipartRequest = SwaggerModel('schema', handler_data['multipartRequest']) if 'multipartRequest' in handler_data else None
        self.response = SwaggerModel('schema', handler_data['response'])
        self.parameters = []
        self.deprecated = handler_data.get('deprecated', False)
        self.description = handler_data.get('description', None)

        for match in re.findall(r'{([^\{]+)}', self.path):
            data = match.split(':')
            name = data[0]
            if len(data) == 2:
                type = data[1]
                self.path = self.path.replace(match, data[0])
            else:
                type = 'number'
            self.parameters.append(SwaggerParameter('path', name, type, True))

        headers = handler_data.get('headers', [])
        for header in headers:
            header, is_required = Swagger.check_sign(header, Swagger.REQUIRED_SIGN)
            self.parameters.append(SwaggerParameter('header', header, 'string', is_required))

        query_parameters = handler_data.get('query', {})
        for (query_name, query_value) in query_parameters.items():
            enum, query_value = Swagger.check_enum(query_value)
            query_name, is_required = Swagger.check_sign(query_name, Swagger.REQUIRED_SIGN)
            self.parameters.append(SwaggerParameter('query', query_name, query_value, is_required, enum))

    def __repr__(self):
        return json.dumps(self, cls=SwaggerJSONEncoder)

    def serialize(self):
        data = {
            'tags': [self.section],
        }

        if self.description:
            data['description'] = self.description

        if self.deprecated:
            data['deprecated'] = True

        if self.parameters:
            data['parameters'] = self.parameters

        if self.request:
            data['requestBody'] = {
                'required': True,
                'content': {
                    'application/json': {
                        'schema': self.request,
                    },
                },
            }
        elif self.multipartRequest:
            data['requestBody'] = {
                'required': True,
                'content': {
                    'multipart/form-data': {
                        'schema': self.multipartRequest,
                    },
                },
            }

        data['responses'] = {
            '200': {
                'description': 'success',
                'content': {
                    'application/json': {
                        'schema': self.response,
                    },
                },
            },
        }

        return data


class Swagger(object):
    REQUIRED_SIGN = '!'
    NULLABLE_SIGN = '?'
    ARRAY_SIGN = '[]'
    LINK_SIGN = '$'

    models = {}
    error = None

    @staticmethod
    def check_sign(value, sign, starts_with_sign=False):
        if starts_with_sign:
            return (value[1:], True) if value[0] == sign else (value, False)
        return (value[: -len(sign)], True) if value[-len(sign) :] == sign else (value, False)

    @staticmethod
    def check_enum(value):
        enum_match = re.search(r'\[.*\]', value)
        if enum_match:
            enum_string = enum_match.group(0)
            enum_data = yaml.load(enum_string, Loader=yaml.Loader)
            return enum_data, value.replace(enum_string, '')
        return None, value

    @staticmethod
    def check_example(value):
        example_match = re.search(r'\((.*)\)', value)
        if example_match:
            example_match_string = example_match.group(0)
            example_string = example_match.group(1)
            return example_string, value.replace(example_match_string, '')
        return None, value

    def __init__(self):
        self.paths = defaultdict(dict)

    def read(self, input_stream):
        data = yaml.load(input_stream, Loader=yaml.FullLoader)

        self.title = data['title']

        for (model_name, model_data) in data['models'].items():
            model = SwaggerModel(model_name, model_data)
            Swagger.models[model.name] = model

        for (section_name, section_data) in data['handlers'].items():
            for (handler_name, handler_data) in section_data.items():
                handler_method, handler_path = handler_name.split(' ')
                handler_method = handler_method.lower()
                handler = SwaggerHandler(section_name, handler_method, handler_path, handler_data)
                self.paths[handler.path][handler.method] = SwaggerHandler(section_name, handler_method, handler_path, handler_data)

        error = data.get('error')
        if error:
            Swagger.error = SwaggerModel('schema', error)

        return self

    def write(self, output_stream):
        data = {
            'openapi': '3.0.0',
            'info': {
                'version': 'REST',
                'title': self.title,
            },
            'paths': self.paths,
        }

        if Swagger.error:
            data['components'] = {
                'schemas': {
                    'ErrorResponse': Swagger.error,
                },
            }

        output_stream.write(json.dumps(data, cls=SwaggerJSONEncoder, indent=2))
        return self


if __name__ == "__main__":
    dir_path = os.path.dirname(os.path.realpath(__file__))

    with open(f'{dir_path}/api-doc.yml', 'r') as input_stream, open(f'{dir_path}/build/swagger.json', 'w') as output_stream:
        Swagger().read(input_stream).write(output_stream)
