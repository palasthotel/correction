import {registerPlugin} from "@wordpress/plugins";
import {PluginSidebar, PluginSidebarMoreMenuItem} from '@wordpress/edit-post'

import MessagesPanelContainer from "../container/MessagesPanelContainer";
import RevisionsPanelContainer from "../container/RevisionsPanelContainer";
import { translate} from "../global";

const sidebarName = "corrections-sidebar";

registerPlugin("corrections-plugin", {
    render: () => {

        return <>

            <PluginSidebarMoreMenuItem
                target={sidebarName}
                icon="editor-spellcheck"
            >
                {translate("Corrections")}
            </PluginSidebarMoreMenuItem>

            <PluginSidebar
                icon="editor-spellcheck"
                name={sidebarName}
                title={translate("Corrections")}
            >
                <RevisionsPanelContainer initialOpen={true} />
                <MessagesPanelContainer initialOpen={false} />
            </PluginSidebar>
        </>
    }
});
