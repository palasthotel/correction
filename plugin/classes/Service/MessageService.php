<?php

namespace Palasthotel\WordPress\Corrections\Service;

use Palasthotel\WordPress\Corrections\Model\Message;

interface MessageService {
	public function isValidRecipient( string $recipient): bool;
	public function send( Message $message ): Message|false;

}
