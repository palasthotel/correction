<?php

namespace Palasthotel\WordPress\Corrections\Service;

abstract class AbsMessageService implements MessageService {
	protected function isDebug(): bool {
		return defined( 'WP_DEBUG' ) && WP_DEBUG;
	}
}
