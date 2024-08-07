import client from '../../client';
import { protectResolver } from '../../users/users.utils';
import { processHashtags } from '../photos.utils';
export default {
    Mutation: {
        uploadPhoto: protectResolver(
            async (_, { file, caption }, { loggedInUser }) => {
                let hashtagObj = [];
                if (caption) {
                    hashtagObj = processHashtags(caption);
                }
                return client.photo.create({
                    data: {
                        file,
                        caption,
                        /*hashtags: {
                            connectOrCreate: [
                                {
                                    where: { hashtag: '#food' },
                                    create: { hashtag: '#food' },
                                    },
                                    ],
                                    },*/

                        user: {
                            connect: {
                                id: loggedInUser.id,
                            },
                        },

                        ...(hashtagObj.length > 0 && {
                            hashtags: {
                                connectOrCreate: hashtagObj,
                            },
                        }),
                    },
                });
            },
        ),
    },
};
