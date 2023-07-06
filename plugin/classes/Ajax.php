<?php

namespace Palasthotel\WordPress\Corrections;

use Palasthotel\WordPress\Corrections\Components\Component;

class Ajax extends Component {
	public function onCreate() {
		parent::onCreate();
		add_action('wp_ajax_'.Plugin::DOMAIN.'_is_valid_recipient', [$this, 'is_valid_recipient']);
	}

	public function is_valid_recipient(){
		$recipient = sanitize_text_field($_GET["recipient"]);
		$service = $this->plugin->process->getMessageService();
		wp_send_json([
			"is_valid" => $service->isValidRecipient($recipient),
			"recipient" => $recipient,
		]);
	}

	public function getIsValidRecipientBaseUrl(){
		return admin_url('admin-ajax.php?action='.Plugin::DOMAIN.'_is_valid_recipient');
	}
}
