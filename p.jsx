echo '"name": "stuff"' | awk -F'"' '{print $4}'

echo '"name": "stuff"' | sed -n 's/.*"name": "\([^"]*\).*/\1/p'

echo '"name": "stuff"' | grep -oP '(?<="name": ")[^"]*'
