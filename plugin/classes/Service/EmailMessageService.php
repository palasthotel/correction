<?php

namespace Palasthotel\WordPress\Corrections\Service;

use Palasthotel\WordPress\Corrections\Model\Message;
use Palasthotel\WordPress\Corrections\Plugin;

class EmailMessageService extends AbsMessageService {

	public function isValidRecipient( string $recipient ): bool {
		return is_email($recipient) !== false;
	}

	public function send( Message $message ): Message|false {

		$subject = $this->getSubject( $message );
		$body    = $this->getBody( $message );

		if ( ! $this->isDebug() ) {
			add_filter( 'wp_mail_content_type', [ $this, 'set_content_type' ] );
			$success = wp_mail( $message->receiver, $subject, $body );
			remove_filter( 'wp_mail_content_type', [ $this, 'set_content_type' ] );
		} else {
			$success = true;
		}

		if ( ! $success ) {
			return false;
		}

		$message->logs           = "$subject\n\n---------------\n\n$body";

		return $message;
	}

	private function getSubject( Message $message ): string {
		$title   = get_the_title( $message->post_id );
		$subject = "Correction request: $title";

		return apply_filters( Plugin::FILTER_EMAIL_SUBJECT, $subject, $message );
	}
	private function getBody( Message $message ): string {
		$url  = get_edit_post_link( $message->post_id );
		$body = "Please have a look at this post. \n\n$url";

		return apply_filters( Plugin::FILTER_EMAIL_BODY, $body, $message );
	}
	public function set_content_type() {
		return "text/html";
	}
}
