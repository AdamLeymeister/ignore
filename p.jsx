echo '"name": "stuff"' | awk -F'"' '{print $4}'

echo '"name": "stuff"' | sed -n 's/.*"name": "\([^"]*\).*/\1/p'

echo '"name": "stuff"' | grep -oP '(?<="name": ")[^"]*'



str='"name": "stuff"'
# Remove everything before and including "name": "
temp=${str#*\"name\": \"}
# Remove everything after the first closing quote
result=${temp%%\"*}
echo "$result"
