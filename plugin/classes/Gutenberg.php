<?php

namespace Palasthotel\WordPress\Corrections;

use Palasthotel\WordPress\Corrections\Components\Assets;
use Palasthotel\WordPress\Corrections\Components\Component;

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
		$this->assets->registerScript( Plugin::HANDLE_GUTENBERG_SCRIPT, "dist/gutenberg.ts.js" );
		wp_enqueue_script( Plugin::HANDLE_GUTENBERG_SCRIPT );
	}

}
