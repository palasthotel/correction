<?php


namespace Palasthotel\WordPress\Corrections\Model\Widget;


interface _IWidget {
	public function key(): string;

	public function label(): string;

	public function type(): string;

	public function toArray(): array;

	public function save(mixed $value, int|string $post_id);
	public function load(int|string $post_id): mixed;

	public function delete(int|string $post_id);

}
