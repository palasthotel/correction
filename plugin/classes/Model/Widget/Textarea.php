<?php


namespace Palasthotel\WordPress\Corrections\Model\Widget;


class Textarea extends Text {

	const TYPE = "textarea";

	public static function build( string $key, string $label, string $defaultValue = "" ) {
		$text = new static( $key, $label, static::TYPE, $defaultValue );
		$text->rows( 3 );

		return $text;
	}

}
