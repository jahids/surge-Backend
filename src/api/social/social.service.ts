import { getUserByAlpacaId } from "../../models/user.model";

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
