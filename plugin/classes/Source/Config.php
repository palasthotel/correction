<?php

namespace Palasthotel\WordPress\Corrections\Source;

use Palasthotel\WordPress\Corrections\Model\ContentStructure;
use Palasthotel\WordPress\Corrections\Model\Widget\Text;
use Palasthotel\WordPress\Corrections\Model\Widget\Textarea;
use Palasthotel\WordPress\Corrections\Model\Widget\Toggle;
use Palasthotel\WordPress\Corrections\Plugin;

class Config {

	/**
	 * does post type use corrections workflow?
	 * @param string $post_type
	 *
	 * @return bool
	 */
	public static function isPostTypeEnabled(string $post_type): bool {
		return in_array($post_type, Config::postTypes());
	}

	/**
	 * post types that use corrections workflow
	 * @return string[]
	 */
	public static function postTypes():array {
		return apply_filters(Plugin::FILTER_POST_TYPES, ["post"]);
	}

	public static function getContentStructure(int|string $post_id): ContentStructure {

		$cs = new ContentStructure([
			Toggle::build("express", "Express")
			      ->setDefaultValue(false)
			      ->help("Is it urgent?"),
			Text::build("deadline", "Deadline")
				->help("What is the time horizon? (optional)"),
			Textarea::build("message", "Message")
				->help("Something worth noting? (optional)"),
		]);

		return apply_filters(Plugin::FILTER_MESSAGE_CONTENT_STRUCTURE, $cs, $post_id);
	}

	public static function getReceiverSuggestions(): array {
		return apply_filters(Plugin::FILTER_RECEIVER_SUGGESTIONS, []);
	}

}
