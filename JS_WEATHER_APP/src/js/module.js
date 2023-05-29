// current weather and 3 days forecast
export function threeDaysForecast(timestamp) {
    const milliseconds = timestamp * 1000; // Convert seconds to milliseconds
    const originalDate = new Date(milliseconds);
    originalDate.setDate(originalDate.getDate() + 3);
    const updatedTimestamp = Math.floor(originalDate.getTime() / 1000); // Convert milliseconds back to seconds
    return updatedTimestamp;
}

// validation for search field
export function formValidate() {
    if (search.value == "") {
        document.querySelector('.show-error').innerHTML = `search field is required`;
        return false;
    }
    else {
        document.querySelector('.show-error').innerHTML = ``;
        return true;
    }
}

