<?php

namespace Palasthotel\WordPress\Corrections\Model;

class Message {
	public int $id = 0;
	public int $post_id;
	public string $receiver;
	public string $content;
	public int $modified_timestamp;
	public ?int $sent_timestamp;

	public function __construct(
		$post_id,
		$receiver,
		$content,
		$modified_timestamp
	) {
		$this->post_id = $post_id;
		$this->receiver = $receiver;
		$this->content = $content;
		$this->modified_timestamp = $modified_timestamp;
	}

}
