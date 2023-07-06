<?php

namespace Palasthotel\WordPress\Corrections\Model;

class Message {
	public int $id = 0;
	public int $post_id;
	public string $recipient;
	public string $logs;
	public int $modified_timestamp;
	public ?int $sent_timestamp;
	public ?int $error_timestamp;

	/**
	 * @var mixed[]
	 */
	public array $content = [];

	public function __construct(
		$post_id,
		$recipient,
		$logs,
		$modified_timestamp
	) {
		$this->post_id            = $post_id;
		$this->recipient          = $recipient;
		$this->modified_timestamp = $modified_timestamp;
		$this->logs = $logs;
	}

}
