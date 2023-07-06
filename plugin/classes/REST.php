<?php

namespace Palasthotel\WordPress\Corrections;

use Palasthotel\WordPress\Corrections\Components\Component;
use Palasthotel\WordPress\Corrections\Source\Config;
use Palasthotel\WordPress\Corrections\Source\Revisions;

class REST extends Component {

	public function onCreate() {
		parent::onCreate();
		add_action( 'init', [ $this, 'init_revisions' ] );
		add_action( 'init', [ $this, 'init_message_content' ] );
		add_action( 'init', [ $this, 'init_messages' ], 99 );
	}

	public function init_revisions() {
		if ( ! current_user_can( "edit_posts" ) ) {
			return;
		}

		register_rest_field(
			Config::postTypes(),
			Plugin::REST_FIELD_REVISIONS,
			[
				'get_callback' => function ( $post ) {
					$revisions = Revisions::getLatestOfAuthors( $post["id"] );

					return array_map( function ( $item ) {
						return [
							"revision_post_id" => $item->revision_post_id,
							"author_id"        => $item->author,
							"author_name"      => $item->getAuthorName(),
							"timestamp"        => $item->timestamp,
						];
					}, $revisions );
				},
			]
		);

	}

	public function init_message_content() {
		if ( ! current_user_can( "edit_posts" ) ) {
			return;
		}

		register_rest_field(
			Config::postTypes(),
			Plugin::REST_FIELD_MESSAGE_CONTENT,
			[
				'get_callback'    => function ( $post ) {
					$postId = $post["id"];

					return $this->plugin->repository->getMessageContent( $postId );
				},
				'update_callback' => function ( $value, \WP_Post $post ) {
					$postId           = $post->ID;
					$contentStructure = Config::getContentStructure( $postId );
					foreach ( $contentStructure->getItems() as $widget ) {
						if ( isset( $value[ $widget->key() ] ) ) {
							$widget->save( $value[ $widget->key() ], $postId );
						} else {
							$widget->delete( $postId );
						}
					}
				},
			]
		);
	}

	public function init_messages() {
		if ( ! current_user_can( "edit_posts" ) ) {
			return;
		}

		register_rest_field(
			Config::postTypes(),
			Plugin::REST_FIELD_MESSAGES,
			[
				'get_callback'        => function ( $post ) {
					$postId = $post["id"];

					return $this->plugin->repository->getMessages( $postId );
				},
				'update_callback'     => function ( $value, \WP_Post $post ) {
					if ( is_array( $value ) && count( $value ) > 0 ) {
						$candidates = array_filter( $value, function ( $item ) {
							return isset( $item["receiver"] ) && ( ! isset( $item["sent_timestamp"] ) || $item["sent_timestamp"] == null );
						} );
						if ( count( $candidates ) > 0 ) {
							$receivers = array_map( function ( $item ) {
								return sanitize_email( $item["receiver"] );
							}, $candidates );
							foreach ( $receivers as $receiver ) {
								$this->plugin->repository->enqueueMessage(
									$post->ID, $receiver,
								);
							}
						}
					}
					$this->plugin->process->doPendingMessages( $post->ID );
				},
				'permission_callback' => [ $this, 'can_edit_post_permission' ],
				'schema'              => array(
					'description' => "Gegenleser",
					'type'        => 'array'
				),
			]
		);

	}

}
