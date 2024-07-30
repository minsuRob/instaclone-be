export default {
    User: {
        totalFollowing: (root) => {
            console.log(root.bio);
            return 0;
        },
        totalFollowers: () => 999,
    },
};
