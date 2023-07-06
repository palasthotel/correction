<?php

namespace Palasthotel\WordPress\Corrections\Source;

use Palasthotel\WordPress\Corrections\Model\ContentStructure;
use Palasthotel\WordPress\Corrections\Model\RecipientSuggestionsConfig;
use Palasthotel\WordPress\Corrections\Model\Widget\Textarea;
use Palasthotel\WordPress\Corrections\Plugin;

class Config {

	/**
	 * does post type use corrections workflow?
	 *
	 * @param string $post_type
	 *
	 * @return bool
	 */
	public static function isPostTypeEnabled( string $post_type ): bool {
		return in_array( $post_type, Config::postTypes() );
	}

	/**
	 * post types that use corrections workflow
	 * @return string[]
	 */
	public static function postTypes(): array {
		return apply_filters( Plugin::FILTER_POST_TYPES, [ "post" ] );
	}

	public static function getContentStructure( int|string $post_id ): ContentStructure {

		$cs = new ContentStructure( [
			Textarea::build( "message", "Message" )
			        ->help( "Something worth noting?" ),
		] );

		return apply_filters( Plugin::FILTER_MESSAGE_CONTENT_STRUCTURE, $cs, $post_id );
	}

	public static function getRecipientSuggestions(): RecipientSuggestionsConfig {
		return apply_filters( Plugin::FILTER_RECIPIENT_SUGGESTIONS, RecipientSuggestionsConfig::autocomplete() );
	}

}
