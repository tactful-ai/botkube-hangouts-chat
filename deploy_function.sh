set -e
set -x

if [ -e botkube_hangouts_function.zip ]; then
    rm botkube_hangouts_function.zip
fi

zip -r botkube_hangouts_function.zip . -x '*.git*' deploy_function.sh response_example.json

aws lambda update-function-code --function-name botkube_hangouts --zip-file fileb://botkube_hangouts_function.zip

rm botkube_hangouts_function.zip
