<?php

namespace Palasthotel\WordPress\Corrections\Model;

class Message {
	public int $id = 0;
	public int $post_id;
	public string $receiver;
	public string $logs;
	public int $modified_timestamp;
	public ?int $sent_timestamp;

	/**
	 * @var mixed[]
	 */
	public array $content = [];

	public function __construct(
		$post_id,
		$receiver,
		$logs,
		$modified_timestamp
	) {
		$this->post_id = $post_id;
		$this->receiver = $receiver;
		$this->modified_timestamp = $modified_timestamp;
		$this->logs = $logs;
	}

}
