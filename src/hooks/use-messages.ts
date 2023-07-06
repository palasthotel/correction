import {store as EditorStore} from "@wordpress/editor"
import {useSelect} from "@wordpress/data";

type Message = {
    id: number
    post_id: number
    receiver: string
    modified_timestamp: number
    sent_timestamp: number | null
}

export const useMessages = (): Message[] => {
    const store = useSelect(select => select(EditorStore), []);
    // @ts-ignore
    const messages = store.getEditedPostAttribute("corrections_messages");

    return Array.isArray(messages) ? messages : [];
}
