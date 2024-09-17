#!/bin/sh

# pipenv --python /usr/local/bin/python run manage loaddata fixtures/admin.json
# pipenv --python /usr/local/bin/python run manage loaddata fixtures/data.json

pip install pipenv &&
        pipenv --python /usr/local/bin/python install --deploy --ignore-pipfile &&
        pipenv --python /usr/local/bin/python run gendocs --no-input &&
        pipenv --python /usr/local/bin/python run migrate &&
        pipenv --python /usr/local/bin/python run superuser &&
        exec $@