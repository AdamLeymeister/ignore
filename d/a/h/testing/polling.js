const endpointURL = 'https://example.com/check-status';

/**
 * Function to poll the server until the task is completed or max retries are reached.
 * @param {number} interval - The interval in milliseconds at which to poll. Default is 5000ms.
 * @param {number} maxRetries - Maximum number of retries. Default is 5.
 * @return {Promise} Resolves when the data.isCompleted is true or rejects after max retries.
 */
function pollUntilCompleted(interval = 5000, maxRetries = 5) {
    return new Promise((resolve, reject) => {
        let retryCount = 0;

        const checkStatus = () => {
            axios.get(endpointURL)
                .then(response => {
                    const data = response.data;

                    // If the task is completed
                    if (data.isCompleted) {
                        resolve(data);
                    } else {
                        // Increment retry count
                        retryCount++;

                        // If max retries reached, reject the promise
                        if (retryCount >= maxRetries) {
                            reject(new Error('Max retries reached'));
                        } else {
                            // If not, poll again after the specified interval
                            setTimeout(checkStatus, interval);
                        }
                    }
                })
                .catch(error => {
                    reject(error);
                });
        };

        checkStatus();
    });
}

// Example usage:
pollUntilCompleted(5000, 5)
    .then(data => {
        console.log('Task is completed!', data);
    })
    .catch(error => {
        console.error('An error occurred while polling:', error.message);
    });
