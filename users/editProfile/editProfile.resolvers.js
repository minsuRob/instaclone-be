import client from '../../client';
export default {
    Mutation: {
        editProfile: (
            _,
            { firstName, lastName, username, email, password },
        ) => {
            return client.user.update({
                where: {
                    id: 2,
                },
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    password,
                },
            });
        },
    },
};
