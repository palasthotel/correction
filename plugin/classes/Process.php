<?php

namespace Palasthotel\WordPress\Corrections;

use Exception;
use Palasthotel\WordPress\Corrections\Components\Component;
use Palasthotel\WordPress\Corrections\Service\EmailMessageService;
use Palasthotel\WordPress\Corrections\Service\MessageService;

class Process extends Component {

	public function getMessageService(): MessageService {
		return apply_filters( Plugin::FILTER_MESSAGE_SERVICE, new EmailMessageService() );
	}

	private function shouldProcess( $post_id ) {
		return apply_filters( Plugin::FILTER_SHOULD_PROCESS_PENDING_MESSAGES, true, $post_id );
	}

	public function doPendingMessages( $post_id ) {

		if ( ! $this->shouldProcess( $post_id ) ) {
			return;
		}

		$messageService = $this->getMessageService();
		$pending        = $this->plugin->messagesSource->getPending( $post_id );

		foreach ( $pending as $item ) {
			try {
				$finalMessage = $messageService->send( $item );
				$this->plugin->messagesSource->setSent( $item->id, $finalMessage->logs );
			} catch ( Exception $e){
				$this->plugin->messagesSource->setErrored($item->id,  $e->getMessage());
			}

		}
	}

}
