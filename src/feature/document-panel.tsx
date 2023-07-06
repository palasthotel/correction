import {registerPlugin} from "@wordpress/plugins";
import {PluginSidebar, PluginSidebarMoreMenuItem} from '@wordpress/edit-post'

import MessagesPanelContainer from "../container/MessagesPanelContainer";
import RevisionsPanelContainer from "../container/RevisionsPanelContainer";

const sidebarName = "corrections-sidebar";

registerPlugin("corrections-plugin", {
    render: () => {

        return <>

            <PluginSidebarMoreMenuItem
                target={sidebarName}
                icon="editor-spellcheck"
            >
                Corrections
            </PluginSidebarMoreMenuItem>

            <PluginSidebar
                icon="editor-spellcheck"
                name={sidebarName}
                title="Corrections"
            >
                <RevisionsPanelContainer initialOpen={true} />

                <MessagesPanelContainer initialOpen={false} />

            </PluginSidebar>
        </>
    }
});
