<?php

namespace Palasthotel\WordPress\Corrections\Service;

use Exception;
use Palasthotel\WordPress\Corrections\Model\Message;

interface MessageService {

	public function isValidRecipient( string $recipient): bool;

	/**
	 * @throws Exception
	 */
	public function send( Message $message ): Message;

}
