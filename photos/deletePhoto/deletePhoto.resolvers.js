import client from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        deletePhoto: protectResolver(async (_, { id }, { loggedInUser }) => {
            const photo = await client.photo.findUnique({
                where: { id },
                select: {
                    userId: true,
                },
            });

            if (!photo) {
                return {
                    ok: false,
                    error: 'Photo not found',
                };
            } else if (photo.userId !== loggedInUser.id) {
                return {
                    ok: false,
                    error: 'Not authorized.',
                };
            } else {
                await client.photo.delete({
                    where: {
                        id,
                    },
                });
                return {
                    ok: true,
                };
            }
        }),
    },
};
