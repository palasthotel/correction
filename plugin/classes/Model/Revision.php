<?php

namespace Palasthotel\WordPress\Corrections\Model;

class Revision {
	public int $post_id;
	public int $author;
	public int $timestamp;

	private ?string $authorDisplayName = null;

	public function __construct(int $post_id, int $author, int $timestamp) {
		$this->post_id = $post_id;
		$this->author = $author;
		$this->timestamp = $timestamp;
	}

	public function getAuthorName(){
		if($this->authorDisplayName != null) return $this->authorDisplayName;
		$user =  get_user_by('ID', $this->author);
		$this->authorDisplayName = $user instanceof \WP_User ? $user->display_name : "Unbekannt 🚨";
		return $this->authorDisplayName;
	}

}
