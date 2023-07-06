import {useRevisionsGroupByAuthorSortByTime} from "../hooks/use-revisions";
import {Button, PanelBody} from "@wordpress/components";
import Card from '../components/Card'
import {getAllRevisionsUrl, translate} from "../global";
import {dateFormat} from "../lib/date-format";

type Props = {
    title?: string
    initialOpen?: boolean
}

export default function RevisionsPanelContainer(
    {
        title = translate("Latest corrections"),
        initialOpen = true,
    }: Props
) {
    const revisions = useRevisionsGroupByAuthorSortByTime();

    return (
        <PanelBody title={title} initialOpen={initialOpen}>
            {revisions.map((revision,) => {
                return (
                    <Card key={revision.revision_post_id}>

                        {revision.author_name}<br/>
                        <i>{dateFormat(revision.timestamp * 1000)}</i>
                    </Card>
                )
            })}
            <br/>
            <Button href={getAllRevisionsUrl()} variant="link">{translate("All revisions")}</Button>
        </PanelBody>
    )
}
