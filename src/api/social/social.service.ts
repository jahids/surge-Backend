import userModel, { getUserByAlpacaId } from "../../models/user.model";

export const getAlpacaUserFollowings = async (alpacaId: any) => {
    const result = await getUserByAlpacaId(alpacaId);
    if (result) {
        const id = result._id;
        const following = result?.following ?? [];
        const pfp = result?.pfp ?? null;
        return { dbId: id, following, pfp };
    }
    return null;
};

export const getUsersFollowing = async (ids: [any]) => {
    if (ids.length) {
        for (let i = 0; i < ids.length; i++) {
            const result = await getAlpacaUserFollowings(ids[i].id);
            if (result) {
                ids[i].dbId = result.dbId;
                ids[i].following = result.following;
                ids[i].pfp = result.pfp;
            }
        }
    }
    return ids;
};

export const FindUserFriendList = async (dbId: string, limit: number = 3) => {
    const result = await userModel
        .findById(dbId)
        .populate({
            path: "following",
            model: "user", // Assuming the model name is 'User'
            select: "name email pfp", // Select only the fields you're interested in. Adjust as needed.
            options: { limit: limit },
        })
        .select("following")
        .exec();

    return result;
};
