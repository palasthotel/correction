<?php

namespace Palasthotel\WordPress\Corrections\Source;

use Palasthotel\WordPress\Corrections\Components\Database;
use Palasthotel\WordPress\Corrections\Model\Message;

class Messages extends Database {

	private string $table;

	function init(): void {
		$this->table = $this->wpdb->prefix . '_corrections_messages';
	}


	/**
	 * @param $post_id
	 *
	 * @return Message[]
	 */
	public function getAll( $post_id ) {
		$results = $this->wpdb->get_results(
			$this->wpdb->prepare(
				"SELECT * from $this->table WHERE post_id = %d ORDER BY modified_timestamp DESC",
				$post_id
			)
		);

		return array_map( function ( $item ) {
			return $this->mapRowToMessage($item);
		}, $results );
	}

	public function setSent( int $id, string $content ) {
		$this->wpdb->update(
			$this->table,
			[
				"sent_timestamp" => time(),
				"content" => $content,
			],
			[
				"id" => $id,
			]
		);
	}

	/**
	 * @param $post_id
	 *
	 * @return Message[]
	 */
	public function getPending( $post_id ) {
		$results = $this->wpdb->get_results(
			$this->wpdb->prepare(
				"SELECT * from $this->table WHERE post_id = %d AND sent_timestamp IS NULL",
				$post_id
			)
		);

		return array_map( function ( $item ) {
			return $this->mapRowToMessage($item);
		}, $results );
	}

	private function mapRowToMessage($row): Message{
		$message = new Message(
			$row->post_id,
			$row->receiver,
			$row->content,
			$row->modified_timestamp,
		);
		$message->id = $row->id;
		$message->sent_timestamp = $row->sent_timestamp;
		return $message;
	}

	public function enqueueMessage( $post_id, $receiver ) {
		$this->wpdb->replace(
			$this->table,
			[
				"receiver"           => $receiver,
				"post_id"            => $post_id,
				"modified_timestamp" => time(),
			],
			[ "%s", "%d", "%d" ]
		);
	}

	public function clearPending( $post_id ) {
		$this->wpdb->delete(
			$this->table,
			[
				"post_id"        => $post_id,
				"sent_timestamp" => null,
			]
		);
	}

	/**
	 * create database tables
	 */
	public function createTables() {
		require_once( ABSPATH . 'wp-admin/includes/upgrade.php' );
		dbDelta( "CREATE TABLE IF NOT EXISTS $this->table (
			 id bigint(20) unsigned not null auto_increment,
			 post_id bigint(20) unsigned not null,
			 receiver varchar(190) not null,
			 content text default '',
			 modified_timestamp int(11) NOT NULL,
			 sent_timestamp int(11) DEFAULT NULL,
			 primary key (id),
			 UNIQUE KEY `{$this->table}_post_id_message_sent_timestamp_idx` (`post_id`,`receiver`,`sent_timestamp`),
			 key (post_id),
			 key (receiver),
			 key (modified_timestamp),
			 key (sent_timestamp)
		) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;" );
	}


}
