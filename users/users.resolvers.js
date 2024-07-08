export default {
    User: {
        totalFollowing: (root) => {
            console.log(root.bio);
            return 0;
        },
        totalFollowers: () => 999,
        isMe: ({ id }, _, { loggedInUser }) => {
            if (!loggedInUser) {
                return false;
            }
            return id === loggedInUser.id;
        },
    },
};
