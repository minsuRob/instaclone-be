import client from '../../client';

export default {
    Query: {
        seeHashtag: (_, { hashtag }) => {
            console.log('1');
            return client.hashtag.findUnique({
                where: {
                    hashtag,
                },
            });
        },
    },
};
