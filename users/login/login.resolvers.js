import bcrypt from "bcrypt"
import client from "../../client"

export default {
    Mutation: {
        login: async (_, {username, password}) => {
            const user = await client.user.findFirst( { where : {username} });
            if (!user) {
                return {
                    ok: false,
                    error: "user not found"
                }
            }

            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "Incorrect pwd."
                }
            }
        },
    }
}