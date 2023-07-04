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

require_once __DIR__."/vendor/autoload.php";

class Plugin extends Components\Plugin {

	const DOMAIN = "corrections";

	function onCreate() {

		$this->loadTextdomain(self::DOMAIN, "languages");



	}
}

Plugin::instance();
