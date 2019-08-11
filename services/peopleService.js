const apiConfig = require('../config/apiConfig');
const apiHelper = require('../utils/apiHelper');

const getPeople = async (sortParam, genderFilter) => {
    try {
        let data = await apiHelper.get(apiConfig.peopleUrl);

        data = JSON.parse(data);

        let rawPeopleData = data.results;
        if (sortParam === 'name') {
            rawPeopleData = rawPeopleData.sort((a, b) => {
                a.name > b.name
            });
        } else if (sortParam === 'gender') {
            rawPeopleData = rawPeopleData.sort((a, b) => {
                return a.gender > b.gender;
            });
        } else if (sortParam === 'height') {
            rawPeopleData = rawPeopleData.sort((a, b) => {
                return parseFloat(a.height) > parseFloat(b.height);
            });
        }

        if (genderFilter === 'male' || genderFilter === 'female') {
            rawPeopleData = rawPeopleData.filter(p => p.gender === genderFilter);
        }

        const totalHeight = parseFloat(rawPeopleData.map(p => p.height).reduce((a, b) => parseFloat(a) + parseFloat(b)));

        const totalHeightInFeet = Math.floor((totalHeight / 30.48));
        const remainderInInches = (totalHeight % 30.48).toFixed(2);
        const totalHeightInCm = `${totalHeight} cm`;

        let totalHeightInFeetAndInches = `${totalHeightInFeet} ft`;

        if (remainderInInches > 0) {
            totalHeightInFeetAndInches += ` ${remainderInInches} inches`;
        }

        const people = rawPeopleData.map(p => ({
            name: p.name,
            height: p.height,
            mass: p.mass,
            hairColor: p.hair_color,
            skinColor: p.skin_color,
            eyeColor: p.eye_color,
            birthYear: p.birth_year,
            gender: p.gender,
            created: p.created,
            edited: p.edited
        }));

        return { count: rawPeopleData.length, totalHeightInFeetAndInches, totalHeightInCm, people };

    } catch (error) {
        console.log(error);
    }    
}

module.exports = {
    getPeople
}
