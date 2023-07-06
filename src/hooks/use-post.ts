import {store as EditorStore} from "@wordpress/editor";
import {useDispatch, useSelect} from "@wordpress/data";

export const usePostAttribute = <T = string>(attribute: string) => {
    const dispatch = useDispatch(EditorStore);
    const data: T = useSelect(select => {
        // @ts-ignore
        return select(EditorStore).getEditedPostAttribute(attribute)
    }, [attribute]);

    return [data, (value: T) => {
        // @ts-ignore
        dispatch.editPost({
            [attribute]: value,
        })
    }] as const;
}

export const useIsLocked = () => {
    return useSelect(select => {
        // @ts-ignore
        return select(EditorStore).isSavingPost() || select(EditorStore).isPostSavingLocked();
    }, []) === true;
}
