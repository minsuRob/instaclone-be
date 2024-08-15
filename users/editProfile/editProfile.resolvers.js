import jwt from 'jsonwebtoken';
import client from '../../client';
import bcrypt from 'bcrypt';
import { protectResolver } from '../users.utils';
import { uploadPhoto } from '../../shared/shared.utils';
export default {
    Mutation: {
        editProfile: protectResolver(
            async (
                _,
                {
                    firstName,
                    lastName,
                    username,
                    email,
                    password: newPassword,
                    bio,
                },
                { loggedInUser, protectResolver },
            ) => {
                let avatarUrl = 'http://localhost:4000/static/hajong.png';
                if (avatar) {
                    avatarUrl = await uploadPhoto(avatar, loggedInUser.id);
                }
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
                        ...(avatarUrl && { avatar: avatarUrl }),
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
