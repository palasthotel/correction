<?php

namespace Palasthotel\WordPress\Corrections\Model;

use Exception;

class RecipientSuggestionsConfig {
	private string $type;
	private array $options;

	private function __construct( string $type, array $options ) {
		$this->type    = $type;
		$this->options = $options;
	}

	/**
	 * @throws Exception
	 */
	private static function validateOptions( array $options ): void {
		$stringOptions = array_filter( $options, 'is_string' );
		if ( count( $stringOptions ) != count( $options ) ) {
			throw new Exception( "options need to be an array of strings only." );
		}
	}

	/**
	 * @throws Exception
	 */
	public static function autocomplete( array $options = [] ): self {
		self::validateOptions( $options );

		return new self( "autocomplete", $options );
	}

	/**
	 * @throws Exception
	 */
	public static function checkbox( array $options ): self {
		self::validateOptions( $options );
		if ( count( $options ) <= 0 ) {
			throw new Exception( "Checkbox type needs at least one option. Zero provided." );
		}

		return new self( "checkbox", $options );
	}

	public function toArray(): array {
		return [
			"type"    => $this->type,
			"options" => $this->options,
		];
	}
}
