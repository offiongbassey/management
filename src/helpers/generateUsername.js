import Model from "../server/models";

export const generateUsername = async (name) => {
    let userName = name.replace(/ .*/,'').toLowerCase();
    const verify_username = await Model.User.findOne({ where: { username: userName } })
    if(verify_username){
        return userName = userName+Math.floor(1 + Math.random() * 8362);
    }
    return userName;
}