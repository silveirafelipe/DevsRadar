const axios = require('axios')
const Dev = require("../models/Dev");
const parseStringAsArray = require('../utils/parseStringAsArray')
const { findConnections, sendMessage } = require('../websocket')

//index, show, store, update, destroy

module.exports = {
    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username })

        if (!dev) {

            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

            const { name = login, avatar_url, bio } = apiResponse.data;

            const techsArray = parseStringAsArray(techs);

            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev)
        }

        return response.json(dev);
    },

    async destroy(request, response) {
        const { github_username } = request.body

        const result = await Dev.deleteOne({ github_username: github_username })

        return response.json(result)
    },

    async update(request, response) {
        const { github_username, name, avatar_url, bio, techs, latitude, longitude } = request.body;

        const locations = {
            type: 'Point',
            coordinates: [longitude, latitude],
        }

        const techiques = parseStringAsArray(techs);

        await Dev.updateOne(
            { github_username: github_username },
            {
                $set: {
                    name: name,
                    avatar_url: avatar_url,
                    bio: bio,
                    techs: techiques,
                    location: locations,
                }
            },
            function (err, res) { if (err) throw err; }
        )

        const dev = await Dev.findOne({ github_username })

        response.json(dev)
    }
};