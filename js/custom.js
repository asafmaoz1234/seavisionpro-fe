// IDs of all buttons
const regionButtonsIds = ['region1', 'region2', 'region3', 'region4'];
// Object to store cached data for each coastal area
const cachedData = {};

/**
 * Function to tuggle color of selected region
 * @param clickedId
 */
function selectRegion(clickedId) {
    const clickedButton = document.getElementById(clickedId);

    // Set clicked button to red and add selected attribute
    if (clickedButton.style.backgroundColor !== "rgb(142, 202, 230)") {
        clickedButton.style.backgroundColor = "rgb(142, 202, 230)";
        clickedButton.setAttribute("selected", "true");
    }

    // Remove red background and 'selected' attribute from other buttons
    regionButtonsIds.forEach(id => {
        if (id !== clickedId) {
            const button = document.getElementById(id);
            if (button.style.backgroundColor === "rgb(142, 202, 230)") {
                button.style.backgroundColor = "";
                button.removeAttribute("selected");
            }
        }
    });
}

/**
 * Function to find the selected region
 * @returns {string} selectedRegion
 */
function findSelectedRegion() {
    let selectedRegion;
    regionButtonsIds.forEach(id => {
        const button = document.getElementById(id);
        if (button.getAttribute("selected") === "true") {
            selectedRegion = id;
        }
    });
    // if selectedRegion is null, show error to select a region
    if (!selectedRegion) {
        const element = document.getElementById('select-region-needed');
        if (element) {
            element.style.display = 'block';
        }
    }
    return selectedRegion;
}

/**
 * Function to fetch results
 * @returns {Promise<void>}
 */
async function fetchResults() {
    // loop regionButtonsIds and find id with the selected=true attribute
    document.getElementById('error-results').style.display = 'none';
    document.getElementById('select-region-needed').style.display = 'none';

    let selectedRegion = findSelectedRegion();
    if (!selectedRegion) {
        return;
    }

    // show loading message
    document.getElementById('loading-results').style.display = 'block';

    // update results selected region
    document.getElementById('results-selected-region').innerHTML = document.getElementById(selectedRegion).innerHTML;

    let data;
    // fetch results
    try{
        data = await sendRequest(selectedRegion);
    } catch (error) {
        // hide loading message
        document.getElementById('loading-results').style.display = 'none';
        document.getElementById('error-results').style.display = 'block';
        return;
    }


    // validate data
    populateResultsTable(data);

    // hide loading message
    document.getElementById('loading-results').style.display = 'none';
    // show results area
    document.getElementById('results-area').style.display = 'block';
}

function populateResultsTable(dataArray) {
    dataArray.forEach((data, index) => {
        // Iterate over each key-value pair in the object
        let value;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const elementId = key + '_' + (index + 1);
                const element = document.getElementById(elementId);
                if (element) {
                    element.innerHTML = data[key];
                    // parse temperature, averageTemperature and averageWaveHeight
                    if (key === 'averageTemperature' || key === 'temperature' || key === 'averageWaveHeight') {
                        if (data[key] === '0.0') {
                            element.innerHTML = 'No Data';
                        } else {
                            const parts = data[key].split('.');
                            value = parts[0] + '.' + parts[1].substring(0, 2);
                            if (key === 'averageWaveHeight') {
                                element.innerHTML = value + 'm';
                            } else {
                                element.innerHTML = value + '°C';
                            }
                        }
                    }
                    // check for updateDate and convert to actual date dd/mm/yyyy from epoc seconds
                    if (key === 'updateDate') {
                        const date = new Date(data[key] * 1000);
                        element.innerHTML = date.toLocaleDateString('en-GB');
                    }
                    if (key === 'rating') {
                        addRatingClass(document.getElementById(key + '_cell_' + (index + 1)), data[key]);
                        if (index === 0) {
                            document.getElementById('results-vis-top-rating').innerHTML = 'Tomorrow Visibility Rating - ' + data[key];
                        }
                    }
                }
            }
        }
    });
}

function addRatingClass(element, rating) {
    if (rating === 'GREAT') {
        element.classList.add('rating-great');
    }else if (rating === 'AVERAGE') {
        element.classList.add('rating-average');
    }else if (rating === 'POOR') {
        element.classList.add('rating-poor');
    }
}

async function sendRequest(regionId) {
    if (cachedData[regionId]) {
        return cachedData[regionId];
    }
    try{
        const response = await fetch(`https://q1o859gvbj.execute-api.eu-west-1.amazonaws.com/prod/weatherdata?regionId=${regionId.replace('region', '')}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'operN0Dzji96CtOFlaZOW64P4LGjrvoB3YPvxhZ2'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        cachedData[regionId] = data;
        return data;
    }catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}