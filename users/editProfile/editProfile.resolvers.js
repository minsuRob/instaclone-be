import jwt from 'jsonwebtoken';
import client from '../../client';
import bcrypt from 'bcrypt';
import { protectResolver } from '../users.utils';
export default {
    Mutation: {
        editProfile: protectResolver(
            async (
                _,
                { firstName, lastName, username, email, password: newPassword },
                { loggedInUser, protectResolver },
            ) => {
                let uglyPwd = null;
                if (newPassword) {
                    uglyPwd = await bcrypt.hash(newPassword, 10);
                }
                const updateUser = await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        firstName,
                        lastName,
                        username,
                        email,
                        bio,
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
        ),
    },
};
