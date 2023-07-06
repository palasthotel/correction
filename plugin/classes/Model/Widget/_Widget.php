<?php


namespace Palasthotel\WordPress\Corrections\Model\Widget;


use Palasthotel\WordPress\Corrections\Plugin;

abstract class _Widget implements _IWidget {

	private string $key;
	private string $label;
	private string $type;
	private mixed $defaultValue;

	public function __construct( string $key, string $label, string $type, mixed $defaultValue ) {
		$this->key   = $key;
		$this->label = $label;
		$this->type  = $type;
		$this->setDefaultValue( $defaultValue );
	}

	public function key(): string {
		return $this->key;
	}

	public function label(): string {
		return $this->label;
	}

	public function setLabel( string $label ): self {
		$this->label = $label;

		return $this;
	}

	public function type(): string {
		return $this->type;
	}

	public function defaultValue(): mixed {
		return $this->defaultValue;
	}

	public function setDefaultValue( mixed $defaultValue ): self {
		$this->defaultValue = $defaultValue;

		return $this;
	}

	public function toArray(): array {
		$args = [
			"key"   => $this->key(),
			"label" => $this->label(),
			"type"  => $this->type(),
		];

		if ( $this->defaultValue() !== null ) {
			$args["defaultValue"] = $this->defaultValue();
		}

		return $args;
	}

	private function getPostMetaKey(): string{
		return "_".Plugin::DOMAIN."_".$this->key();
	}

	public function save( mixed $value, int|string $post_id ) {
		update_post_meta($post_id, $this->getPostMetaKey(), $value);
	}

	public function load( int|string $post_id ): mixed {
		return get_post_meta($post_id, $this->getPostMetaKey(), true) ?? $this->defaultValue;
	}

	public function delete( int|string $post_id ) {
		delete_post_meta($post_id, $this->getPostMetaKey());
	}
}
