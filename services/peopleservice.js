const apiConfig = require('../config/api-config');
const apiHelper = require('../utils/apiHelper');

const getPeople = async (sortParam, genderFilter) => {
    try {
        let data = await apiHelper.get(apiConfig.peopleUrl);

        data = JSON.parse(data);

        let people = data.results;
        if (sortParam === 'name') {
            people = people.sort((a, b) => {
                a.name > b.name
            });
        } else if (sortParam === 'gender') {
            people = people.sort((a, b) => {
                return a.gender > b.gender;
            });
        } else if (sortParam === 'height') {
            people = people.sort((a, b) => {
                return a.height > b.height;
            });
        }

        if (genderFilter === 'male' || genderFilter === 'female') {
            people = people.filter(p => p.gender === genderFilter);
        }


        const totalHeight = `${parseFloat(people.map(p => p.height).reduce((a, b) => parseFloat(a) + parseFloat(b))) / 30.48} ft`;

        return { count: people.length, totalHeight, people };

    } catch (error) {
        console.log(error);
    }    
}

module.exports = {
    getPeople
}