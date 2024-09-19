const url = 'http://numbersapi.com/'
numberPromises = [];
randomNumber = Math.floor(Math.random() * 100) + 1;

const randomFactList = document.getElementById('random-facts');
const favoriteFactList = document.getElementById('favorite-facts');

for (let i = randomNumber; i < randomNumber + 5; i++) {
    numberPromises.push(axios.get(url + i));
}

Promise.all(numberPromises)
    .then(response => {
        response.forEach(r => {
            const listItem = document.createElement('li');
            listItem.textContent = r.data;
            randomFactList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.log(error);
    });

////////////////////////////////////////////////////////////////////////

const favoriteNumber = 14;

axios.get(url + favoriteNumber)
    .then(response => {
        const listItem = document.createElement('li');
        listItem.textContent = response.data;
        favoriteFactList.appendChild(listItem);
    })
    .then(response => {
        return axios.get(url + favoriteNumber + '/trivia')
    })
    .then(response => {
        const listItem = document.createElement('li');
        listItem.textContent = response.data;
        favoriteFactList.appendChild(listItem);
        return axios.get(url + favoriteNumber + '/year')
    })
    .then(response => {
        const listItem = document.createElement('li');
        listItem.textContent = response.data;
        favoriteFactList.appendChild(listItem);
        return axios.get(url + favoriteNumber + '/math')
    })
    .then(response => {
        const listItem = document.createElement('li');
        listItem.textContent = response.data;
        favoriteFactList.appendChild(listItem);
    })
    .catch(error => {
        console.log(error)
    })





