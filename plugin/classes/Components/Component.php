<?php


namespace Palasthotel\WordPress\Corrections\Components;

use Palasthotel\WordPress\Corrections\Plugin;

/**
 * Class Component
 *
 * @property Plugin plugin
 *
 * @package Palasthotel\WordPress
 * @version 0.1.1
 */
abstract class Component {
	/**
	 * _Component constructor.
	 *
	 * @param Plugin $plugin
	 */
	public function __construct(Plugin $plugin) {
		$this->plugin = $plugin;
		$this->onCreate();
	}

	/**
	 * overwrite this method in component implementations
	 */
	public function onCreate(){}
}
