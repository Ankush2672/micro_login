exports.getDate = {
    name: 'getDate',
    version: '1.0.0',
    register: async function (server, options) {

        const currentDate = function() {

            const date = new Date();
            return date;
        };

        server.decorate('toolkit', 'getDateName', currentDate);
    }
};
