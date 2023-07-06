<?php

namespace Palasthotel\WordPress\Corrections\Service;

use Palasthotel\WordPress\Corrections\Model\Message;
use Palasthotel\WordPress\Corrections\Plugin;
use WpOrg\Requests\Exception;

class HTMLEmailMessageService extends EmailMessageService {

	public function isValidRecipient( string $recipient ): bool {
		return is_email( $recipient ) !== false;
	}

	public function send( Message $message ): Message {

		add_filter( 'wp_mail_content_type', [ $this, 'set_content_type' ] );
		$message = parent::send($message);
		remove_filter( 'wp_mail_content_type', [ $this, 'set_content_type' ] );

		return $message;
	}

	public function set_content_type() {
		return "text/html";
	}
}
