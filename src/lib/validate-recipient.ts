import {getIsValidRecipientEndpoint} from "../global";

export default async function isValidRecipient(recipient: string): Promise<boolean> {
    try {
        const json = await fetch(getIsValidRecipientEndpoint(recipient)).then(res => res.json());
        return json.is_valid === true;
    } catch (e) {
        console.error(e);
    }
    return false;
}
