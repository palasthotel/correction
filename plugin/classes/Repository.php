<?php

namespace Palasthotel\WordPress\Corrections;

use Palasthotel\WordPress\Corrections\Source\Config;
use Palasthotel\WordPress\Corrections\Source\Messages;

class Repository {

	private Messages $messages;

	public function __construct(Messages $messages ) {
		$this->messages = $messages;
	}

	public function getMessages(string|int $post_id){
		return $this->messages->getAll($post_id);
	}

	public function getMessageContent(string|int $post_id): array {
		$contentStructure = Config::getContentStructure(get_the_ID());
		$content = [];
		foreach ($contentStructure->getItems() as $widget){
			$content[$widget->key()] = $widget->load($post_id);
		}
		return $content;
	}

	public function enqueueMessage( mixed $id, mixed $recipient ) {
		$this->messages->enqueueMessage($id, $recipient);
	}

}
