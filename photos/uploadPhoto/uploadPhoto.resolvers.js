import client from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        uploadPhoto: protectResolver(
            async (_, { file, caption }, { loggedInUser }) => {
                let hashtagObj = [];
                if (caption) {
                    const hashtags = caption.match(/#[\w]+/g);
                    hashtagObj = hashtags.map((hashtag) => ({
                        where: { hashtag },
                        create: { hashtag },
                    }));
                }
                client.photo.create({
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
