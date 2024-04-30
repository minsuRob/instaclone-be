import jwt from 'jsonwebtoken';
import client from '../../client';
import bcrypt from 'bcrypt';
export default {
    Mutation: {
        editProfile: async (
            _,
            {
                firstName,
                lastName,
                username,
                email,
                password: newPassword,
                token,
            },
        ) => {
            const { id } = await jwt.verify(token, process.env.SECRET_KEY);

            let uglyPwd = null;
            if (newPassword) {
                uglyPwd = await bcrypt.hash(newPassword, 10);
            }
            const updateUser = await client.user.update({
                where: {
                    id,
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
