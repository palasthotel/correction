<?php

namespace Palasthotel\WordPress\Corrections;

use Palasthotel\WordPress\Corrections\Components\Assets;
use Palasthotel\WordPress\Corrections\Components\Component;
use Palasthotel\WordPress\Corrections\Source\Config;

class Gutenberg extends Component {

	private Assets $assets;

	public function onCreate() {
		parent::onCreate();
		add_action( 'init', [ $this, 'init' ] );

		$this->assets = new Assets( $this->plugin );

	}

	public function init() {
		add_action( 'enqueue_block_editor_assets', [ $this, 'enqueue_block_editor_assets' ] );
	}

	public function enqueue_block_editor_assets() {

		if ( ! Config::isPostTypeEnabled( get_post_type() ) ) {
			return;
		}

		$this->assets->registerScript( Plugin::HANDLE_GUTENBERG_SCRIPT, "dist/gutenberg.ts.js" );
		wp_enqueue_script( Plugin::HANDLE_GUTENBERG_SCRIPT );

		wp_localize_script(
			Plugin::HANDLE_GUTENBERG_SCRIPT,
			"Corrections",
			[
				"postId" => get_the_ID(),
				"contentStructure" => Config::getContentStructure(get_the_ID())->toArray(),
				"recipientSuggestionsConfig" => Config::getRecipientSuggestions()->toArray(),
				"allRevisionsUrl" => wp_get_post_revisions_url(get_the_ID()),
				"endpoints" => [
					"isValidRecipientBaseUrl" => $this->plugin->ajax->getIsValidRecipientBaseUrl(),
				],
			]
		);
	}

}
