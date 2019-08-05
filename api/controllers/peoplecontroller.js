const peopleService = require('../../services/peopleService');

const getPeople = async (req, res) => {
    try {
        const sortParam = req.query.sort;
        const filterParam = req.query.filter;
        const people = await peopleService.getPeople(sortParam, filterParam);

        return people ? res.status(200).json(people) : res.status(404);
    } catch(err) {
        return res.status(400).json({ error: err.message });
    }
}


module.exports = {
    getPeople
}