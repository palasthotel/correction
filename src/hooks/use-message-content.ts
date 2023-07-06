import {store as EditorStore} from "@wordpress/editor"
import {useDispatch, useSelect} from "@wordpress/data";
import {usePostAttribute} from "./use-post";


export const useMessageContent = () => {
    const [content, setContent] = usePostAttribute<Record<string, any>>("corrections_message_content");
    const dispatch = useDispatch(EditorStore);

    return [
        content,
        setContent,
    ] as const;
}
