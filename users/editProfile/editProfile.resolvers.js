import client from '../../client';
import bcrypt from 'bcrypt';
export default {
    Mutation: {
        editProfile: async (
            _,
            { firstName, lastName, username, email, password: newPassword },
        ) => {
            let uglyPwd = null;
            if (newPassword) {
                uglyPwd = await bcrypt.hash(newPassword, 10);
            }
            const updateUser = client.user.update({
                where: {
                    id: 2,
                },
                data: {
                    firstName,
                    lastName,
                    username,
                    email,
                    ...(uglyPwd && { password: uglyPwd }),
                },
            });

            if (updateUser.id) {
                return {
                    ok: true,
                };
            } else {
                return {
                    ok: false,
                    error: 'could not update profile',
                };
            }
        },
    },
};
