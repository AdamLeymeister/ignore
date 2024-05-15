echo '"name": "stuff"' | awk -F'"' '{print $4}'

echo '"name": "stuff"' | sed -n 's/.*"name": "\([^"]*\).*/\1/p'

echo '"name": "stuff"' | grep -oP '(?<="name": ")[^"]*'



str='"name": "stuff"'
# Remove everything before and including "name": "
temp=${str#*\"name\": \"}
# Remove everything after the first closing quote
result=${temp%%\"*}
echo "$result"



cleanup() {
    echo "Cleaning up background processes..."
    kill $(jobs -p)
}

trap cleanup SIGINT SIGTERM EXIT SIGHUP

echo "Starting background processes..."
gradle bootRun api1 &
gradle bootRun api2 &
gradle bootRun api3 &
gradle bootRun api4 &

wait
echo "All processes finished."
