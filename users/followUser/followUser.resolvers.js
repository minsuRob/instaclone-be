import client from '../../client';
import { protectResolver } from '../users.utils';

export default {
    Mutation: {
        followUser: protectResolver(
            async (_, { username }, { loggedInUser }) => {
                await client.user.update({
                    where: {
                        id: loggedInUser.id,
                    },
                    data: {
                        following: {
                            connect: {
                                username,
                            },
                        },
                    },
                });
                return {
                    ok: true,
                };
            },
        ),
    },
};
