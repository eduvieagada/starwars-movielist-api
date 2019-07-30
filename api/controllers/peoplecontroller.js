const peopleService = require('../../services/peopleservice');

const getPeople = (req, res) => {
    const sortParam = req.query.sort;
    const filterParam = req.query.filter;
    peopleService.getPeople(sortParam, filterParam)
        .then(people => res.status(200).json(people))
        .catch(error => res.status(500));
}


module.exports = {
    getPeople
}