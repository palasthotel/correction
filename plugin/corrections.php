<?php

/**
 *
 * Plugin Name: Corrections
 * Plugin URI: https://github.com/palasthotel/corrections/
 * Description: Post corrections workflow
 * Version: 1.0.0
 * Author: Palasthotel by Edward <edward.bock@palasthotel.de>
 * Author URI: https://palasthotel.de
 * Text Domain: corrections
 * Domain Path: /languages
 * Requires at least: 6.0
 * Tested up to: 6.2.2
 * License: http://www.gnu.org/licenses/gpl-3.0.html GPLv3
 *
 * @copyright Copyright (c) 2023, Palasthotel
 * @package Palasthotel\WordPress\Corrections
 *
 */

namespace Palasthotel\WordPress\Corrections;

use Palasthotel\WordPress\Corrections\Source\Messages;

require_once __DIR__ . "/vendor/autoload.php";

class Plugin extends Components\Plugin {

	const DOMAIN = "corrections";

	const FILTER_SHOULD_PROCESS_PENDING_MESSAGES = "corrections_should_process_messages";

	const FILTER_MESSAGE_SERVICE = "corrections_message_service";

	const FILTER_EMAIL_SUBJECT = "corrections_email_subject";
	const FILTER_EMAIL_BODY = "corrections_email_text";

	const HANDLE_GUTENBERG_SCRIPT = "corrections-script";

	const REST_FIELD_REVISIONS = "corrections_revisions";

	const REST_FIELD_MESSAGES = "corrections_messages";
	public Messages $messagesSource;
	public Process $process;

	function onCreate() {
		$this->loadTextdomain(self::DOMAIN, "languages");

		$this->messagesSource = new Messages();
		new REST($this);
		$this->process = new Process($this);
		new Gutenberg($this);


	}
}

Plugin::instance();
