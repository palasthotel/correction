import {store as EditorStore} from "@wordpress/editor"
import {useDispatch, useSelect} from "@wordpress/data";


export const useMessageContent = () => {
    const content: Record<string, any> = useSelect(select => {
        // @ts-ignore
        return select(EditorStore).getEditedPostAttribute("corrections_message_content") ?? {};
    }, []);
    const dispatch = useDispatch(EditorStore);

    return [
        content,
        (value: Record<string, any>) => {
            console.debug(dispatch, value)
            // @ts-ignore
            dispatch.editPost({
                corrections_message_content: value,
            });
        }
    ] as const;
}
