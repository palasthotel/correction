import {store as EditorStore} from "@wordpress/editor"
import {useSelect} from "@wordpress/data";

type Revision = {
    revision_post_id: number
    author_id: number
    author_name: string
    timestamp: number
}

export const useRevisions = (): Revision[] => {
    const store = useSelect(select => select(EditorStore), []);
    // @ts-ignore
    const revisions = store.getEditedPostAttribute("corrections_revisions");

    return Array.isArray(revisions) ? revisions : [];

}

type RevisionGroup = Revision & {
    count: number
}

export const useRevisionsGroupByAuthorSortByTime = (): RevisionGroup[] => {
    const revisions = useRevisions();

    const grouped: {
        [key: string]: Revision & { count: number }
    } = {}
    revisions.forEach(revision => {
        if (grouped[revision["author_id"]] == undefined) {
            grouped[revision["author_id"]] = {...revision, count: 0};
        }
        grouped[revision["author_id"]].count++;
        if(grouped[revision["author_id"]].timestamp < revision.timestamp){
            grouped[revision["author_id"]].timestamp = revision.timestamp;
        }
    });

    return Object.values(grouped).sort((a,b) => b.timestamp - a.timestamp);
}
