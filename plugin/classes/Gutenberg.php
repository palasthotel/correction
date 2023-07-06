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
		wp_set_script_translations( Plugin::HANDLE_GUTENBERG_SCRIPT, Plugin::DOMAIN );

		wp_localize_script(
			Plugin::HANDLE_GUTENBERG_SCRIPT,
			"Corrections",
			[
				"domain" => Plugin::DOMAIN,
				"i18n" => [
					"Corrections" => __("Corrections", Plugin::DOMAIN),#
					"Latest corrections" => __("Latest corrections", Plugin::DOMAIN),
					"All revisions" => __("All revisions", Plugin::DOMAIN),
					"Requests" => __("Requests", Plugin::DOMAIN),
					"Send correction request to" => __("Send correction request to", Plugin::DOMAIN),
					"Sending requests..." => __("Sending requests...", Plugin::DOMAIN),
					"Save post to send requests." => __("Save post to send requests.", Plugin::DOMAIN),
					"No recipients selected." => __("No recipients selected.", Plugin::DOMAIN),
					"All requests" => __("All requests", Plugin::DOMAIN),
					"Latest requests" => __("Latest requests", Plugin::DOMAIN),
					"Show all requests" => __("Show all requests", Plugin::DOMAIN),
					"No request yet." => __("No request yet.", Plugin::DOMAIN),
				],
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
